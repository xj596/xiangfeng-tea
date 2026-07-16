<?php
/**
 * auth.php — 登录验证逻辑
 *
 * 在需要保护的后台页面顶部引入：
 *   require_once __DIR__ . '/auth.php';
 *
 * 如果用户未登录，会自动跳转到登录页。
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

/**
 * 检查用户是否已登录
 */
function is_logged_in(): bool
{
    return isset($_SESSION['admin_user']);
}

/**
 * 要求用户已登录，否则跳转到登录页
 */
function require_login(): void
{
    if (!is_logged_in()) {
        redirect('index.php');
    }
}

/**
 * 尝试登录
 *
 * @param string $username
 * @param string $password
 * @return bool  登录成功返回 true
 */
function attempt_login(string $username, string $password): bool
{
    // 频率限制
    if (!check_login_rate()) {
        return false;
    }

    $stmt = db()->prepare('SELECT * FROM admin_users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        record_login_attempt();
        log_action('login_failed', 'Username: ' . $username);
        return false;
    }

    // 登录成功
    session_regenerate_id(true);
    $_SESSION['admin_user'] = $user['username'];
    $_SESSION['admin_user_id'] = (int)$user['id'];
    $_SESSION['admin_last_activity'] = time();

    // 更新最后登录时间
    $stmt = db()->prepare('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?');
    $stmt->execute([$user['id']]);

    clear_login_attempts();
    log_action('login_success', 'Username: ' . $username);

    return true;
}
