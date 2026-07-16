<?php
/**
 * index.php — 后台登录页面
 *
 * 首次访问时自动初始化数据库。
 * 已登录用户直接跳转到 dashboard.php。
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

// 触发数据库初始化
db();

// 已登录则跳转
if (is_logged_in()) {
    redirect('dashboard.php');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();

    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === '' || $password === '') {
        $error = '请输入用户名和密码。';
    } elseif (!check_login_rate()) {
        $error = '登录尝试次数过多，请 5 分钟后再试。';
    } elseif (attempt_login($username, $password)) {
        redirect('dashboard.php');
    } else {
        $error = '用户名或密码错误。';
    }
}

$csrf = csrf_token();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>湘丰茶业 - 后台管理系统</title>
    <link rel="stylesheet" href="css/admin.css">
    <link rel="icon" type="image/png" href="https://video.aultras-tea.com/%E6%B9%98%E4%B8%B0logo%E5%B9%BF%E5%91%8A%E8%AF%AD-06.png">
</head>
<body class="login-page">

<div class="login-container">
    <div class="login-card">
        <div class="login-header">
            <div class="login-logo">🍃</div>
            <h1>湘丰茶业后台管理</h1>
            <p>Xiangfeng Tea Admin Panel</p>
        </div>

        <?php if ($error): ?>
            <div class="alert alert-error"><?= e($error) ?></div>
        <?php endif; ?>

        <form method="POST" action="" class="login-form">
            <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">

            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" name="username"
                       placeholder="请输入用户名"
                       value="<?= e($_POST['username'] ?? '') ?>"
                       required autofocus>
            </div>

            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" name="password"
                       placeholder="请输入密码"
                       required>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
                <i class="icon-lock"></i> 登 录
            </button>
        </form>

        <div class="login-footer">
            <p>默认账号: <strong>admin</strong> / 默认密码: <strong>xiangfeng2026</strong></p>
            <p class="login-hint">请登录后及时修改密码</p>
        </div>
    </div>
</div>

</body>
</html>
