<?php
/**
 * logout.php — 登出
 *
 * 清除 session 并跳转到登录页。
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

if (is_logged_in()) {
    log_action('logout', 'User: ' . ($_SESSION['admin_user'] ?? ''));
}

$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $p['path'], $p['domain'], $p['secure'], $p['httponly']);
}

session_destroy();

redirect('index.php');
