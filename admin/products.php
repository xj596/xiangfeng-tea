<?php
/**
 * products.php — 产品中心管理
 *
 * 功能：
 *  - 添加/编辑/删除产品
 *  - 产品字段：名称、分类、描述、图片URL、产地、规格、包装信息
 *  - 手动排序（上移/下移）
 *  - 特色产品标记
 *  - 按分类筛选
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

$pageTitle = '产品中心';
$currentPage = 'products';

$message = '';
$messageType = '';

// ===== 处理 POST 操作 =====
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();
    $action = $_POST['action'] ?? '';

    try {
        switch ($action) {

            // --- 添加/编辑产品 ---
            case 'save_product':
                $id            = (int)($_POST['id'] ?? 0);
                $name          = trim($_POST['name'] ?? '');
                $category      = trim($_POST['category'] ?? '');
                $description   = trim($_POST['description'] ?? '');
                $origin        = trim($_POST['origin'] ?? '');
                $specifications= trim($_POST['specifications'] ?? '');
                $packaging     = trim($_POST['packaging'] ?? '');
                $featured      = isset($_POST['featured']) ? 1 : 0;

                if ($name === '') {
                    throw new RuntimeException('产品名称不能为空。');
                }

                // 处理图片上传
                $imageUrl = '';
                $uploaded = handle_upload('image');
                if ($uploaded !== null) {
                    $imageUrl = $uploaded;
                } elseif (!empty($_POST['existing_image'])) {
                    $imageUrl = $_POST['existing_image'];
                }

                if ($id > 0) {
                    // 编辑
                    if ($imageUrl) {
                        $stmt = db()->prepare("
                            UPDATE products
                            SET name = ?, category = ?, description = ?, image_url = ?,
                                origin = ?, specifications = ?, packaging = ?, featured = ?
                            WHERE id = ?
                        ");
                        $stmt->execute([$name, $category, $description, $imageUrl,
                                        $origin, $specifications, $packaging, $featured, $id]);
                    } else {
                        $stmt = db()->prepare("
                            UPDATE products
                            SET name = ?, category = ?, description = ?,
                                origin = ?, specifications = ?, packaging = ?, featured = ?
                            WHERE id = ?
                        ");
                        $stmt->execute([$name, $category, $description,
                                        $origin, $specifications, $packaging, $featured, $id]);
                    }
                    log_action('edit_product', 'Product: ' . $name);
                    $message = '产品更新成功！';
                } else {
                    // 添加
                    $sortOrder = (int)db()->query('SELECT COALESCE(MAX(sort_order), 0) + 1 FROM products')->fetchColumn();
                    $stmt = db()->prepare("
                        INSERT INTO products
                            (name, category, description, image_url, origin,
                             specifications, packaging, featured, sort_order)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ");
                    $stmt->execute([$name, $category, $description, $imageUrl,
                                    $origin, $specifications, $packaging, $featured, $sortOrder]);
                    log_action('add_product', 'Product: ' . $name);
                    $message = '产品添加成功！';
                }
                $messageType = 'success';
                break;

            // --- 删除产品 ---
            case 'delete_product':
                $id = (int)($_POST['id'] ?? 0);
                if ($id > 0) {
                    $stmt = db()->prepare('SELECT name FROM products WHERE id = ?');
                    $stmt->execute([$id]);
                    $prod = $stmt->fetch();
                    $stmt = db()->prepare('DELETE FROM products WHERE id = ?');
                    $stmt->execute([$id]);
                    log_action('delete_product', 'Product ID: ' . $id . ' (' . ($prod['name'] ?? '') . ')');
                    $message = '产品已删除。';
                    $messageType = 'success';
                }
                break;

            // --- 排序（上移/下移）---
            case 'move_product':
                $id       = (int)($_POST['id'] ?? 0);
                $direction = $_POST['direction'] ?? '';

                if ($id > 0 && in_array($direction, ['up', 'down'], true)) {
                    $stmt = db()->prepare('SELECT sort_order, category FROM products WHERE id = ?');
                    $stmt->execute([$id]);
                    $current = $stmt->fetch();
                    if ($current) {
                        if ($direction === 'up') {
                            $stmt = db()->prepare("
                                SELECT id, sort_order FROM products
                                WHERE category = ? AND sort_order < ?
                                ORDER BY sort_order DESC LIMIT 1
                            ");
                        } else {
                            $stmt = db()->prepare("
                                SELECT id, sort_order FROM products
                                WHERE category = ? AND sort_order > ?
                                ORDER BY sort_order ASC LIMIT 1
                            ");
                        }
                        $stmt->execute([$current['category'], $current['sort_order']]);
                        $swap = $stmt->fetch();

                        if ($swap) {
                            $pdo = db();
                            $pdo->beginTransaction();
                            $u1 = $pdo->prepare('UPDATE products SET sort_order = ? WHERE id = ?');
                            $u1->execute([$swap['sort_order'], $id]);
                            $u2 = $pdo->prepare('UPDATE products SET sort_order = ? WHERE id = ?');
                            $u2->execute([$current['sort_order'], $swap['id']]);
                            $pdo->commit();
                        }
                    }
                    $message = '排序已更新。';
                    $messageType = 'success';
                }
                break;

            // --- 批量排序 ---
            case 'sort_products':
                $orders = $_POST['orders'] ?? [];
                if (is_array($orders)) {
                    $stmt = db()->prepare('UPDATE products SET sort_order = ? WHERE id = ?');
                    foreach ($orders as $order => $pid) {
                        $stmt->execute([(int)$order, (int)$pid]);
                    }
                    log_action('sort_products', 'Reordered products');
                    $message = '排序已更新。';
                    $messageType = 'success';
                }
                break;
        }
    } catch (Throwable $e) {
        $message = '操作失败: ' . $e->getMessage();
        $messageType = 'error';
    }
}

// 筛选分类
$filterCat = $_GET['cat'] ?? '';
$search    = trim($_GET['search'] ?? '');

// 获取产品列表
$sql = 'SELECT * FROM products WHERE 1=1';
$params = [];
if ($filterCat !== '') {
    $sql .= ' AND category = ?';
    $params[] = $filterCat;
}
if ($search !== '') {
    $sql .= ' AND (name LIKE ? OR description LIKE ? OR origin LIKE ?)';
    $params[] = "%{$search}%";
    $params[] = "%{$search}%";
    $params[] = "%{$search}%";
}
$sql .= ' ORDER BY sort_order, id';

$stmt = db()->prepare($sql);
$stmt->execute($params);
$products = $stmt->fetchAll();

// 统计各分类数量
$catCounts = [];
foreach (get_categories() as $cat) {
    $stmt = db()->prepare('SELECT COUNT(*) FROM products WHERE category = ?');
    $stmt->execute([$cat]);
    $catCounts[$cat] = (int)$stmt->fetchColumn();
}

require_once __DIR__ . '/header.php';
?>

<?php if ($message): ?>
    <div class="alert alert-<?= e($messageType) ?>" data-auto-dismiss><?= e($message) ?></div>
<?php endif; ?>

<!-- 筛选 & 搜索 -->
<div class="card">
    <div class="card-body" style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
        <form method="GET" style="display:flex;gap:0.5rem;flex:1;flex-wrap:wrap;align-items:center;">
            <select name="cat" onchange="this.form.submit()" style="padding:0.5rem;border:1px solid var(--border);border-radius:4px;">
                <option value="">全部分类 (<?= array_sum($catCounts) ?>)</option>
                <?php foreach (get_categories() as $cat): ?>
                    <option value="<?= e($cat) ?>" <?= $filterCat === $cat ? 'selected' : '' ?>>
                        <?= e($cat) ?> (<?= $catCounts[$cat] ?? 0 ?>)
                    </option>
                <?php endforeach; ?>
            </select>
            <input type="text" name="search" value="<?= e($search) ?>"
                   placeholder="搜索产品名称、描述、产地..."
                   style="flex:1;min-width:200px;padding:0.5rem;border:1px solid var(--border);border-radius:4px;">
            <button type="submit" class="btn btn-outline btn-sm">🔍 搜索</button>
            <?php if ($filterCat || $search): ?>
                <a href="products.php" class="btn btn-outline btn-sm">清除</a>
            <?php endif; ?>
        </form>
        <button type="button" class="btn btn-primary" onclick="openModal('productModal'); resetProductForm();">
            ➕ 添加产品
        </button>
    </div>
</div>

<!-- 产品列表 -->
<div class="card">
    <div class="card-header">
        <h2>产品列表 (<?= count($products) ?>)</h2>
    </div>
    <div class="card-body" style="overflow-x:auto;">
        <?php if (empty($products)): ?>
            <div class="empty-state">
                <div class="icon">📭</div>
                <p>暂无产品，点击右上角添加。</p>
            </div>
        <?php else: ?>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>排序</th>
                        <th>图片</th>
                        <th>名称</th>
                        <th>分类</th>
                        <th>产地</th>
                        <th>规格</th>
                        <th>包装</th>
                        <th>特色</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($products as $i => $p): ?>
                        <tr>
                            <td style="white-space:nowrap;">
                                <form method="POST" style="display:inline;">
                                    <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
                                    <input type="hidden" name="action" value="move_product">
                                    <input type="hidden" name="id" value="<?= (int)$p['id'] ?>">
                                    <button type="submit" name="direction" value="up"
                                            class="btn btn-outline btn-sm" style="padding:2px 6px;"
                                            <?= $i === 0 ? 'disabled' : '' ?>>↑</button>
                                    <button type="submit" name="direction" value="down"
                                            class="btn btn-outline btn-sm" style="padding:2px 6px;"
                                            <?= $i === count($products) - 1 ? 'disabled' : '' ?>>↓</button>
                                </form>
                            </td>
                            <td>
                                <?php if ($p['image_url']): ?>
                                    <img class="thumb" src="<?= e($p['image_url']) ?>" alt="">
                                <?php else: ?>
                                    <span style="color:var(--text-muted);font-size:0.8rem;">无图片</span>
                                <?php endif; ?>
                            </td>
                            <td><strong><?= e($p['name']) ?></strong></td>
                            <td>
                                <span class="badge
                                    <?php
                                    $badgeColors = [
                                        'Green Tea' => 'badge-green',
                                        'Black Tea' => 'badge-blue',
                                        'Oolong Tea' => 'badge-gold',
                                        'White Tea' => 'badge-gray',
                                        'Pu-erh Tea' => 'badge-gold',
                                        'Matcha' => 'badge-green',
                                        'OEM/ODM' => 'badge-blue',
                                    ];
                                    echo $badgeColors[$p['category']] ?? 'badge-gray';
                                    ?>">
                                    <?= e($p['category']) ?>
                                </span>
                            </td>
                            <td><?= e($p['origin']) ?></td>
                            <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                <?= e($p['specifications']) ?>
                            </td>
                            <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                <?= e($p['packaging']) ?>
                            </td>
                            <td>
                                <?php if ($p['featured']): ?>
                                    <span class="badge badge-gold">★ 特色</span>
                                <?php else: ?>
                                    <span style="color:var(--text-muted);">—</span>
                                <?php endif; ?>
                            </td>
                            <td class="actions">
                                <button class="btn btn-outline btn-sm"
                                        onclick='editProduct(<?= (int)$p['id'] ?>, <?= e(json_encode($p, JSON_UNESCAPED_UNICODE|JSON_HEX_APOS|JSON_HEX_QUOT)) ?>)'>
                                    ✏️ 编辑
                                </button>
                                <form method="POST" style="display:inline;"
                                      onsubmit="return confirm('确定删除产品「<?= e($p['name']) ?>」吗？');">
                                    <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
                                    <input type="hidden" name="action" value="delete_product">
                                    <input type="hidden" name="id" value="<?= (int)$p['id'] ?>">
                                    <button type="submit" class="btn btn-danger btn-sm">🗑️ 删除</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>

<!-- ===== 产品编辑/添加模态框 ===== -->
<div class="modal-overlay" id="productModal">
    <div class="modal" style="max-width:650px;">
        <div class="modal-header">
            <h2 id="productModalTitle">添加产品</h2>
            <button class="modal-close" onclick="closeModal('productModal')">&times;</button>
        </div>
        <form method="POST" enctype="multipart/form-data" id="productForm">
            <div class="modal-body">
                <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
                <input type="hidden" name="action" value="save_product">
                <input type="hidden" name="id" id="prod_id" value="0">
                <input type="hidden" name="existing_image" id="prod_existing_image" value="">

                <div class="form-grid">
                    <div class="form-group">
                        <label>产品名称 *</label>
                        <input type="text" name="name" id="prod_name" required>
                    </div>
                    <div class="form-group">
                        <label>分类 *</label>
                        <select name="category" id="prod_category" required>
                            <?php foreach (get_categories() as $cat): ?>
                                <option value="<?= e($cat) ?>"><?= e($cat) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group full">
                        <label>产品描述</label>
                        <textarea name="description" id="prod_description" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label>产地</label>
                        <input type="text" name="origin" id="prod_origin"
                               placeholder="如: Hunan, China">
                    </div>
                    <div class="form-group">
                        <label>规格 / 最小起订量</label>
                        <input type="text" name="specifications" id="prod_specifications"
                               placeholder="如: 100kg min order">
                    </div>
                    <div class="form-group">
                        <label>包装信息</label>
                        <input type="text" name="packaging" id="prod_packaging"
                               placeholder="如: 25kg/bag, 1kg/foil bag">
                    </div>
                    <div class="form-group">
                        <label>特色产品</label>
                        <label style="display:flex;align-items:center;gap:0.5rem;font-weight:normal;cursor:pointer;">
                            <input type="checkbox" name="featured" id="prod_featured" value="1">
                            标记为特色产品（首页精选展示）
                        </label>
                    </div>
                    <div class="form-group full">
                        <label>产品图片</label>
                        <input type="file" name="image" accept="image/*" data-preview="preview_product">
                        <div class="hint">支持 JPG/PNG/GIF/WEBP，最大 2MB</div>
                        <div class="image-preview" id="preview_product" style="width:200px;height:200px;">
                            <div class="placeholder"><span>🖼️</span>预览</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline" onclick="closeModal('productModal')">取消</button>
                <button type="submit" class="btn btn-primary">💾 保存</button>
            </div>
        </form>
    </div>
</div>

<script>
function resetProductForm() {
    document.getElementById('productModalTitle').textContent = '添加产品';
    document.getElementById('prod_id').value = '0';
    document.getElementById('prod_name').value = '';
    document.getElementById('prod_category').selectedIndex = 0;
    document.getElementById('prod_description').value = '';
    document.getElementById('prod_origin').value = '';
    document.getElementById('prod_specifications').value = '';
    document.getElementById('prod_packaging').value = '';
    document.getElementById('prod_featured').checked = false;
    document.getElementById('prod_existing_image').value = '';
    document.getElementById('preview_product').innerHTML =
        '<div class="placeholder"><span>🖼️</span>预览</div>';
}

function editProduct(id, data) {
    document.getElementById('productModalTitle').textContent = '编辑产品';
    document.getElementById('prod_id').value = id;
    document.getElementById('prod_name').value = data.name || '';
    document.getElementById('prod_description').value = data.description || '';
    document.getElementById('prod_origin').value = data.origin || '';
    document.getElementById('prod_specifications').value = data.specifications || '';
    document.getElementById('prod_packaging').value = data.packaging || '';
    document.getElementById('prod_featured').checked = data.featured == 1;
    document.getElementById('prod_existing_image').value = data.image_url || '';

    // 选中分类
    var sel = document.getElementById('prod_category');
    for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === data.category) {
            sel.selectedIndex = i;
            break;
        }
    }

    var preview = document.getElementById('preview_product');
    if (data.image_url) {
        preview.innerHTML = '<img src="' + data.image_url + '" alt="预览">';
    } else {
        preview.innerHTML = '<div class="placeholder"><span>🖼️</span>预览</div>';
    }

    openModal('productModal');
}
</script>

<?php require_once __DIR__ . '/footer.php'; ?>
