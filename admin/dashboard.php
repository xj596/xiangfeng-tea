<?php
/**
 * dashboard.php — 主仪表盘/导航
 *
 * 显示系统概览、统计数据、最近操作日志。
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

$pageTitle = '仪表盘';
$currentPage = 'dashboard';

// 统计数据
$productCount = (int)db()->query('SELECT COUNT(*) FROM products')->fetchColumn();
$certCount    = (int)db()->query('SELECT COUNT(*) FROM certifications')->fetchColumn();
$configCount  = (int)db()->query('SELECT COUNT(*) FROM site_config')->fetchColumn();
$logCount     = (int)db()->query('SELECT COUNT(*) FROM admin_log')->fetchColumn();

// 最近日志
$recentLogs = db()->query(
    'SELECT * FROM admin_log ORDER BY created_at DESC LIMIT 10'
)->fetchAll();

require_once __DIR__ . '/header.php';
?>

<!-- 统计卡片 -->
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-value"><?= $productCount ?></div>
        <div class="stat-label">产品总数</div>
    </div>
    <div class="stat-card" style="border-left-color: var(--accent);">
        <div class="stat-icon">🏅</div>
        <div class="stat-value"><?= $certCount ?></div>
        <div class="stat-label">证书数量</div>
    </div>
    <div class="stat-card" style="border-left-color: #6c757d;">
        <div class="stat-icon">⚙️</div>
        <div class="stat-value"><?= $configCount ?></div>
        <div class="stat-label">配置项</div>
    </div>
    <div class="stat-card" style="border-left-color: var(--info);">
        <div class="stat-icon">📋</div>
        <div class="stat-value"><?= $logCount ?></div>
        <div class="stat-label">操作日志</div>
    </div>
</div>

<!-- 快捷入口 -->
<div class="card">
    <div class="card-header">
        <h2>快捷操作</h2>
    </div>
    <div class="card-body" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem;">
        <a href="home.php" class="btn btn-outline" style="padding:1.5rem;flex-direction:column;gap:0.5rem;">
            <span style="font-size:2rem;">🏠</span>
            <span>首页管理</span>
        </a>
        <a href="company.php" class="btn btn-outline" style="padding:1.5rem;flex-direction:column;gap:0.5rem;">
            <span style="font-size:2rem;">🏢</span>
            <span>公司证书</span>
        </a>
        <a href="about.php" class="btn btn-outline" style="padding:1.5rem;flex-direction:column;gap:0.5rem;">
            <span style="font-size:2rem;">ℹ️</span>
            <span>关于我们</span>
        </a>
        <a href="products.php" class="btn btn-outline" style="padding:1.5rem;flex-direction:column;gap:0.5rem;">
            <span style="font-size:2rem;">📦</span>
            <span>产品中心</span>
        </a>
    </div>
</div>

<!-- 最近操作日志 -->
<div class="card">
    <div class="card-header">
        <h2>最近操作日志</h2>
    </div>
    <div class="card-body">
        <?php if (empty($recentLogs)): ?>
            <div class="empty-state">
                <div class="icon">📭</div>
                <p>暂无操作日志</p>
            </div>
        <?php else: ?>
            <ul class="log-list">
                <?php foreach ($recentLogs as $log): ?>
                    <li>
                        <span class="log-time"><?= e($log['created_at']) ?></span>
                        — <strong><?= e($log['username']) ?></strong>
                        <?= e($log['action']) ?>
                        <?php if ($log['detail']): ?>
                            <span style="color:var(--text-muted);"> (<?= e($log['detail']) ?>)</span>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
