<?php
/**
 * home.php — 首页图标图片修改
 *
 * 功能：
 *  - 修改首页 hero 区背景图（3张）
 *  - 修改网站 logo URL
 *  - 修改首页宣传文字（标题、副标题、徽章、按钮文字）
 *  - 修改首页特色板块（4个 feature cards 的标题、描述、图标）
 *  - 修改精选集合标题
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

$pageTitle = '首页管理';
$currentPage = 'home';

$message = '';
$messageType = '';

// 处理表单提交
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();

    try {
        $pairs = [];

        // --- Logo & 品牌 ---
        $pairs['logo_url']       = $_POST['logo_url'] ?? '';
        $pairs['logo_emoji']     = $_POST['logo_emoji'] ?? '🍃';
        $pairs['logo_text_main'] = $_POST['logo_text_main'] ?? '';
        $pairs['logo_text_sub']  = $_POST['logo_text_sub'] ?? '';

        // --- Hero 区文字 ---
        $pairs['hero_badge']        = $_POST['hero_badge'] ?? '';
        $pairs['hero_title']        = $_POST['hero_title'] ?? '';
        $pairs['hero_subtitle']     = $_POST['hero_subtitle'] ?? '';
        $pairs['hero_cta_products'] = $_POST['hero_cta_products'] ?? '';
        $pairs['hero_cta_inquiry']  = $_POST['hero_cta_inquiry'] ?? '';

        // --- Hero 图片上传 ---
        for ($i = 1; $i <= 3; $i++) {
            $uploaded = handle_upload('hero_image_' . $i);
            if ($uploaded !== null) {
                $pairs['hero_image_' . $i] = $uploaded;
            }
        }

        // --- 精选集合 ---
        $pairs['featured_title']    = $_POST['featured_title'] ?? '';
        $pairs['featured_subtitle'] = $_POST['featured_subtitle'] ?? '';

        // --- 特色板块 ---
        $pairs['feature_title']  = $_POST['feature_title'] ?? '';
        for ($i = 1; $i <= 4; $i++) {
            $pairs["feature{$i}_title"] = $_POST["feature{$i}_title"] ?? '';
            $pairs["feature{$i}_desc"]  = $_POST["feature{$i}_desc"] ?? '';
            $pairs["feature{$i}_icon"]  = $_POST["feature{$i}_icon"] ?? '';
        }

        set_config_batch($pairs);
        log_action('update_home', 'Updated homepage settings');

        $message = '首页设置保存成功！';
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

<!-- Logo & 品牌 -->
<div class="card">
    <div class="card-header"><h2>🏷️ Logo & 品牌标识</h2></div>
    <div class="card-body">
        <div class="form-grid">
            <div class="form-group">
                <label>Logo 图片 URL</label>
                <input type="url" name="logo_url" value="<?= e(get_config('logo_url')) ?>"
                       placeholder="https://...">
                <div class="hint">网站 favicon 和 logo 图片地址</div>
            </div>
            <div class="form-group">
                <label>Logo Emoji</label>
                <input type="text" name="logo_emoji" value="<?= e(get_config('logo_emoji')) ?>"
                       placeholder="🍃" maxlength="10">
            </div>
            <div class="form-group">
                <label>品牌主名称</label>
                <input type="text" name="logo_text_main" value="<?= e(get_config('logo_text_main')) ?>">
            </div>
            <div class="form-group">
                <label>品牌副名称</label>
                <input type="text" name="logo_text_sub" value="<?= e(get_config('logo_text_sub')) ?>">
            </div>
        </div>
    </div>
</div>

<!-- Hero 区 -->
<div class="card">
    <div class="card-header"><h2>🎯 Hero 区（首屏大图）</h2></div>
    <div class="card-body">
        <form method="POST" enctype="multipart/form-data" data-dirty-check>
            <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">

            <div class="form-grid">
                <div class="form-group full">
                    <label>徽章文字 (Badge)</label>
                    <input type="text" name="hero_badge" value="<?= e(get_config('hero_badge')) ?>">
                </div>
                <div class="form-group full">
                    <label>主标题</label>
                    <input type="text" name="hero_title" value="<?= e(get_config('hero_title')) ?>">
                </div>
                <div class="form-group full">
                    <label>副标题</label>
                    <input type="text" name="hero_subtitle" value="<?= e(get_config('hero_subtitle')) ?>">
                </div>
                <div class="form-group">
                    <label>按钮文字 - 浏览产品</label>
                    <input type="text" name="hero_cta_products" value="<?= e(get_config('hero_cta_products')) ?>">
                </div>
                <div class="form-group">
                    <label>按钮文字 - 询价</label>
                    <input type="text" name="hero_cta_inquiry" value="<?= e(get_config('hero_cta_inquiry')) ?>">
                </div>
            </div>

            <h3 style="margin-top:1.5rem;margin-bottom:0.75rem;">轮播图片</h3>
            <div class="form-grid">
                <?php for ($i = 1; $i <= 3; $i++): ?>
                    <div class="form-group">
                        <label>Hero 图片 <?= $i ?></label>
                        <input type="file" name="hero_image_<?= $i ?>" accept="image/*"
                               data-preview="preview_hero_<?= $i ?>">
                        <?php $heroImg = get_config('hero_image_' . $i); ?>
                        <?php if ($heroImg): ?>
                            <div class="current-image">
                                <img src="<?= e($heroImg) ?>" alt="Hero <?= $i ?>">
                            </div>
                        <?php endif; ?>
                        <div class="image-preview" id="preview_hero_<?= $i ?>">
                            <div class="placeholder">
                                <span>🖼️</span>预览
                            </div>
                        </div>
                    </div>
                <?php endfor; ?>
            </div>

            <!-- 精选集合 -->
            <h3 style="margin-top:1.5rem;margin-bottom:0.75rem;">精选集合</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label>精选集合标题</label>
                    <input type="text" name="featured_title" value="<?= e(get_config('featured_title')) ?>">
                </div>
                <div class="form-group">
                    <label>精选集合副标题</label>
                    <input type="text" name="featured_subtitle" value="<?= e(get_config('featured_subtitle')) ?>">
                </div>
            </div>

            <!-- 特色板块 -->
            <h3 style="margin-top:1.5rem;margin-bottom:0.75rem;">特色板块 (Why Choose Xiangfeng?)</h3>
            <div class="form-group">
                <label>板块标题</label>
                <input type="text" name="feature_title" value="<?= e(get_config('feature_title')) ?>">
            </div>

            <div class="form-grid">
                <?php for ($i = 1; $i <= 4; $i++): ?>
                    <div class="form-group">
                        <label>特色 <?= $i ?> 图标 (Font Awesome 类名)</label>
                        <input type="text" name="feature<?= $i ?>_icon"
                               value="<?= e(get_config('feature' . $i . '_icon')) ?>"
                               placeholder="fas fa-seedling">
                        <label style="margin-top:0.75rem;">特色 <?= $i ?> 标题</label>
                        <input type="text" name="feature<?= $i ?>_title"
                               value="<?= e(get_config('feature' . $i . '_title')) ?>">
                        <label style="margin-top:0.75rem;">特色 <?= $i ?> 描述</label>
                        <textarea name="feature<?= $i ?>_desc" rows="3"><?= e(get_config('feature' . $i . '_desc')) ?></textarea>
                    </div>
                <?php endfor; ?>
            </div>

            <!-- 隐藏的 Logo 字段（合并到一个表单） -->
            <input type="hidden" name="logo_url" value="<?= e(get_config('logo_url')) ?>">
            <input type="hidden" name="logo_emoji" value="<?= e(get_config('logo_emoji')) ?>">
            <input type="hidden" name="logo_text_main" value="<?= e(get_config('logo_text_main')) ?>">
            <input type="hidden" name="logo_text_sub" value="<?= e(get_config('logo_text_sub')) ?>">

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">💾 保存所有设置</button>
                <button type="reset" class="btn btn-outline">重置</button>
            </div>
        </form>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
