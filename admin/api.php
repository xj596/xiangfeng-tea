<?php
/**
 * api.php — 公开 JSON API 接口
 *
 * 供前端 JavaScript 通过 fetch 读取后台配置数据。
 * 无需登录认证，返回 JSON 格式。
 *
 * 用法：
 *   GET api.php              — 返回所有 site_config + 产品列表 + 证书列表
 *   GET api.php?type=config  — 仅返回 site_config
 *   GET api.php?type=products — 仅返回产品列表
 *   GET api.php?type=certs   — 仅返回证书列表
 *   GET api.php?type=products&category=Green%20Tea — 按分类筛选产品
 *   GET api.php?type=products&featured=1 — 仅返回特色产品
 *
 * 前端示例：
 *   fetch('admin/api.php')
 *     .then(r => r.json())
 *     .then(data => { ... });
 */

declare(strict_types=1);

// 加载数据库（不加载 auth，此接口公开）
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: no-cache, must-revalidate');

$type = $_GET['type'] ?? 'all';

try {
    $result = [];

    // --- 全部数据 ---
    if ($type === 'all' || $type === 'config') {
        $rows = db()->query('SELECT key, value FROM site_config')->fetchAll();
        $config = [];
        foreach ($rows as $r) {
            $config[$r['key']] = $r['value'];
        }
        $result['config'] = $config;
    }

    if ($type === 'all' || $type === 'products') {
        $sql = 'SELECT * FROM products WHERE 1=1';
        $params = [];

        // 分类筛选
        $cat = $_GET['category'] ?? '';
        if ($cat !== '') {
            $sql .= ' AND category = ?';
            $params[] = $cat;
        }

        // 特色筛选
        $featured = $_GET['featured'] ?? '';
        if ($featured === '1') {
            $sql .= ' AND featured = 1';
        }

        $sql .= ' ORDER BY sort_order, id';
        $stmt = db()->prepare($sql);
        $stmt->execute($params);
        $result['products'] = $stmt->fetchAll();
    }

    if ($type === 'all' || $type === 'certs') {
        $result['certifications'] = db()->query(
            'SELECT * FROM certifications ORDER BY sort_order, id'
        )->fetchAll();
    }

    // 输出 JSON
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => true,
        'message' => 'API error: ' . $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
}
