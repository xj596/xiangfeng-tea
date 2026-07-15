<?php
/**
 * inquiry-submit.php
 * Xiangfeng Tea Group - Inquiry Form Handler
 * 
 * Receives inquiry form submissions from contact.html and news.html popup,
 * sends email notification, logs to file, and returns JSON response.
 * 
 * Compatible with Alibaba Cloud virtual host (Apache + PHP 5.6-7.4)
 * 
 * @license MIT
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

$TO_EMAIL              = 'info@xiangfengtea.com';
$FROM_EMAIL            = 'inquiry@xiangfengtea.com';
$SITE_NAME             = 'Xiangfeng Tea Group';
$LOG_FILE              = __DIR__ . '/data/inquiry_log.txt';
$RATE_LIMIT_DIR        = __DIR__ . '/data/rate_limit/';
$MAX_SUBMISSIONS_PER_HOUR = 5;
$CSRF_TOKEN_MAX_AGE    = 3600; // seconds (1 hour)

// =============================================================================
// ERROR REPORTING (suppress display in production)
// =============================================================================

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// =============================================================================
// RESPONSE HELPER
// =============================================================================

/**
 * Output JSON response and exit.
 *
 * @param bool   $success  Whether the request was successful
 * @param string $message  Human-readable message
 * @param int    $httpCode HTTP status code (optional)
 */
function jsonResponse($success, $message, $httpCode = 200) {
    http_response_code($httpCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(array(
        'success' => (bool) $success,
        'message' => $message
    ));
    exit;
}

// =============================================================================
// CORS & SECURITY HEADERS
// =============================================================================

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: same-origin');

// =============================================================================
// STEP 1: REQUEST METHOD VALIDATION
// =============================================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed. Please submit the form properly.', 405);
}

// =============================================================================
// STEP 2: DATA DIRECTORY CHECK
// =============================================================================

$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    if (!@mkdir($dataDir, 0755, true)) {
        // Directory cannot be created — log to PHP error log as fallback
        error_log('[Xiangfeng Inquiry] data/ directory missing and cannot be created.');
        jsonResponse(false, 'Server configuration error. Please try again later.', 500);
    }
}

// Ensure rate limit directory exists
if (!is_dir($RATE_LIMIT_DIR)) {
    @mkdir($RATE_LIMIT_DIR, 0755, true);
}

// =============================================================================
// STEP 3: INPUT COLLECTION & SANITIZATION
// =============================================================================

/**
 * Sanitize a string input.
 *
 * @param string $value Raw input
 * @return string Sanitized output
 */
function sanitizeInput($value) {
    if ($value === null) return '';
    $value = is_string($value) ? $value : strval($value);
    $value = trim($value);
    $value = str_replace(array("\r", "\n", "%0a", "%0d", "%0A", "%0D"), '', $value);
    return $value;
}

/**
 * Sanitize message body (allows newlines but strips dangerous chars).
 *
 * @param string $value Raw message
 * @return string Sanitized message
 */
function sanitizeMessage($value) {
    if ($value === null) return '';
    $value = is_string($value) ? $value : strval($value);
    $value = trim($value);
    // Remove null bytes
    $value = str_replace("\0", '', $value);
    return $value;
}

/**
 * Get client IP address (handles proxies).
 *
 * @return string IP address
 */
function getClientIP() {
    $ipKeys = array(
        'HTTP_CF_CONNECTING_IP', // Cloudflare
        'HTTP_X_FORWARDED_FOR',  // Generic proxy
        'HTTP_X_REAL_IP',        // Nginx
        'REMOTE_ADDR'            // Direct
    );
    foreach ($ipKeys as $key) {
        if (isset($_SERVER[$key]) && $_SERVER[$key]) {
            $ip = trim($_SERVER[$key]);
            // Handle comma-separated list (X-Forwarded-For)
            if (strpos($ip, ',') !== false) {
                $ipParts = explode(',', $ip);
            $ip = trim($ipParts[0]);
            }
            // Validate IP
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return '0.0.0.0';
}

// Collect and sanitize all fields
$name           = sanitizeInput(isset($_POST['name']) ? $_POST['name'] : '');
$email          = sanitizeInput(isset($_POST['email']) ? $_POST['email'] : '');
$phone          = sanitizeInput(isset($_POST['phone']) ? $_POST['phone'] : '');
$company        = sanitizeInput(isset($_POST['company']) ? $_POST['company'] : '');
$productInterest = sanitizeInput(isset($_POST['product_interest']) ? $_POST['product_interest'] : '');
$message        = sanitizeMessage(isset($_POST['message']) ? $_POST['message'] : '');
$source         = sanitizeInput(isset($_POST['source']) ? $_POST['source'] : 'website');
$csrfToken      = sanitizeInput(isset($_POST['csrf_token']) ? $_POST['csrf_token'] : '');
$clientIP       = getClientIP();
$userAgent      = sanitizeInput(isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '');

// HTML-escape for safe output in email/log
$nameEsc        = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$emailEsc       = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phoneEsc       = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$companyEsc     = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
$productEsc     = htmlspecialchars($productInterest, ENT_QUOTES, 'UTF-8');
$messageEsc     = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
$sourceEsc      = htmlspecialchars($source, ENT_QUOTES, 'UTF-8');

// =============================================================================
// STEP 4: HONEYPOT CHECK (anti-spam — hidden field "website_url")
// =============================================================================

$honeypot = sanitizeInput(isset($_POST['website_url']) ? $_POST['website_url'] : '');
if ($honeypot !== '') {
    // Bot filled the hidden field — silently succeed without sending
    jsonResponse(true, 'Thank you for your inquiry. We will get back to you soon.');
}

// =============================================================================
// STEP 5: CSRF TOKEN VALIDATION
// =============================================================================

/**
 * Validate CSRF token format and age.
 * Token format: timestamp_randomstring (e.g., 1688712345678_abc123def)
 *
 * @param string $token   The token from the form
 * @param int    $maxAge  Maximum age in seconds
 * @return bool True if valid
 */
function validateCsrfToken($token, $maxAge) {
    if (empty($token)) {
        return false;
    }
    
    // Check format: digits, underscore, alphanumeric
    if (!preg_match('/^(\d+)_[a-zA-Z0-9]+$/', $token, $matches)) {
        return false;
    }
    
    $timestamp = intval($matches[1]);
    $currentTime = time();
    
    // Check token age (timestamp is in milliseconds from JS Date.now())
    // JS Date.now() returns milliseconds, PHP time() returns seconds
    // Handle both milliseconds and seconds
    if ($timestamp > 1000000000000) {
        // Milliseconds — convert to seconds
        $tokenTime = intval($timestamp / 1000);
    } else {
        // Seconds
        $tokenTime = $timestamp;
    }
    
    // Token must not be in the future (allow 60 seconds clock skew)
    if ($tokenTime > $currentTime + 60) {
        return false;
    }
    
    // Token must not be expired
    if (($currentTime - $tokenTime) > $maxAge) {
        return false;
    }
    
    return true;
}

if (!validateCsrfToken($csrfToken, $CSRF_TOKEN_MAX_AGE)) {
    jsonResponse(false, 'Session expired. Please refresh the page and try again.', 403);
}

// =============================================================================
// STEP 6: REQUIRED FIELD VALIDATION
// =============================================================================

if (empty($name)) {
    jsonResponse(false, 'Please enter your name.', 422);
}

if (empty($email)) {
    jsonResponse(false, 'Please enter your email address.', 422);
}

// Name length check
if (mb_strlen($name) > 100) {
    jsonResponse(false, 'Name is too long (maximum 100 characters).', 422);
}

// Message length check (optional field but limit if provided)
if (mb_strlen($message) > 5000) {
    jsonResponse(false, 'Message is too long (maximum 5000 characters).', 422);
}

// =============================================================================
// STEP 7: EMAIL VALIDATION
// =============================================================================

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Please enter a valid email address.', 422);
}

// Additional email header injection check
if (preg_match('/[\r\n\t<>";,]/', $email)) {
    jsonResponse(false, 'Invalid email address format.', 422);
}

// Check email length
if (strlen($email) > 254) {
    jsonResponse(false, 'Email address is too long.', 422);
}

// =============================================================================
// STEP 8: IP RATE LIMITING (file-based, no database required)
// =============================================================================

/**
 * Check and enforce rate limiting for a given IP.
 * Uses temporary files in $RATE_LIMIT_DIR.
 *
 * @param string $ip          Client IP
 * @param string $rateDir     Rate limit directory
 * @param int    $maxPerHour  Max submissions per hour
 * @return bool True if within limit, false if exceeded
 */
function checkRateLimit($ip, $rateDir, $maxPerHour) {
    if (!is_dir($rateDir)) {
        @mkdir($rateDir, 0755, true);
    }
    
    // Sanitize IP for filename (replace : and . with _)
    $safeIP = str_replace(array(':', '.'), '_', $ip);
    $pattern = $rateDir . $safeIP . '_*.tmp';
    
    $currentTime = time();
    $oneHourAgo = $currentTime - 3600;
    
    // Count existing files within the last hour
    $files = glob($pattern);
    $count = 0;
    $expiredFiles = array();
    
    if ($files) {
        foreach ($files as $file) {
            $fileTime = filemtime($file);
            if ($fileTime === false) continue;
            
            if ($fileTime < $oneHourAgo) {
                $expiredFiles[] = $file;
            } else {
                $count++;
            }
        }
    }
    
    // Clean expired files
    foreach ($expiredFiles as $expiredFile) {
        @unlink($expiredFile);
    }
    
    // Check limit
    if ($count >= $maxPerHour) {
        return false;
    }
    
    // Create new tracking file for this submission
    $trackingFile = $rateDir . $safeIP . '_' . $currentTime . '.tmp';
    @file_put_contents($trackingFile, $currentTime);
    
    return true;
}

if (!checkRateLimit($clientIP, $RATE_LIMIT_DIR, $MAX_SUBMISSIONS_PER_HOUR)) {
    jsonResponse(false, 'Too many submissions. Please try again later.', 429);
}

// =============================================================================
// STEP 9: PREPARE & SEND EMAIL
// =============================================================================

/**
 * Build HTML email body.
 *
 * @param array $data Sanitized form data
 * @return string HTML email content
 */
function buildEmailBody($data) {
    $html = '';
    $html .= '<!DOCTYPE html>' . "\n";
    $html .= '<html><head><meta charset="UTF-8"></head><body>' . "\n";
    $html .= '<div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#333;">' . "\n";
    
    $html .= '<div style="background:#30B4A8;padding:20px 30px;border-radius:8px 8px 0 0;">' . "\n";
    $html .= '<h1 style="color:#fff;margin:0;font-size:22px;">New Inquiry — ' . $data['site_name'] . '</h1>' . "\n";
    $html .= '</div>' . "\n";
    
    $html .= '<div style="background:#f9f9f9;padding:25px 30px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">' . "\n";
    
    $html .= '<table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.8;">' . "\n";
    
    $rows = array(
        'Name'             => $data['name'],
        'Email'            => $data['email'],
        'Phone'            => $data['phone'],
        'Company'          => $data['company'],
        'Product Interest' => $data['product_interest'],
        'Source'           => $data['source'],
        'IP Address'       => $data['ip'],
        'Submitted At'     => $data['submitted_at'],
    );
    
    foreach ($rows as $label => $value) {
        $displayValue = $value !== '' ? $value : '<span style="color:#999;">—</span>';
        $html .= '<tr>' . "\n";
        $html .= '<td style="padding:6px 0;font-weight:bold;color:#555;width:140px;vertical-align:top;">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . ':</td>' . "\n";
        $html .= '<td style="padding:6px 0;color:#333;">' . $displayValue . '</td>' . "\n";
        $html .= '</tr>' . "\n";
    }
    
    $html .= '</table>' . "\n";
    
    if ($data['message'] !== '') {
        $html .= '<hr style="border:none;border-top:1px solid #e0e0e0;margin:20px 0;">' . "\n";
        $html .= '<p style="font-weight:bold;color:#555;margin:0 0 8px 0;">Message:</p>' . "\n";
        $html .= '<div style="background:#fff;padding:15px;border-radius:4px;border:1px solid #e0e0e0;font-size:14px;line-height:1.6;color:#333;">' . nl2br($data['message']) . '</div>' . "\n";
    }
    
    $html .= '</div>' . "\n";
    
    $html .= '<p style="text-align:center;font-size:12px;color:#999;margin:20px 0 0 0;">' . "\n";
    $html .= 'This inquiry was submitted from ' . htmlspecialchars($data['site_name'], ENT_QUOTES, 'UTF-8') . ' website.' . "\n";
    $html .= '</p>' . "\n";
    
    $html .= '</div>' . "\n";
    $html .= '</body></html>' . "\n";
    
    return $html;
}

/**
 * Build plain text email body (fallback).
 *
 * @param array $data Sanitized form data
 * @return string Plain text email content
 */
function buildTextBody($data) {
    $text = '';
    $text .= "New Inquiry — " . $data['site_name'] . "\n";
    $text .= str_repeat('=', 50) . "\n\n";
    $text .= "Name:             " . $data['name'] . "\n";
    $text .= "Email:            " . $data['email'] . "\n";
    $text .= "Phone:            " . $data['phone'] . "\n";
    $text .= "Company:          " . $data['company'] . "\n";
    $text .= "Product Interest: " . $data['product_interest'] . "\n";
    $text .= "Source:           " . $data['source'] . "\n";
    $text .= "IP Address:       " . $data['ip'] . "\n";
    $text .= "Submitted At:     " . $data['submitted_at'] . "\n";
    $text .= "\n";
    if ($data['message'] !== '') {
        $text .= "Message:\n";
        $text .= str_repeat('-', 50) . "\n";
        $text .= $data['message'] . "\n";
    }
    $text .= "\n" . str_repeat('=', 50) . "\n";
    $text .= "This inquiry was submitted from " . $data['site_name'] . " website.\n";
    return $text;
}

// Prepare email data
$emailData = array(
    'site_name'       => $SITE_NAME,
    'name'            => $nameEsc,
    'email'           => $emailEsc,
    'phone'           => $phoneEsc,
    'company'         => $companyEsc,
    'product_interest' => $productEsc,
    'source'          => $sourceEsc,
    'ip'              => htmlspecialchars($clientIP, ENT_QUOTES, 'UTF-8'),
    'submitted_at'    => htmlspecialchars(date('Y-m-d H:i:s'), ENT_QUOTES, 'UTF-8'),
    'message'         => $messageEsc,
);

// Build subject line
$subjectParts = array();
$subjectParts[] = 'New Inquiry from ' . $name;
if (!empty($company)) {
    $subjectParts[] = $company;
}
$subject = implode(' - ', $subjectParts);

// Encode subject for UTF-8 safety
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

// Build email bodies
$htmlBody = buildEmailBody($emailData);
$textBody = buildTextBody(array(
    'site_name'       => $SITE_NAME,
    'name'            => $name,
    'email'           => $email,
    'phone'           => $phone,
    'company'         => $company,
    'product_interest' => $productInterest,
    'source'          => $source,
    'ip'              => $clientIP,
    'submitted_at'    => date('Y-m-d H:i:s'),
    'message'         => $message,
));

// Build MIME boundary for multipart email
$boundary = md5(uniqid(time(), true));

// Email headers
$headers = '';
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-Type: multipart/alternative; boundary="' . $boundary . '"' . "\r\n";
$headers .= 'From: ' . $SITE_NAME . ' <' . $FROM_EMAIL . '>' . "\r\n";
// Sanitize name and email for use in email headers (strip dangerous chars beyond \r\n)
$nameHeaderSafe = preg_replace('/[\r\n\t<>";,()\\\\]/', '', $name);
$emailHeaderSafe = preg_replace('/[\r\n\t<>";,()\\\\]/', '', $email);
$headers .= 'Reply-To: ' . $nameHeaderSafe . ' <' . $emailHeaderSafe . '>' . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";
$headers .= 'X-Originating-IP: ' . $clientIP . "\r\n";

// Build full email message (multipart)
$fullMessage = '';
$fullMessage .= '--' . $boundary . "\r\n";
$fullMessage .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$fullMessage .= 'Content-Transfer-Encoding: 8bit' . "\r\n";
$fullMessage .= "\r\n";
$fullMessage .= $textBody . "\r\n";
$fullMessage .= "\r\n";
$fullMessage .= '--' . $boundary . "\r\n";
$fullMessage .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
$fullMessage .= 'Content-Transfer-Encoding: 8bit' . "\r\n";
$fullMessage .= "\r\n";
$fullMessage .= $htmlBody . "\r\n";
$fullMessage .= "\r\n";
$fullMessage .= '--' . $boundary . '--' . "\r\n";

// Send email
$mailSent = false;
$mailError = '';

// Try sending via PHP mail()
$oldErrorReporting = error_reporting(0);
$mailSent = @mail($TO_EMAIL, $encodedSubject, $fullMessage, $headers);
error_reporting($oldErrorReporting);

if ($mailSent === false) {
    // Capture last error for logging (but don't expose to user)
    $lastError = error_get_last();
    $mailError = $lastError ? $lastError['message'] : 'Unknown mail() error';
}

// =============================================================================
// STEP 10: LOG TO FILE
// =============================================================================

/**
 * Append inquiry to log file.
 *
 * @param string $logFile    Path to log file
 * @param array  $data       Form data
 * @param bool   $mailSent   Whether email was sent successfully
 * @param string $mailError  Mail error message (if any)
 */
function logInquiry($logFile, $data, $mailSent, $mailError) {
    $logEntry = '';
    $logEntry .= '[' . date('Y-m-d H:i:s') . '] ';
    $logEntry .= 'IP=' . $data['ip'] . ' | ';
    $logEntry .= 'Name=' . $data['name'] . ' | ';
    $logEntry .= 'Email=' . $data['email'] . ' | ';
    $logEntry .= 'Phone=' . $data['phone'] . ' | ';
    $logEntry .= 'Company=' . $data['company'] . ' | ';
    $logEntry .= 'Product=' . $data['product_interest'] . ' | ';
    $logEntry .= 'Source=' . $data['source'] . ' | ';
    $logEntry .= 'MailSent=' . ($mailSent ? 'YES' : 'NO');
    if (!$mailSent && $mailError) {
        $logEntry .= ' | MailError=' . substr($mailError, 0, 200);
    }
    $logEntry .= "\n";
    $logEntry .= '  Message: ' . $data['message_raw'] . "\n";
    $logEntry .= str_repeat('-', 80) . "\n";
    
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

$logData = array(
    'ip'              => $clientIP,
    'name'            => $name,
    'email'           => $email,
    'phone'           => $phone,
    'company'         => $company,
    'product_interest' => $productInterest,
    'source'          => $source,
    'message_raw'     => $message,
);

logInquiry($LOG_FILE, $logData, $mailSent, $mailError);

// =============================================================================
// STEP 11: RETURN JSON RESPONSE
// =============================================================================

// Even if mail() fails, return success to the user (log captures the failure)
// This prevents user frustration while ensuring we still have the inquiry on file
if ($mailSent) {
    jsonResponse(true, 'Thank you for your inquiry. Our team will get back to you within 24-48 hours.');
} else {
    // Log the mail failure but still return success to the user
    error_log('[Xiangfeng Inquiry] mail() failed for inquiry from ' . $email . '. Error: ' . $mailError . '. Inquiry logged to file.');
    jsonResponse(true, 'Thank you for your inquiry. Our team will get back to you within 24-48 hours.');
}

?>
