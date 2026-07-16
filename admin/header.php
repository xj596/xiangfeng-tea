<?php
/**
 * header.php — 后台公共头部
 *
 * 在各后台页面中引入：
 *   require_once __DIR__ . '/header.php';
 *
 * 变量 $pageTitle 可在引入前设置以自定义页面标题。
 */

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

require_login();

$pageTitle = $pageTitle ?? '管理后台';
$currentPage = $currentPage ?? '';

/**
 * 导航菜单项
 */
$navItems = [
    'dashboard' => ['dashboard.php', '📊', '仪表盘'],
    'home'      => ['home.php', '🏠', '首页管理'],
    'company'   => ['company.php', '🏢', '公司证书'],
    'about'     => ['about.php', 'ℹ️', '关于我们'],
    'products'  => ['products.php', '📦', '产品中心'],
];
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title><?= e($pageTitle) ?> - 湘丰茶业后台</title>
    <link rel="stylesheet" href="css/admin.css">
    <link rel="icon" type="image/png" href="https://video.aultras-tea.com/%E6%B9%98%E4%B8%B0logo%E5%B9%BF%E5%91%8A%E8%AF%AD-06.png">
</head>
<body>

<div class="admin-layout">

    <!-- ===== 侧边栏 ===== -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <span>🍃</span>
                <div>
                    湘丰茶业
                    <small>Admin Panel</small>
                </div>
            </div>
        </div>

        <ul class="sidebar-nav">
            <?php foreach ($navItems as $key => $item): ?>
                <li>
                    <a href="<?= e($item[0]) ?>"
                       class="<?= $currentPage === $key ? 'active' : '' ?>">
                        <span class="nav-icon"><?= $item[1] ?></span>
                        <span><?= e($item[2]) ?></span>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>

        <div class="sidebar-footer">
            <a href="../index.html" target="_blank">🌐 查看前台网站</a>
            <br>
            <a href="logout.php" data-confirm="确定要退出登录吗？">🚪 退出登录</a>
        </div>
    </aside>

    <!-- ===== 主内容区 ===== -->
    <div class="main-content">

        <!-- 顶部栏 -->
        <div class="topbar">
            <div style="display:flex;align-items:center;gap:0.75rem;">
                <button class="mobile-toggle" id="mobileToggle">☰</button>
                <h1><?= e($pageTitle) ?></h1>
            </div>
            <div class="topbar-user">
                <span class="user-info">
                    👤 <strong><?= e($_SESSION['admin_user'] ?? '') ?></strong>
                </span>
                <a href="logout.php" class="btn btn-outline btn-sm" data-confirm="确定要退出登录吗？">退出</a>
            </div>
        </div>

        <!-- 内容区 -->
        <div class="content-body">
