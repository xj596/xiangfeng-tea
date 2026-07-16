<?php
/**
 * company.php — 公司证书和文字介绍修改
 *
 * 功能：
 *  - 添加/编辑/删除证书（名称、描述、图片）
 *  - 修改公司简介文字
 *  - 修改公司统计数据（种植面积、出口国家数等）
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

$pageTitle = '公司证书';
$currentPage = 'company';

$message = '';
$messageType = '';

// ===== 处理 AJAX/POST 操作 =====
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();
    $action = $_POST['action'] ?? '';

    try {
        switch ($action) {

            // --- 保存公司简介 ---
            case 'save_overview':
                $pairs = [
                    'company_overview'      => $_POST['company_overview'] ?? '',
                    'stat_plantation'       => $_POST['stat_plantation'] ?? '',
                    'stat_plantation_label' => $_POST['stat_plantation_label'] ?? '',
                    'stat_countries'        => $_POST['stat_countries'] ?? '',
                    'stat_countries_label'  => $_POST['stat_countries_label'] ?? '',
                    'stat_years'            => $_POST['stat_years'] ?? '',
                    'stat_years_label'      => $_POST['stat_years_label'] ?? '',
                    'stat_tons'             => $_POST['stat_tons'] ?? '',
                    'stat_tons_label'       => $_POST['stat_tons_label'] ?? '',
                ];
                set_config_batch($pairs);
                log_action('update_company', 'Updated company overview & stats');
                $message = '公司简介保存成功！';
                $messageType = 'success';
                break;

            // --- 添加/编辑证书 ---
            case 'save_cert':
                $id          = (int)($_POST['id'] ?? 0);
                $name        = trim($_POST['name'] ?? '');
                $description = trim($_POST['description'] ?? '');

                if ($name === '') {
                    throw new RuntimeException('证书名称不能为空。');
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
                            UPDATE certifications
                            SET name = ?, description = ?, image_url = ?
                            WHERE id = ?
                        ");
                        $stmt->execute([$name, $description, $imageUrl, $id]);
                    } else {
                        $stmt = db()->prepare("
                            UPDATE certifications
                            SET name = ?, description = ?
                            WHERE id = ?
                        ");
                        $stmt->execute([$name, $description, $id]);
                    }
                    log_action('edit_cert', 'Cert: ' . $name);
                    $message = '证书更新成功！';
                } else {
                    // 添加
                    $sortOrder = (int)db()->query('SELECT COALESCE(MAX(sort_order), 0) + 1 FROM certifications')->fetchColumn();
                    $stmt = db()->prepare("
                        INSERT INTO certifications (name, description, image_url, sort_order)
                        VALUES (?, ?, ?, ?)
                    ");
                    $stmt->execute([$name, $description, $imageUrl, $sortOrder]);
                    log_action('add_cert', 'Cert: ' . $name);
                    $message = '证书添加成功！';
                }
                $messageType = 'success';
                break;

            // --- 删除证书 ---
            case 'delete_cert':
                $id = (int)($_POST['id'] ?? 0);
                if ($id > 0) {
                    $stmt = db()->prepare('SELECT name FROM certifications WHERE id = ?');
                    $stmt->execute([$id]);
                    $cert = $stmt->fetch();
                    $stmt = db()->prepare('DELETE FROM certifications WHERE id = ?');
                    $stmt->execute([$id]);
                    log_action('delete_cert', 'Cert ID: ' . $id . ' (' . ($cert['name'] ?? '') . ')');
                    $message = '证书已删除。';
                    $messageType = 'success';
                }
                break;

            // --- 证书排序 ---
            case 'sort_certs':
                $orders = $_POST['orders'] ?? [];
                if (is_array($orders)) {
                    $stmt = db()->prepare('UPDATE certifications SET sort_order = ? WHERE id = ?');
                    foreach ($orders as $order => $id) {
                        $stmt->execute([(int)$order, (int)$id]);
                    }
                    log_action('sort_certs', 'Reordered certificates');
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

// 获取证书列表
$certs = db()->query('SELECT * FROM certifications ORDER BY sort_order, id')->fetchAll();

require_once __DIR__ . '/header.php';
?>

<?php if ($message): ?>
    <div class="alert alert-<?= e($messageType) ?>" data-auto-dismiss><?= e($message) ?></div>
<?php endif; ?>

<!-- 公司简介 -->
<div class="card">
    <div class="card-header"><h2>🏢 公司简介 & 数据</h2></div>
    <div class="card-body">
        <form method="POST" data-dirty-check>
            <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
            <input type="hidden" name="action" value="save_overview">

            <div class="form-group">
                <label>公司简介文字</label>
                <textarea name="company_overview" rows="6"><?= e(get_config('company_overview')) ?></textarea>
                <div class="hint">支持纯文本，显示在公司介绍页面顶部</div>
            </div>

            <h3 style="margin:1.5rem 0 0.75rem;">公司数据统计</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label>种植面积 - 数值</label>
                    <input type="text" name="stat_plantation" value="<?= e(get_config('stat_plantation')) ?>">
                    <label style="margin-top:0.75rem;">种植面积 - 标签</label>
                    <input type="text" name="stat_plantation_label" value="<?= e(get_config('stat_plantation_label')) ?>">
                </div>
                <div class="form-group">
                    <label>出口国家 - 数值</label>
                    <input type="text" name="stat_countries" value="<?= e(get_config('stat_countries')) ?>">
                    <label style="margin-top:0.75rem;">出口国家 - 标签</label>
                    <input type="text" name="stat_countries_label" value="<?= e(get_config('stat_countries_label')) ?>">
                </div>
                <div class="form-group">
                    <label>经营年限 - 数值</label>
                    <input type="text" name="stat_years" value="<?= e(get_config('stat_years')) ?>">
                    <label style="margin-top:0.75rem;">经营年限 - 标签</label>
                    <input type="text" name="stat_years_label" value="<?= e(get_config('stat_years_label')) ?>">
                </div>
                <div class="form-group">
                    <label>年产能力 - 数值</label>
                    <input type="text" name="stat_tons" value="<?= e(get_config('stat_tons')) ?>">
                    <label style="margin-top:0.75rem;">年产能力 - 标签</label>
                    <input type="text" name="stat_tons_label" value="<?= e(get_config('stat_tons_label')) ?>">
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">💾 保存公司简介</button>
            </div>
        </form>
    </div>
</div>

<!-- 证书管理 -->
<div class="card">
    <div class="card-header">
        <h2>🏅 证书管理</h2>
        <button type="button" class="btn btn-primary btn-sm" onclick="openModal('certModal'); resetCertForm();">
            ➕ 添加证书
        </button>
    </div>
    <div class="card-body">
        <?php if (empty($certs)): ?>
            <div class="empty-state">
                <div class="icon">📭</div>
                <p>暂无证书，点击右上角添加。</p>
            </div>
        <?php else: ?>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>排序</th>
                        <th>图片</th>
                        <th>名称</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($certs as $i => $cert): ?>
                        <tr>
                            <td><?= $i + 1 ?></td>
                            <td>
                                <?php if ($cert['image_url']): ?>
                                    <img class="thumb" src="<?= e($cert['image_url']) ?>" alt="">
                                <?php else: ?>
                                    <span style="color:var(--text-muted);">无图片</span>
                                <?php endif; ?>
                            </td>
                            <td><strong><?= e($cert['name']) ?></strong></td>
                            <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                <?= e($cert['description']) ?>
                            </td>
                            <td class="actions">
                                <button class="btn btn-outline btn-sm"
                                        onclick="editCert(<?= (int)$cert['id'] ?>, <?= e(json_encode($cert, JSON_UNESCAPED_UNICODE|JSON_HEX_APOS|JSON_HEX_QUOT)) ?>)">
                                    ✏️ 编辑
                                </button>
                                <form method="POST" style="display:inline;"
                                      onsubmit="return confirm('确定删除证书「<?= e($cert['name']) ?>」吗？');">
                                    <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
                                    <input type="hidden" name="action" value="delete_cert">
                                    <input type="hidden" name="id" value="<?= (int)$cert['id'] ?>">
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

<!-- ===== 证书编辑/添加模态框 ===== -->
<div class="modal-overlay" id="certModal">
    <div class="modal">
        <div class="modal-header">
            <h2 id="certModalTitle">添加证书</h2>
            <button class="modal-close" onclick="closeModal('certModal')">&times;</button>
        </div>
        <form method="POST" enctype="multipart/form-data" id="certForm">
            <div class="modal-body">
                <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
                <input type="hidden" name="action" value="save_cert">
                <input type="hidden" name="id" id="cert_id" value="0">
                <input type="hidden" name="existing_image" id="cert_existing_image" value="">

                <div class="form-group">
                    <label>证书名称 *</label>
                    <input type="text" name="name" id="cert_name" required>
                </div>
                <div class="form-group">
                    <label>证书描述</label>
                    <textarea name="description" id="cert_description" rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label>证书图片</label>
                    <input type="file" name="image" accept="image/*" data-preview="preview_cert">
                    <div class="image-preview" id="preview_cert">
                        <div class="placeholder"><span>🖼️</span>预览</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline" onclick="closeModal('certModal')">取消</button>
                <button type="submit" class="btn btn-primary">💾 保存</button>
            </div>
        </form>
    </div>
</div>

<script>
function resetCertForm() {
    document.getElementById('certModalTitle').textContent = '添加证书';
    document.getElementById('cert_id').value = '0';
    document.getElementById('cert_name').value = '';
    document.getElementById('cert_description').value = '';
    document.getElementById('cert_existing_image').value = '';
    document.getElementById('preview_cert').innerHTML =
        '<div class="placeholder"><span>🖼️</span>预览</div>';
}

function editCert(id, data) {
    document.getElementById('certModalTitle').textContent = '编辑证书';
    document.getElementById('cert_id').value = id;
    document.getElementById('cert_name').value = data.name || '';
    document.getElementById('cert_description').value = data.description || '';
    document.getElementById('cert_existing_image').value = data.image_url || '';

    var preview = document.getElementById('preview_cert');
    if (data.image_url) {
        preview.innerHTML = '<img src="' + data.image_url + '" alt="预览">';
    } else {
        preview.innerHTML = '<div class="placeholder"><span>🖼️</span>预览</div>';
    }

    openModal('certModal');
}
</script>

<?php require_once __DIR__ . '/footer.php'; ?>
