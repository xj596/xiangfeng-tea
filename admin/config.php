<?php
/**
 * config.php — 后台系统核心配置
 *
 * 职责：
 *  - 定义常量（路径、上传限制等）
 *  - 初始化 SQLite 数据库（首次运行自动建表 + 插入默认数据）
 *  - 提供 PDO 单例 db()
 *  - 提供 CSRF、安全输出、图片上传、配置读写等公共函数
 *
 * 要求 PHP >= 7.0 且启用 PDO_SQLITE 扩展
 */

declare(strict_types=1);

/* ============================================================
 * 1. 基础常量
 * ============================================================ */

define('ADMIN_ROOT', __DIR__);
define('ADMIN_DATA_DIR', ADMIN_ROOT . '/data');
define('ADMIN_UPLOAD_DIR', ADMIN_ROOT . '/uploads');
define('DB_PATH', ADMIN_DATA_DIR . '/admin.db');

/* 上传限制 */
define('UPLOAD_MAX_SIZE', 2 * 1024 * 1024); // 2 MB
define('UPLOAD_ALLOWED_EXT', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
define('UPLOAD_ALLOWED_MIME', [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
]);

/* Session */
define('SESSION_TIMEOUT', 30 * 60); // 30 分钟无操作自动登出

/* 默认管理员账号 */
define('DEFAULT_ADMIN_USER', 'admin');
define('DEFAULT_ADMIN_PASS', 'xiangfeng2026');

/* Rate limit */
define('LOGIN_RATE_MAX', 5);       // 最大尝试次数
define('LOGIN_RATE_WINDOW', 300);  // 5 分钟窗口（秒）

/* ============================================================
 * 2. 错误报告（生产环境可关闭）
 * ============================================================ */

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', '1');

/* ============================================================
 * 3. Session 启动 + 超时控制
 * ============================================================ */

if (session_status() === PHP_SESSION_NONE) {
    // 使用严格模式 + 仅 cookie
    ini_set('session.use_strict_mode', '1');
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    session_start();
}

/* 超时自动登出 */
if (isset($_SESSION['admin_user'])) {
    if (isset($_SESSION['admin_last_activity']) &&
        (time() - $_SESSION['admin_last_activity']) > SESSION_TIMEOUT) {
        // 超时，清除 session
        $_SESSION = [];
        session_destroy();
        // 重新启动以供后续 csrf 等使用
        session_start();
    } else {
        $_SESSION['admin_last_activity'] = time();
    }
}

/* ============================================================
 * 4. 数据库初始化（首次运行自动创建）
 * ============================================================ */

/**
 * 获取 PDO 单例
 *
 * @return PDO
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    // 确保 data 目录存在
    if (!is_dir(ADMIN_DATA_DIR)) {
        @mkdir(ADMIN_DATA_DIR, 0755, true);
    }

    $dsn = 'sqlite:' . DB_PATH;
    $pdo = new PDO($dsn, null, null, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // 启用外键约束
    $pdo->exec('PRAGMA foreign_keys = ON');

    // 如果数据库刚创建，执行建表 + 默认数据
    init_database($pdo);

    return $pdo;
}

/**
 * 建表 + 插入默认数据（仅在表不存在时执行）
 */
function init_database(PDO $pdo): void
{
    /* --- 建表 --- */
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS site_config (
            key         TEXT PRIMARY KEY,
            value       TEXT,
            updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS products (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            name         TEXT NOT NULL,
            category     TEXT NOT NULL,
            description  TEXT,
            image_url    TEXT,
            origin       TEXT,
            specifications TEXT,
            packaging    TEXT,
            featured     INTEGER DEFAULT 0,
            sort_order   INTEGER DEFAULT 0,
            created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS certifications (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT NOT NULL,
            description TEXT,
            image_url   TEXT,
            sort_order  INTEGER DEFAULT 0
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_users (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            username      TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            last_login    DATETIME
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_log (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            username   TEXT,
            action     TEXT,
            detail     TEXT,
            ip         TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    /* --- 检查是否已初始化 --- */
    $stmt = $pdo->query("SELECT COUNT(*) AS cnt FROM admin_users");
    $row = $stmt->fetch();

    if ((int)$row['cnt'] > 0) {
        return; // 已有数据，跳过
    }

    /* --- 插入默认管理员 --- */
    $hash = password_hash(DEFAULT_ADMIN_PASS, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare(
        'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)'
    );
    $stmt->execute([DEFAULT_ADMIN_USER, $hash]);

    /* --- 插入默认 site_config --- */
    $defaults = get_default_config();
    $stmt = $pdo->prepare(
        'INSERT OR IGNORE INTO site_config (key, value) VALUES (?, ?)'
    );
    foreach ($defaults as $key => $value) {
        $stmt->execute([$key, $value]);
    }

    /* --- 插入默认证书 --- */
    $certs = get_default_certs();
    $stmt = $pdo->prepare(
        'INSERT INTO certifications (name, description, image_url, sort_order) VALUES (?, ?, ?, ?)'
    );
    foreach ($certs as $i => $cert) {
        $stmt->execute([
            $cert['name'],
            $cert['description'],
            $cert['image_url'] ?? '',
            $i,
        ]);
    }

    /* --- 插入默认产品 --- */
    $products = get_default_products();
    $stmt = $pdo->prepare("
        INSERT INTO products
            (name, category, description, image_url, origin, specifications, packaging, featured, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    foreach ($products as $i => $p) {
        $stmt->execute([
            $p['name'],
            $p['category'],
            $p['description'],
            $p['image_url'],
            $p['origin'],
            $p['specifications'],
            $p['packaging'],
            $p['featured'] ?? 0,
            $i,
        ]);
    }
}

/**
 * 默认配置数据（从现有网站代码中提取）
 */
function get_default_config(): array
{
    return [
        /* --- Logo & 品牌 --- */
        'logo_url'         => 'https://video.aultras-tea.com/%E6%B9%98%E4%B8%B0logo%E5%B9%BF%E5%91%8A%E8%AF%AD-06.png',
        'logo_emoji'       => '🍃',
        'logo_text_main'   => 'Xiangfeng',
        'logo_text_sub'    => 'Tea Group',

        /* --- Hero 区 --- */
        'hero_badge'       => 'Est. 1996 · B2B Tea Export Expert',
        'hero_title'       => 'Premium Chinese Tea',
        'hero_subtitle'    => 'Direct from Origin · Certified Quality · Global Shipping',
        'hero_cta_products'=> 'Explore Products',
        'hero_cta_inquiry' => 'Request Quote',
        'hero_image_1'     => 'https://video.aultras-tea.com/wulongcha.png',
        'hero_image_2'     => 'https://video.aultras-tea.com/wulongcha.png',
        'hero_image_3'     => 'https://video.aultras-tea.com/wulongcha.png',

        /* --- 首页板块标题 --- */
        'featured_title'    => 'Featured Collections',
        'featured_subtitle' => 'Handpicked selections from our most popular export teas, ready for your market.',
        'feature_title'     => 'Why Choose Xiangfeng?',
        'feature1_title'    => 'Direct-from-Origin',
        'feature1_desc'     => 'We own plantations and partner with 2,000+ family farms across 6 provinces.',
        'feature1_icon'     => 'fas fa-seedling',
        'feature2_title'    => 'Certified Quality',
        'feature2_desc'     => 'EU & USDA Organic, ISO 22000, HACCP — full traceability.',
        'feature2_icon'     => 'fas fa-certificate',
        'feature3_title'    => 'Flexible Supply',
        'feature3_desc'     => 'Bulk wholesale, private label OEM, sample packs — MOQ as low as 50kg.',
        'feature3_icon'     => 'fas fa-globe',
        'feature4_title'    => 'Global Logistics',
        'feature4_desc'     => 'Shipping to 50+ countries via sea, air, and rail (China-Europe Express).',
        'feature4_icon'     => 'fas fa-truck-fast',

        /* --- 公司简介 --- */
        'company_overview'  => "Founded in 1999, Xiangfeng Tea Group has grown from a small family plantation in Hunan Province into one of China's largest B2B tea exporters. With 53,000 mu of organic tea plantations across 6 provinces, 3 state-of-the-art processing facilities, and partnerships with 2,000+ family farms, we deliver premium Chinese teas to over 50 countries worldwide. Our annual production capacity exceeds 50,000 tons.",
        'stat_plantation'   => '53,000',
        'stat_plantation_label' => 'Mu Plantation Area',
        'stat_countries'    => '50+',
        'stat_countries_label' => 'Countries',
        'stat_years'        => '25+',
        'stat_years_label'  => 'Years',
        'stat_tons'         => '50,000',
        'stat_tons_label'   => 'Tons Annual Capacity',

        /* --- 联系信息 --- */
        'contact_email'     => 'export@xiangfengtea.com',
        'contact_phone'     => '+86 731 8800 0000',
        'contact_whatsapp'  => '8613800000000',
        'social_linkedin'   => 'https://www.linkedin.com',
        'social_facebook'   => 'https://www.facebook.com',
        'social_instagram'  => 'https://www.instagram.com',

        /* --- 关于我们 --- */
        'about_title'       => 'About Xiangfeng Tea Group',
        'about_subtitle'    => 'From plantation to packaging, every step is carefully controlled',
        'about_overview'    => "Founded in 1999, Xiangfeng Tea Group has grown from a small family plantation in Hunan Province into one of China's largest B2B tea exporters. With 53,000 mu of organic tea plantations across 6 provinces, 3 state-of-the-art processing facilities, and partnerships with 2,000+ family farms, we deliver premium Chinese teas to over 50 countries worldwide. Our annual production capacity exceeds 50,000 tons.",
        'about_production_title' => 'Production & Processing',
        'about_production_desc'  => 'From plantation to packaging, every step is carefully controlled',

        /* --- 生产步骤 --- */
        'step1_title' => 'Harvesting',
        'step1_desc'  => '53,000 mu of organic tea plantation across 6 provinces. Hand-picked by 20,000+ skilled workers during peak season, ensuring only the finest buds and leaves are selected.',
        'step2_title' => 'Sorting & Grading',
        'step2_desc'  => 'Rigorous multi-stage selection process using both AI-powered optical sorters and experienced tea masters. Graded by leaf size, shape, color, and aroma profile.',
        'step3_title' => 'Processing & Fermentation',
        'step3_desc'  => 'State-of-the-art facilities with automated temperature and humidity control. Traditional craftsmanship combined with modern processing technology across 32 dedicated production lines.',
        'step4_title' => 'Packaging & QC',
        'step4_desc'  => 'Multi-layer quality inspection at every stage. Metal detection, microbiological testing, and sensory evaluation before final packaging in food-grade, export-compliant materials.',
        'step5_title' => 'Global Shipping',
        'step5_desc'  => 'Efficient logistics network reaching 50+ countries via sea freight, air cargo, and China-Europe Railway Express. Full customs documentation and certificate of origin provided.',

        /* --- 全球网络 --- */
        'global_title'     => 'Global Sales Network',
        'global_desc'      => 'Exporting premium Chinese tea to 50+ countries worldwide',
        'global_continents' => '5',
        'global_continents_label' => 'Continents',
        'global_importers' => '200+',
        'global_importers_label' => 'Importers',
        'global_containers'=> '5,000+',
        'global_containers_label' => 'Containers/Year',
        'market_tags'      => '🇪🇺 Europe|🇺🇸 North America|🇸🇦 Middle East|🇯🇵 East Asia|🇦🇺 Oceania|🇦🇫 Africa|🇷🇺 Russia & CIS|🇧🇷 South America',

        /* --- 关于我们图片/视频 --- */
        'about_image'       => 'https://video.aultras-tea.com/wulongcha.png',
        'about_video_url'   => '',
        'factory_image_1'   => 'https://video.aultras-tea.com/wulongcha.png',
        'factory_image_2'   => 'https://video.aultras-tea.com/wulongcha.png',
        'factory_image_3'   => 'https://video.aultras-tea.com/wulongcha.png',

        /* --- 质量控制 --- */
        'qc_title'          => 'Quality Control & Certifications',
        'qc_desc'           => 'Rigorous quality standards backed by international certifications',
        'qc_lab_title'      => 'Lab Testing',
        'qc_lab_desc'       => 'Pesticide residue, heavy metals, and microbiological analysis for every batch',
        'qc_audit_title'    => 'Process Audit',
        'qc_audit_desc'     => 'ISO 22000 & HACCP compliant production with regular third-party audits',
        'qc_sensory_title'  => 'Sensory Panel',
        'qc_sensory_desc'   => 'Expert tea tasters evaluate aroma, flavor, liquor color, and leaf appearance',
        'qc_trace_title'    => 'Traceability',
        'qc_trace_desc'     => 'Complete batch traceability from plantation to shipment via QR code system',
        'qc_global_title'   => 'Global Standards',
        'qc_global_desc'    => 'Compliance with EU MRL, FDA, and destination country regulations',
    ];
}

/**
 * 默认证书数据
 */
function get_default_certs(): array
{
    return [
        [
            'name'        => 'EU Organic Certification',
            'description' => 'Certified compliant with EU Regulation (EC) No 834/2007 and 889/2008. Our organic tea plantations undergo annual inspections by EU-accredited certification bodies to ensure zero pesticide residues and sustainable farming practices.',
            'image_url'   => '',
        ],
        [
            'name'        => 'USDA Organic Certification',
            'description' => 'Certified under the USDA National Organic Program (NOP) standards. Our products meet the strict requirements for the United States organic market, verified by USDA-accredited certifying agents.',
            'image_url'   => '',
        ],
        [
            'name'        => 'Rainforest Alliance',
            'description' => 'Rainforest Alliance Certified for sustainable agriculture. This certification verifies that our tea is grown and harvested to meet rigorous environmental, social, and economic standards that conserve biodiversity.',
            'image_url'   => '',
        ],
        [
            'name'        => 'ISO 22000 Food Safety',
            'description' => 'ISO 22000:2018 certified food safety management system. Covers the entire supply chain from primary production to final consumer, ensuring systematic hazard control at every stage.',
            'image_url'   => '',
        ],
        [
            'name'        => 'HACCP Certification',
            'description' => 'Hazard Analysis and Critical Control Points (HACCP) certified. A systematic preventive approach to food safety that addresses physical, chemical, and biological hazards throughout production.',
            'image_url'   => '',
        ],
        [
            'name'        => 'World Tea Expo Gold Award',
            'description' => 'The highest honor awarded at the 2026 World Tea Expo, recognizing our premium Maojian green tea for exceptional quality, flavor, and packaging. Selected from over 1,500 entries worldwide.',
            'image_url'   => '',
        ],
    ];
}

/**
 * 默认产品数据（从 product-data.js 提取）
 */
function get_default_products(): array
{
    $img = 'https://video.aultras-tea.com/wulongcha.png';
    return [
        // Green Tea
        ['name'=>'Hunan Maojian Green Tea','category'=>'Green Tea','description'=>'Premium hand-picked Maojian from Hunan highlands. Fine, tippy leaves with a fresh, sweet aftertaste.','image_url'=>$img,'origin'=>'Hunan, China','specifications'=>'100kg min order','packaging'=>'25kg/bag, 1kg/foil bag','featured'=>1],
        ['name'=>'Biluochun Green Tea','category'=>'Green Tea','description'=>'Famous spiral-leaf green tea from Jiangsu. Delicate floral aroma and tender buds.','image_url'=>$img,'origin'=>'Jiangsu, China','specifications'=>'100kg min order','packaging'=>'20kg/bag, 500g/box','featured'=>1],
        ['name'=>'West Lake Longjing','category'=>'Green Tea','description'=>'Premium Dragon Well tea from Zhejiang. Flat, smooth leaves with chestnut aroma.','image_url'=>$img,'origin'=>'Zhejiang, China','specifications'=>'100kg min order','packaging'=>'25kg/bag, 250g/tin','featured'=>1],
        ['name'=>'Hunan Yunwu Green Tea','category'=>'Green Tea','description'=>'Cloud-and-mist tea from Hunan mountains. Rich, full-bodied green tea with lasting fragrance.','image_url'=>$img,'origin'=>'Hunan, China','specifications'=>'100kg min order','packaging'=>'25kg/bag, 1kg/bag','featured'=>0],
        ['name'=>'Sichuan Zhuyeqing','category'=>'Green Tea','description'=>'Bamboo-leaf-shaped green tea from Sichuan. Bright liquor, fresh and mellow taste.','image_url'=>$img,'origin'=>'Sichuan, China','specifications'=>'100kg min order','packaging'=>'20kg/bag, 100g/box','featured'=>0],
        ['name'=>'Jasmine Pearl Tea','category'=>'Green Tea','description'=>'Hand-rolled jasmine pearls from Fujian. Sweet floral scent with smooth green tea base.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'100kg min order','packaging'=>'25kg/bag, 500g/jar','featured'=>1],

        // Black Tea
        ['name'=>'Yunnan Dianhong Black Tea','category'=>'Black Tea','description'=>'Premium Yunnan black tea with golden tips. Rich, malty flavor with honey sweetness.','image_url'=>$img,'origin'=>'Yunnan, China','specifications'=>'100kg min order','packaging'=>'30kg/bag, 1kg/bag','featured'=>1],
        ['name'=>'Keemun Black Tea','category'=>'Black Tea','description'=>'World-renowned Qimen black tea from Anhui. Wine-like flavor with orchid aroma.','image_url'=>$img,'origin'=>'Anhui, China','specifications'=>'100kg min order','packaging'=>'25kg/bag, 500g/box','featured'=>0],
        ['name'=>'Lapsang Souchong','category'=>'Black Tea','description'=>'Authentic Zhengshan Xiaozhong from Fujian. Smoky, pine-wood aroma with sweet finish.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'100kg min order','packaging'=>'20kg/bag, 250g/box','featured'=>0],
        ['name'=>'Yingdehong Black Tea','category'=>'Black Tea','description'=>'Guangdong Yingde black tea. Full-bodied, sweet cocoa notes with bright red liquor.','image_url'=>$img,'origin'=>'Guangdong, China','specifications'=>'100kg min order','packaging'=>'25kg/bag, 1kg/bag','featured'=>0],
        ['name'=>'Zhenghe Black Tea','category'=>'Black Tea','description'=>'Fujian Zhenghe black tea. Smooth, mellow taste with subtle fruity notes.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'100kg min order','packaging'=>'25kg/bag, 500g/box','featured'=>0],

        // Oolong Tea
        ['name'=>'Anxi Tieguanyin','category'=>'Oolong Tea','description'=>'Premium Iron Goddess of Mercy from Anxi, Fujian. Orchid fragrance with sweet aftertaste.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'100kg min order','packaging'=>'20kg/bag, 250g/box','featured'=>1],
        ['name'=>'Da Hong Pao','category'=>'Oolong Tea','description'=>'Wuyi rock tea Big Red Robe. Mineral, roasted aroma with deep, complex flavor.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'100kg min order','packaging'=>'20kg/bag, 100g/box','featured'=>1],
        ['name'=>'Dongding Oolong','category'=>'Oolong Tea','description'=>'Taiwan Dongding Oolong. Lightly roasted with creamy, floral notes.','image_url'=>$img,'origin'=>'Taiwan, China','specifications'=>'100kg min order','packaging'=>'15kg/bag, 150g/box','featured'=>0],
        ['name'=>'Phoenix Dancong','category'=>'Oolong Tea','description'=>'Guangdong Fenghuang Dancong. Single-bush oolong with distinctive honey-orchid aroma.','image_url'=>$img,'origin'=>'Guangdong, China','specifications'=>'100kg min order','packaging'=>'15kg/bag, 100g/box','featured'=>0],

        // White Tea
        ['name'=>'Bai Hao Yinzhen (Silver Needle)','category'=>'White Tea','description'=>'Premium Fuding silver needle white tea. Pure buds with delicate, sweet flavor.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'50kg min order','packaging'=>'20kg/bag, 500g/box','featured'=>1],
        ['name'=>'Bai Mudan (White Peony)','category'=>'White Tea','description'=>'White peony tea from Fujian. One bud, two leaves, with fruity, mellow taste.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'50kg min order','packaging'=>'20kg/bag, 500g/box','featured'=>0],
        ['name'=>'Shoumei White Tea','category'=>'White Tea','description'=>'Aged Shoumei white tea. Smooth, sweet, with honey and date notes.','image_url'=>$img,'origin'=>'Fujian, China','specifications'=>'50kg min order','packaging'=>'25kg/bag, 1kg/bag','featured'=>0],

        // Pu-erh Tea
        ['name'=>'Pu-erh Sheng Cha (Raw)','category'=>'Pu-erh Tea','description'=>'Yunnan raw pu-erh. Fresh, astringent with aging potential. Sun-dried large-leaf variety.','image_url'=>$img,'origin'=>'Yunnan, China','specifications'=>'100kg min order','packaging'=>'357g/cake, 5kg/bag','featured'=>0],
        ['name'=>'Pu-erh Shou Cha (Ripe)','category'=>'Pu-erh Tea','description'=>'Yunnan ripe pu-erh. Earthy, smooth, with rich mouthfeel. Aged for depth.','image_url'=>$img,'origin'=>'Yunnan, China','specifications'=>'100kg min order','packaging'=>'357g/cake, 5kg/bag','featured'=>1],
    ];
}


/* ============================================================
 * 5. 公共函数
 * ============================================================ */

/**
 * 安全输出（防 XSS）
 */
function e(?string $s): string
{
    return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * 获取配置值
 */
function get_config(string $key, string $default = ''): string
{
    static $cache = null;
    if ($cache === null) {
        $cache = [];
        $rows = db()->query('SELECT key, value FROM site_config')->fetchAll();
        foreach ($rows as $r) {
            $cache[$r['key']] = $r['value'];
        }
    }
    return $cache[$key] ?? $default;
}

/**
 * 设置配置值（存在则更新，不存在则插入）
 */
function set_config(string $key, string $value): void
{
    $stmt = db()->prepare("
        INSERT INTO site_config (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    ");
    $stmt->execute([$key, $value]);
}

/**
 * 批量设置配置
 */
function set_config_batch(array $pairs): void
{
    $pdo = db();
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare("
            INSERT INTO site_config (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
        ");
        foreach ($pairs as $key => $value) {
            $stmt->execute([$key, (string)$value]);
        }
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
}

/**
 * 生成 CSRF Token
 */
function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * 验证 CSRF Token
 */
function csrf_verify(): void
{
    $token = $_POST['csrf_token'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        http_response_code(403);
        die('CSRF token 验证失败。请刷新页面后重试。');
    }
}

/**
 * 写入操作日志
 */
function log_action(string $action, string $detail = ''): void
{
    $stmt = db()->prepare("
        INSERT INTO admin_log (username, action, detail, ip) VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([
        $_SESSION['admin_user'] ?? 'guest',
        $action,
        $detail,
        $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    ]);
}

/**
 * 处理图片上传
 *
 * @param string $field  表单字段名
 * @return string|null   成功返回相对 URL，失败返回 null
 */
function handle_upload(string $field): ?string
{
    if (!isset($_FILES[$field]) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    $file = $_FILES[$field];

    // 错误检查
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('文件上传失败，错误码: ' . $file['error']);
    }

    // 大小检查
    if ($file['size'] > UPLOAD_MAX_SIZE) {
        throw new RuntimeException('文件大小超过 2MB 限制。');
    }

    // MIME 检查（使用 finfo，不信任浏览器提供的 type）
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime, UPLOAD_ALLOWED_MIME, true)) {
        throw new RuntimeException('不允许的文件类型: ' . $mime . '。仅允许 JPG/PNG/GIF/WEBP。');
    }

    // 扩展名检查
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, UPLOAD_ALLOWED_EXT, true)) {
        throw new RuntimeException('不允许的文件扩展名: .' . $ext);
    }

    // 额外安全检查：拒绝 PHP 伪图片
    $check = file_get_contents($file['tmp_name'], false, null, 0, 1024);
    if (preg_match('/<\?php|<\?=|eval\s*\(|base64_decode\s*\(/i', $check)) {
        throw new RuntimeException('文件包含可疑代码，已被拒绝。');
    }

    // 确保上传目录存在
    if (!is_dir(ADMIN_UPLOAD_DIR)) {
        @mkdir(ADMIN_UPLOAD_DIR, 0755, true);
    }

    // 生成安全随机文件名
    $safeName = date('Ymd_His') . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
    $dest = ADMIN_UPLOAD_DIR . '/' . $safeName;

    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        throw new RuntimeException('文件保存失败，请检查目录权限。');
    }

    // 返回相对 URL（前端通过 admin/uploads/xxx 访问）
    return 'admin/uploads/' . $safeName;
}

/**
 * 获取客户端 IP（用于 rate limit）
 */
function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/**
 * 登录频率限制检查
 *
 * @return bool true 表示可以继续登录，false 表示已被限制
 */
function check_login_rate(): bool
{
    $ip = client_ip();
    $key = 'login_attempts_' . md5($ip);

    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = ['count' => 0, 'first' => time()];
    }

    $data = &$_SESSION[$key];

    // 窗口过期则重置
    if ((time() - $data['first']) > LOGIN_RATE_WINDOW) {
        $data = ['count' => 0, 'first' => time()];
    }

    if ($data['count'] >= LOGIN_RATE_MAX) {
        return false;
    }

    return true;
}

/**
 * 记录一次登录尝试
 */
function record_login_attempt(): void
{
    $ip = client_ip();
    $key = 'login_attempts_' . md5($ip);

    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = ['count' => 0, 'first' => time()];
    }

    $_SESSION[$key]['count']++;
}

/**
 * 清除登录尝试记录（登录成功后调用）
 */
function clear_login_attempts(): void
{
    $ip = client_ip();
    $key = 'login_attempts_' . md5($ip);
    unset($_SESSION[$key]);
}

/**
 * 重定向
 */
function redirect(string $url): void
{
    header('Location: ' . $url);
    exit;
}

/**
 * 获取所有产品分类
 */
function get_categories(): array
{
    return ['Green Tea', 'Black Tea', 'Oolong Tea', 'White Tea', 'Pu-erh Tea', 'Matcha', 'OEM/ODM'];
}
