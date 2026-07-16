<?php
/**
 * about.php — 关于我们板块的文字图片视频修改
 *
 * 功能：
 *  - 修改关于我们的文字内容（公司概述、生产步骤等）
 *  - 修改关于我们的图片/视频 URL
 *  - 修改工厂图片
 *  - 修改市场覆盖范围标签
 *  - 修改质量控制板块内容
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

$pageTitle = '关于我们';
$currentPage = 'about';

$message = '';
$messageType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();

    try {
        $pairs = [];

        // --- 页面标题 ---
        $pairs['about_title']          = $_POST['about_title'] ?? '';
        $pairs['about_subtitle']       = $_POST['about_subtitle'] ?? '';
        $pairs['about_overview']       = $_POST['about_overview'] ?? '';

        // --- 生产标题 ---
        $pairs['about_production_title'] = $_POST['about_production_title'] ?? '';
        $pairs['about_production_desc']  = $_POST['about_production_desc'] ?? '';

        // --- 5个生产步骤 ---
        for ($i = 1; $i <= 5; $i++) {
            $pairs["step{$i}_title"] = $_POST["step{$i}_title"] ?? '';
            $pairs["step{$i}_desc"]  = $_POST["step{$i}_desc"] ?? '';
        }

        // --- 全球网络 ---
        $pairs['global_title']            = $_POST['global_title'] ?? '';
        $pairs['global_desc']             = $_POST['global_desc'] ?? '';
        $pairs['global_continents']       = $_POST['global_continents'] ?? '';
        $pairs['global_continents_label'] = $_POST['global_continents_label'] ?? '';
        $pairs['global_importers']        = $_POST['global_importers'] ?? '';
        $pairs['global_importers_label']  = $_POST['global_importers_label'] ?? '';
        $pairs['global_containers']       = $_POST['global_containers'] ?? '';
        $pairs['global_containers_label'] = $_POST['global_containers_label'] ?? '';
        $pairs['market_tags']             = $_POST['market_tags'] ?? '';

        // --- 质量控制 ---
        $pairs['qc_title']         = $_POST['qc_title'] ?? '';
        $pairs['qc_desc']          = $_POST['qc_desc'] ?? '';
        $pairs['qc_lab_title']     = $_POST['qc_lab_title'] ?? '';
        $pairs['qc_lab_desc']      = $_POST['qc_lab_desc'] ?? '';
        $pairs['qc_audit_title']   = $_POST['qc_audit_title'] ?? '';
        $pairs['qc_audit_desc']    = $_POST['qc_audit_desc'] ?? '';
        $pairs['qc_sensory_title'] = $_POST['qc_sensory_title'] ?? '';
        $pairs['qc_sensory_desc']  = $_POST['qc_sensory_desc'] ?? '';
        $pairs['qc_trace_title']   = $_POST['qc_trace_title'] ?? '';
        $pairs['qc_trace_desc']    = $_POST['qc_trace_desc'] ?? '';
        $pairs['qc_global_title']  = $_POST['qc_global_title'] ?? '';
        $pairs['qc_global_desc']   = $_POST['qc_global_desc'] ?? '';

        // --- 图片/视频上传 ---
        $uploaded = handle_upload('about_image');
        if ($uploaded !== null) {
            $pairs['about_image'] = $uploaded;
        }

        $pairs['about_video_url'] = $_POST['about_video_url'] ?? '';

        for ($i = 1; $i <= 3; $i++) {
            $uploaded = handle_upload('factory_image_' . $i);
            if ($uploaded !== null) {
                $pairs['factory_image_' . $i] = $uploaded;
            }
        }

        set_config_batch($pairs);
        log_action('update_about', 'Updated about us page');

        $message = '关于我们页面保存成功！';
        $messageType = 'success';
    } catch (Throwable $e) {
        $message = '保存失败: ' . $e->getMessage();
        $messageType = 'error';
    }
}

require_once __DIR__ . '/header.php';
?>

<?php if ($message): ?>
    <div class="alert alert-<?= e($messageType) ?>" data-auto-dismiss><?= e($message) ?></div>
<?php endif; ?>

<form method="POST" enctype="multipart/form-data" data-dirty-check>
    <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">

    <!-- 页面标题 & 概述 -->
    <div class="card">
        <div class="card-header"><h2>ℹ️ 页面标题 & 概述</h2></div>
        <div class="card-body">
            <div class="form-grid">
                <div class="form-group full">
                    <label>页面标题</label>
                    <input type="text" name="about_title" value="<?= e(get_config('about_title')) ?>">
                </div>
                <div class="form-group full">
                    <label>页面副标题</label>
                    <input type="text" name="about_subtitle" value="<?= e(get_config('about_subtitle')) ?>">
                </div>
                <div class="form-group full">
                    <label>公司概述</label>
                    <textarea name="about_overview" rows="5"><?= e(get_config('about_overview')) ?></textarea>
                </div>
            </div>
        </div>
    </div>

    <!-- 生产 & 加工 -->
    <div class="card">
        <div class="card-header"><h2>🏭 生产 & 加工</h2></div>
        <div class="card-body">
            <div class="form-grid">
                <div class="form-group full">
                    <label>板块标题</label>
                    <input type="text" name="about_production_title" value="<?= e(get_config('about_production_title')) ?>">
                </div>
                <div class="form-group full">
                    <label>板块描述</label>
                    <input type="text" name="about_production_desc" value="<?= e(get_config('about_production_desc')) ?>">
                </div>
            </div>

            <h3 style="margin:1.5rem 0 0.75rem;">生产步骤</h3>
            <?php for ($i = 1; $i <= 5; $i++): ?>
                <div class="form-grid" style="margin-bottom:0.75rem;">
                    <div class="form-group">
                        <label>步骤 <?= $i ?> 标题</label>
                        <input type="text" name="step<?= $i ?>_title"
                               value="<?= e(get_config('step' . $i . '_title')) ?>">
                    </div>
                    <div class="form-group">
                        <label>步骤 <?= $i ?> 描述</label>
                        <textarea name="step<?= $i ?>_desc" rows="2"><?= e(get_config('step' . $i . '_desc')) ?></textarea>
                    </div>
                </div>
            <?php endfor; ?>
        </div>
    </div>

    <!-- 全球销售网络 -->
    <div class="card">
        <div class="card-header"><h2>🌍 全球销售网络</h2></div>
        <div class="card-body">
            <div class="form-grid">
                <div class="form-group">
                    <label>板块标题</label>
                    <input type="text" name="global_title" value="<?= e(get_config('global_title')) ?>">
                </div>
                <div class="form-group">
                    <label>板块描述</label>
                    <input type="text" name="global_desc" value="<?= e(get_config('global_desc')) ?>">
                </div>
            </div>

            <h3 style="margin:1.5rem 0 0.75rem;">全球数据</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label>大洲数</label>
                    <input type="text" name="global_continents" value="<?= e(get_config('global_continents')) ?>">
                    <label style="margin-top:0.5rem;">标签</label>
                    <input type="text" name="global_continents_label" value="<?= e(get_config('global_continents_label')) ?>">
                </div>
                <div class="form-group">
                    <label>进口商数</label>
                    <input type="text" name="global_importers" value="<?= e(get_config('global_importers')) ?>">
                    <label style="margin-top:0.5rem;">标签</label>
                    <input type="text" name="global_importers_label" value="<?= e(get_config('global_importers_label')) ?>">
                </div>
                <div class="form-group">
                    <label>年集装箱数</label>
                    <input type="text" name="global_containers" value="<?= e(get_config('global_containers')) ?>">
                    <label style="margin-top:0.5rem;">标签</label>
                    <input type="text" name="global_containers_label" value="<?= e(get_config('global_containers_label')) ?>">
                </div>
            </div>

            <div class="form-group" style="margin-top:1rem;">
                <label>市场覆盖标签</label>
                <textarea name="market_tags" rows="3"><?= e(get_config('market_tags')) ?></textarea>
                <div class="hint">用竖线 | 分隔每个标签，如：🇪🇺 Europe|🇺🇸 North America</div>
            </div>
        </div>
    </div>

    <!-- 质量控制 -->
    <div class="card">
        <div class="card-header"><h2>🔬 质量控制 & 认证</h2></div>
        <div class="card-body">
            <div class="form-grid">
                <div class="form-group">
                    <label>板块标题</label>
                    <input type="text" name="qc_title" value="<?= e(get_config('qc_title')) ?>">
                </div>
                <div class="form-group">
                    <label>板块描述</label>
                    <input type="text" name="qc_desc" value="<?= e(get_config('qc_desc')) ?>">
                </div>
            </div>

            <h3 style="margin:1.5rem 0 0.75rem;">质量控制步骤</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label>实验室检测 - 标题</label>
                    <input type="text" name="qc_lab_title" value="<?= e(get_config('qc_lab_title')) ?>">
                    <label style="margin-top:0.5rem;">描述</label>
                    <textarea name="qc_lab_desc" rows="2"><?= e(get_config('qc_lab_desc')) ?></textarea>
                </div>
                <div class="form-group">
                    <label>过程审核 - 标题</label>
                    <input type="text" name="qc_audit_title" value="<?= e(get_config('qc_audit_title')) ?>">
                    <label style="margin-top:0.5rem;">描述</label>
                    <textarea name="qc_audit_desc" rows="2"><?= e(get_config('qc_audit_desc')) ?></textarea>
                </div>
                <div class="form-group">
                    <label>感官评审 - 标题</label>
                    <input type="text" name="qc_sensory_title" value="<?= e(get_config('qc_sensory_title')) ?>">
                    <label style="margin-top:0.5rem;">描述</label>
                    <textarea name="qc_sensory_desc" rows="2"><?= e(get_config('qc_sensory_desc')) ?></textarea>
                </div>
                <div class="form-group">
                    <label>可追溯性 - 标题</label>
                    <input type="text" name="qc_trace_title" value="<?= e(get_config('qc_trace_title')) ?>">
                    <label style="margin-top:0.5rem;">描述</label>
                    <textarea name="qc_trace_desc" rows="2"><?= e(get_config('qc_trace_desc')) ?></textarea>
                </div>
                <div class="form-group">
                    <label>全球标准 - 标题</label>
                    <input type="text" name="qc_global_title" value="<?= e(get_config('qc_global_title')) ?>">
                    <label style="margin-top:0.5rem;">描述</label>
                    <textarea name="qc_global_desc" rows="2"><?= e(get_config('qc_global_desc')) ?></textarea>
                </div>
            </div>
        </div>
    </div>

    <!-- 图片 & 视频 -->
    <div class="card">
        <div class="card-header"><h2>🖼️ 图片 & 视频</h2></div>
        <div class="card-body">
            <div class="form-grid">
                <div class="form-group">
                    <label>关于我们主图</label>
                    <input type="file" name="about_image" accept="image/*" data-preview="preview_about">
                    <?php $img = get_config('about_image'); ?>
                    <?php if ($img): ?>
                        <div class="current-image"><img src="<?= e($img) ?>" alt="About"></div>
                    <?php endif; ?>
                    <div class="image-preview" id="preview_about">
                        <div class="placeholder"><span>🖼️</span>预览</div>
                    </div>
                </div>
                <div class="form-group">
                    <label>视频 URL</label>
                    <input type="url" name="about_video_url" value="<?= e(get_config('about_video_url')) ?>"
                           placeholder="https://...">
                    <div class="hint">支持 YouTube、Vimeo 或直链视频</div>
                </div>
            </div>

            <h3 style="margin:1.5rem 0 0.75rem;">工厂图片</h3>
            <div class="form-grid">
                <?php for ($i = 1; $i <= 3; $i++): ?>
                    <div class="form-group">
                        <label>工厂图片 <?= $i ?></label>
                        <input type="file" name="factory_image_<?= $i ?>" accept="image/*"
                               data-preview="preview_factory_<?= $i ?>">
                        <?php $fimg = get_config('factory_image_' . $i); ?>
                        <?php if ($fimg): ?>
                            <div class="current-image"><img src="<?= e($fimg) ?>" alt="Factory <?= $i ?>"></div>
                        <?php endif; ?>
                        <div class="image-preview" id="preview_factory_<?= $i ?>">
                            <div class="placeholder"><span>🖼️</span>预览</div>
                        </div>
                    </div>
                <?php endfor; ?>
            </div>
        </div>
    </div>

    <div class="form-actions">
        <button type="submit" class="btn btn-primary">💾 保存所有设置</button>
        <button type="reset" class="btn btn-outline">重置</button>
    </div>
</form>

<?php require_once __DIR__ . '/footer.php'; ?>
