/* ============================================================
   Xiangfeng Tea Group — 5‑Language i18n Engine (EN/ZH/RU/DE/AR)
   ============================================================ */

const XF_i18n = (() => {
  /* ---------- Translation Dictionary ---------- */
  const dict = {
    en: {
      common: {
        home: 'Home',
        language: 'Language',
        about: 'About Us',
        products: 'Products Center',
        news: 'News',
        contact: 'Contact Us',
        inquiry: 'Inquiry',
        certsHonors: 'Certifications',
        events: 'Exhibition Events',
        oem: 'OEM/ODM',
        matcha: 'Matcha',
        loading: 'Loading…',
        back: 'Back',
        readMore: 'Read More',
        learnMore: 'Learn More',
        viewAll: 'View All',
        close: 'Close',
        send: 'Send',
        submit: 'Submit',
        cancel: 'Cancel',
        search: 'Search',
        filter: 'Filter',
        all: 'All',
        years: 'Years',
        countries: 'Countries',
        clients: 'Clients',
        varieties: 'Varieties'
      },

      hero: {
        badge: 'Est. 1996 · B2B Tea Export Expert',
        title: 'Premium Chinese Tea',
        subtitle: 'Direct from Origin · Certified Quality · Global Shipping',
        ctaProducts: 'Explore Products',
        ctaInquiry: 'Request Quote'
      },

      home: {
        statsTitle: 'Trusted by Buyers Worldwide',
        featureTitle: 'Why Choose Xiangfeng?',
        feature1Title: 'Direct-from-Origin',
        feature1Desc: 'We own plantations and partner with 2,000+ family farms across 6 provinces.',
        feature2Title: 'Certified Quality',
        feature2Desc: 'EU & USDA Organic, ISO 22000, HACCP — full traceability.',
        feature3Title: 'Flexible Supply',
        feature3Desc: 'Bulk wholesale, private label OEM, sample packs — MOQ as low as 50kg.',
        feature4Title: 'Global Logistics',
        feature4Desc: 'Shipping to 50+ countries via sea, air, and rail (China-Europe Express).',
        featuredTitle: 'Featured Products',
        featuredSubtitle: 'Our most popular export teas, ready for your market.',
        newsTitle: 'Latest News',
        newsSubtitle: 'Company updates, tea industry insights, and trade show announcements.',
        ctaTitle: 'Ready to Source Premium Chinese Tea?',
        ctaSubtitle: 'Get a personalized quote within 24 hours. No minimum for samples.',
        ctaBtn: 'Start Inquiry'
      },

      products: {
        title: 'Our Products',
        subtitle: 'Explore our full range of premium Chinese teas — from classic varietals to custom OEM blends.',
        searchPlaceholder: 'Search products...',
        searchCategory: 'Tea Variety',
        searchRegion: 'Region/Origin',
        searchOrderType: 'Order Type',
        searchBtn: 'Search',
        regionHunan: 'Hunan',
        regionYunnan: 'Yunnan',
        regionFujian: 'Fujian',
        regionZhejiang: 'Zhejiang',
        regionAnhui: 'Anhui',
        regionJiangsu: 'Jiangsu',
        regionSichuan: 'Sichuan',
        regionGuangdong: 'Guangdong',
        regionTaiwan: 'Taiwan',
        orderBulk: 'Bulk Wholesale',
        orderSample: 'Sample Pack',
        orderOEM: 'Custom OEM',
        orderSpecial: 'Special Offer',
        catGreen: 'Green Tea',
        catBlack: 'Black Tea',
        catOolong: 'Oolong Tea',
        catWhite: 'White Tea',
        catPuer: 'Pu-erh Tea',
        catOEM: 'OEM/ODM',
        catMatcha: 'Matcha',
        greenMaojian: 'Green Tea · Maojian Premium',
        greenBiluochun: 'Green Tea · Biluochun',
        greenLongjing: 'Green Tea · Longjing (Dragon Well)',
        greenYunwu: 'Green Tea · Yunwu (Cloud & Mist)',
        greenZhuyeqing: 'Green Tea · Zhuyeqing (Bamboo Leaf Green)',
        greenJasmine: 'Green Tea · Jasmine Pearl',
        blackDianhong: 'Black Tea · Dianhong (Yunnan Red)',
        blackKeemun: 'Black Tea · Keemun (Qimen)',
        blackLapsang: 'Black Tea · Lapsang Souchong',
        blackYingdehong: 'Black Tea · Yingdehong (Guangdong Red)',
        blackZhenghe: 'Black Tea · Zhenghe Gongfu',
        oolongTieguanyin: 'Oolong Tea · Tieguanyin (Iron Goddess)',
        oolongDahongpao: 'Oolong Tea · Da Hong Pao (Big Red Robe)',
        oolongDongding: 'Oolong Tea · Dongding (Frozen Summit)',
        oolongDancong: 'Oolong Tea · Fenghuang Dancong (Phoenix)',
        whiteYinzhen: 'White Tea · Baihao Yinzhen (Silver Needle)',
        whiteBaimudan: 'White Tea · Baimudan (White Peony)',
        whiteShoumei: 'White Tea · Shoumei (Longevity Brow)',
        puerShengcha: 'Pu-erh Tea · Shengcha 7542 (Raw)',
        puerShoucha: 'Pu-erh Tea · Shoucha 7572 (Ripe)',
        puerAged: 'Pu-erh Tea · Aged Golden Bud',
        puerTuocha: 'Pu-erh Tea · Mini Tuocha (Individually Wrapped)',
        oemBlend: 'OEM/ODM · Custom Tea Blend',
        oemPrivateLabel: 'OEM/ODM · Private Label Service',
        matchaCeremonial: 'Matcha · Premium Ceremonial Grade',
        matchaCulinary: 'Matcha · Culinary Grade',
        viewDetails: 'View Details',
        noResults: 'No products match your search criteria',
        moqLabel: 'MOQ',
        originLabel: 'Origin',
        packagingLabel: 'Packaging'
      },

      news: {
        title1: 'Xiangfeng Tea Group Exhibits at SIAL Paris 2026',
        excerpt1: 'Showcasing premium Chinese teas and new OEM capabilities at Europe\'s largest food innovation exhibition.',
        title2: 'Global Matcha Demand Surges 35% in 2026',
        excerpt2: 'Xiangfeng expands Zhejiang matcha production capacity to meet growing international demand.',
        title3: 'New EU Organic Certification Awarded to Hunan Plantation',
        excerpt3: 'Our 53,000-mu Hunan plantation base has successfully passed the EU Organic re-certification for 2026-2027.'
      },

      detail: {
        title: 'Product Details',
        origin: 'Origin',
        description: 'Description',
        specifications: 'Specifications',
        packaging: 'Packaging Options',
        minOrder: 'Minimum Order',
        inquireProduct: 'Inquire About This Product',
        relatedProducts: 'Related Products',
        certifications: 'Certifications',
        backToProducts: 'Back to Products',
        desc: {
          greenMaojian: 'Premium Hunan Maojian green tea, hand-picked in early spring. Features a fresh, floral aroma with a sweet aftertaste. Grown at 800m altitude, certified EU & USDA Organic. Ideal for health-conscious markets in Europe and North America.',
          greenBiluochun: 'Classic Jiangsu green tea with curly spiraled leaves and white tips. Delicate orchid fragrance, smooth taste with no astringency. One of China\'s top ten teas. Perfect for premium retail and gift markets.',
          greenLongjing: 'West Lake region Longjing (Dragon Well), pan-fired to produce its signature flat shape. Nutty, chestnut-like flavor with a fresh finish. Highly sought after in Asian and Western premium markets.',
          greenYunwu: 'Hunan Yunwu ("Cloud & Mist") green tea, grown in high mountain fog areas. Refreshing, slightly vegetal flavor with a clean finish. Excellent value for volume buyers and private label.',
          greenZhuyeqing: 'Sichuan Zhuyeqing ("Bamboo Leaf Green"), shaped like bamboo leaves with a jade-green color. Crisp, umami flavor. Popular in East Asian markets and specialty tea shops.',
          greenJasminePearl: 'Hand-rolled green tea pearls scented with fresh jasmine blossoms. Elegant unfurling when brewed. A favorite for afternoon tea and premium foodservice.',
          blackDianhong: 'Yunnan Dianhong with prominent golden tips. Malt, honey, and cocoa notes with a smooth, robust body. Excellent for breakfast blends and milk tea applications.',
          blackKeemun: 'Anhui Keemun, known for its fruity, floral aroma with a hint of smokiness. Considered one of the world\'s finest black teas. Perfect for premium loose-leaf and blend bases.',
          blackLapsang: 'Fujian Lapsang Souchong, the world\'s first black tea with a distinctive pine-smoked aroma. Bold, smoky flavor. A niche favorite in Europe and North America.',
          blackYingdehong: 'Guangdong Yingde black tea with a sweet, honey-like fragrance and bright red liquor. Smooth, malt-forward profile. Growing in popularity across Southeast Asia.',
          blackZhenghe: 'Fujian Zhenghe Gongfu black tea, tightly rolled with a dark lustrous appearance. Sweet, mellow taste with notes of dried fruit. Ideal for traditional Gongfu brewing.',
          oolongTieguanyin: 'Fujian Tieguanyin ("Iron Goddess of Mercy"), a floral, orchid-scented oolong with a creamy finish. The world\'s most popular oolong. Essential for any oolong lineup.',
          oolongDahongpao: 'Wuyi Mountain Da Hong Pao ("Big Red Robe"), a heavily roasted rock oolong with mineral ("yan yun") character. Complex, long-lasting flavor. Premium positioning for collectors and connoisseurs.',
          oolongDongding: 'Taiwan Dongding ("Frozen Summit") oolong, medium-roasted with nutty and caramel notes. Traditional charcoal-fired process. Highly regarded in East Asian markets.',
          oolongFenghuang: 'Guangdong Fenghuang Dancong ("Phoenix") with natural orchid fragrance. Single-tree heritage, floral and honey notes. A rising star in the global oolong market.',
          whiteBaihao: 'Fujian Baihao Yinzhen ("Silver Needle"), made only from tender white tips. Delicate, sweet, with honey and melon notes. The pinnacle of white tea. High margin for luxury retail.',
          whiteBaimudan: 'Fujian Baimudan ("White Peony"), combining tips and young leaves. Fuller flavor than Silver Needle, with floral and fresh hay notes. Excellent everyday white tea for retail.',
          whiteShoumei: 'Fujian Shoumei ("Longevity Brow"), made from mature leaves. Earthy, slightly sweet with a woody character. Great value white tea for blending and bulk supply.',
          puerShengcha: 'Yunnan raw Pu-erh, recipe 7542. Vibrant, slightly astringent when young, ages gracefully for decades. Classic Menghai recipe. Strong demand in Asia and among aging enthusiasts.',
          puerShoucha: 'Yunnan ripe Pu-erh, recipe 7572. Earthy, smooth, with notes of dates and camphor. Ready to drink immediately. The benchmark ripe Pu-erh for bulk and retail.',
          puerGoldenBud: 'Aged golden bud Pu-erh, made from high-grade buds with golden hairs. Sweet, mellow, with a syrupy mouthfeel. Premium aged offering for collectors.',
          puerMiniTuocha: 'Individually wrapped mini Pu-erh tuochas (5g each). Convenient single-serving format, perfect for hospitality, office, and on-the-go consumers. Fast-growing category globally.',
          oemCustomBlend: 'Fully customized tea blending service. We work with your flavor profile, target market, and price point to create exclusive blends. R&D support and small-batch trials available.',
          oemPrivateLabel: 'Complete private label solution — from tea selection to packaging design and branding. Low MOQ, fast turnaround. Your brand, our premium tea.',
          matchaPremium: 'Ceremonial grade matcha from Zhejiang, stone-ground from shade-grown tencha leaves. Vibrant green, umami-rich, smooth with no bitterness. For premium tea ceremonies and cafes.',
          matchaCulinary: 'Culinary grade matcha, versatile for lattes, smoothies, baking, and ice cream. Bright green color, balanced flavor. Cost-effective for F&B and manufacturing.'
        }
      },

      about: {
        title: 'About Xiangfeng Tea Group',
        subtitle: 'Three decades of excellence in Chinese tea export.',
        historyTitle: 'Our Story',
        historyText1: 'Founded in 1996 in Hunan Province, Xiangfeng Tea Group began as a small family plantation.',
        historyText2: 'Today, we operate across 6 provinces with 3 processing facilities and export to 50+ countries.',
        historyText3: 'Our mission: deliver the finest Chinese teas with uncompromising quality and transparent sourcing.',
        valuesTitle: 'Our Values',
        value1Title: 'Quality First',
        value1Desc: 'Every batch tested. Every certificate verified.',
        value2Title: 'Sustainable Sourcing',
        value2Desc: 'Supporting 2,000+ family farms with fair pricing.',
        value3Title: 'Innovation',
        value3Desc: 'Modern processing meets traditional craftsmanship.',
        teamTitle: 'Leadership Team',
        productionTitle: 'Production & Processing',
        productionDesc: 'From plantation to packaging, every step is carefully controlled',
        step1Harvest: 'Harvesting',
        step2Sort: 'Sorting & Grading',
        step3Process: 'Processing & Fermentation',
        step4Pack: 'Packaging & QC',
        step5Ship: 'Global Shipping',
        globalTitle: 'Global Sales Network',
        globalDesc: 'Exporting premium Chinese tea to 50+ countries worldwide',
        qcTitle: 'Quality Control & Certifications',
        qcDesc: 'Rigorous quality standards backed by international certifications'
      },

      news: {
        title: 'News & Events',
        subtitle: 'Stay updated with Xiangfeng Tea Group.',
        readMore: 'Read More',
        all: 'All',
        company: 'Company',
        industry: 'Industry',
        events: 'Events',
        noResults: 'No articles found.'
      },

      contact: {
        title: 'Contact Us',
        subtitle: 'Reach out for inquiries, samples, or partnership opportunities.',
        formTitle: 'Send Inquiry',
        name: 'Your Name',
        company: 'Company Name',
        email: 'Email Address',
        phone: 'Phone / WhatsApp',
        productInterest: 'Product Interest',
        message: 'Message',
        submitBtn: 'Submit Inquiry',
        infoTitle: 'Contact Information',
        address: 'Address',
        phoneLabel: 'Phone',
        emailLabel: 'Email',
        whatsapp: 'WhatsApp',
        wechat: 'WeChat',
        hours: 'Business Hours',
        faqTitle: 'FAQ',
        faq1Q: 'What is your minimum order quantity?',
        faq1A: 'MOQ varies by product — typically 100kg for bulk, 50kg for OEM.',
        faq2Q: 'Do you provide samples?',
        faq2A: 'Yes! Sample packs available for all products. Shipping cost covered by buyer.',
        faq3Q: 'What certifications do you have?',
        faq3A: 'EU Organic, USDA Organic, ISO 22000, HACCP, Rainforest Alliance.'
      },

      certs: {
        title: 'Certifications & Honors',
        subtitle: 'Our commitment to quality is validated by international authorities',
        euOrganic: 'EU Organic Certification',
        usdaOrganic: 'USDA Organic Certification',
        rainforest: 'Rainforest Alliance',
        iso22000: 'ISO 22000 Food Safety',
        haccp: 'HACCP Certification',
        goldAward: 'World Tea Expo Gold Award',
        exportAward: 'China Export Excellence Award'
      },

      footer: {
        aboutTitle: 'About Xiangfeng',
        aboutDesc: 'A leading Chinese tea export enterprise, delivering premium teas worldwide since 1996.',
        quickLinks: 'Quick Links',
        productsTitle: 'Products',
        contactTitle: 'Contact Us',
        subscribe: 'Subscribe to Our Newsletter',
        subscribeDesc: 'Get the latest product updates and tea industry insights.',
        emailPlaceholder: 'Your email address',
        subscribeBtn: 'Subscribe',
        rights: 'All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      },

      popup: {
        title: 'Product Inquiry',
        name: 'Your Name',
        company: 'Company / Brand',
        email: 'Email',
        phone: 'Phone / WhatsApp',
        quantity: 'Estimated Quantity',
        message: 'Message',
        messagePlaceholder: 'Tell us about your requirements...',
        submitBtn: 'Submit Inquiry',
        successTitle: 'Inquiry Submitted!',
        successDesc: 'Our export team will contact you within 24 hours.',
        submitting: 'Submitting...'
      }
    },

    ru: {
      common: {
        home: 'Главная',
        language: 'Язык',
        about: 'О нас',
        products: 'Центр продукции',
        news: 'Новости',
        contact: 'Контакты',
        inquiry: 'Запрос',
        certsHonors: 'Сертификаты',
        events: 'Выставки и события',
        oem: 'OEM/ODM',
        matcha: 'Матча',
        loading: 'Загрузка…',
        back: 'Назад',
        readMore: 'Читать далее',
        learnMore: 'Узнать больше',
        viewAll: 'Смотреть все',
        close: 'Закрыть',
        send: 'Отправить',
        submit: 'Отправить',
        cancel: 'Отмена',
        search: 'Поиск',
        filter: 'Фильтр',
        all: 'Все',
        years: 'лет',
        countries: 'стран',
        clients: 'клиентов',
        varieties: 'сортов'
      },

      hero: {
        badge: 'Осн. 1996 · Эксперт по B2B экспорту чая',
        title: 'Премиальный китайский чай',
        subtitle: 'Прямо с плантаций · Сертифицированное качество · Доставка по всему миру',
        ctaProducts: 'Смотреть продукцию',
        ctaInquiry: 'Запросить прайс'
      },

      home: {
        statsTitle: 'Нам доверяют покупатели по всему миру',
        featureTitle: 'Почему выбирают Xiangfeng?',
        feature1Title: 'Прямо с плантаций',
        feature1Desc: 'Мы владеем плантациями и сотрудничаем с 2000+ семейными фермами в 6 провинциях.',
        feature2Title: 'Сертифицированное качество',
        feature2Desc: 'EU & USDA Organic, ISO 22000, HACCP — полная прослеживаемость.',
        feature3Title: 'Гибкая поставка',
        feature3Desc: 'Оптовые партии, частная маркировка OEM, пробные наборы — MOQ от 50 кг.',
        feature4Title: 'Глобальная логистика',
        feature4Desc: 'Доставка в 50+ стран морем, авиа и по ж/д (China-Europe Express).',
        featuredTitle: 'Популярные продукты',
        featuredSubtitle: 'Наши самые популярные экспортные чаи, готовые для вашего рынка.',
        newsTitle: 'Последние новости',
        newsSubtitle: 'Новости компании, аналитика чайной индустрии и анонсы выставок.',
        ctaTitle: 'Готовы закупать премиальный китайский чай?',
        ctaSubtitle: 'Получите персональное предложение в течение 24 часов. Без минимума для образцов.',
        ctaBtn: 'Начать запрос'
      },

      products: {
        title: 'Наша продукция',
        subtitle: 'Изучите наш полный ассортимент премиального китайского чая — от классических сортов до индивидуальных OEM-блендов.',
        searchPlaceholder: 'Поиск продукции...',
        searchCategory: 'Вид чая',
        searchRegion: 'Регион/Происхождение',
        searchOrderType: 'Тип заказа',
        searchBtn: 'Поиск',
        regionHunan: 'Хунань',
        regionYunnan: 'Юньнань',
        regionFujian: 'Фуцзянь',
        regionZhejiang: 'Чжэцзян',
        regionAnhui: 'Аньхой',
        regionJiangsu: 'Цзянсу',
        regionSichuan: 'Сычуань',
        regionGuangdong: 'Гуандун',
        regionTaiwan: 'Тайвань',
        orderBulk: 'Оптовая партия',
        orderSample: 'Пробный набор',
        orderOEM: 'Индивидуальный OEM',
        orderSpecial: 'Спецпредложение',
        catGreen: 'Зелёный чай',
        catBlack: 'Чёрный чай',
        catOolong: 'Улун',
        catWhite: 'Белый чай',
        catPuer: 'Пуэр',
        catOEM: 'OEM/ODM',
        catMatcha: 'Матча',
        greenMaojian: 'Зеленый чай · Маодзянь (Премиум)',
        greenBiluochun: 'Зеленый чай · Билочунь',
        greenLongjing: 'Зеленый чай · Лунцзин (Колодец Дракона)',
        greenYunwu: 'Зеленый чай · Юньу (Облака и туман)',
        greenZhuyeqing: 'Зеленый чай · Чжуецин (Зеленый лист бамбука)',
        greenJasmine: 'Зеленый чай · Жасминовые жемчужины',
        blackDianhong: 'Черный чай · Дяньхун (Юньнаньский красный)',
        blackKeemun: 'Черный чай · Кимун (Цимэнь)',
        blackLapsang: 'Черный чай · Лапсанг Сушонг',
        blackYingdehong: 'Черный чай · Индэхун (Гуандунский красный)',
        blackZhenghe: 'Черный чай · Чжэнхэ Гунфу',
        oolongTieguanyin: 'Улун · Тегуаньинь (Богиня Железа)',
        oolongDahongpao: 'Улун · Да Хун Пао (Большая Красная Мантия)',
        oolongDongding: 'Улун · Дундин (Замороженный пик)',
        oolongDancong: 'Улун · Фэнхуан Даньцун (Одиночное дерево Фэнхуан)',
        whiteYinzhen: 'Белый чай · Байхао Иньчжэнь (Серебряные иглы)',
        whiteBaimudan: 'Белый чай · Баймудань (Белый пион)',
        whiteShoumei: 'Белый чай · Шоумэй (Брови долголетия)',
        puerShengcha: 'Пуэр · Шэнча 7542 (Сырой)',
        puerShoucha: 'Пуэр · Шоуча 7572 (Зрелый)',
        puerAged: 'Пуэр · выдержанный Золотой Почек',
        puerTuocha: 'Пуэр · мини Туоча (индивидуальная упаковка)',
        oemBlend: 'OEM/ODM · Кастомная смесь чая',
        oemPrivateLabel: 'OEM/ODM · Сервис приватной марки',
        matchaCeremonial: 'Матча · Премиум церемониальный сорт',
        matchaCulinary: 'Матча · Кулинарный сорт',
        viewDetails: 'Подробнее',
        noResults: 'Нет продуктов, соответствующих вашим критериям поиска',
        moqLabel: 'MOQ',
        originLabel: 'Происхождение',
        packagingLabel: 'Упаковка'
      },

      news: {
        title1: 'Группа Сянфэн на выставке SIAL Paris 2026',
        excerpt1: 'Представляем премиальный китайский чай и новые OEM-возможности на крупнейшей европейской выставке пищевых инноваций.',
        title2: 'Мировой спрос на матча вырос на 35% в 2026 году',
        excerpt2: 'Сянфэн расширяет мощности производства матча в Чжэцзяне для удовлетворения растущего международного спроса.',
        title3: 'Хунаньская плантация получила новую сертификацию ЕС Organic',
        excerpt3: 'Наша 53 000 му Хунаньская плантация успешно прошел повторную сертификацию ЕС Organic на 2026-2027.'
      },

      detail: {
        title: 'Детали продукта',
        origin: 'Происхождение',
        description: 'Описание',
        specifications: 'Спецификации',
        packaging: 'Варианты упаковки',
        minOrder: 'Минимальный заказ',
        inquireProduct: 'Запросить этот продукт',
        relatedProducts: 'Похожие продукты',
        certifications: 'Сертификаты',
        backToProducts: 'Вернуться к продукции',
        desc: {
          greenMaojian: 'Премиальный зелёный чай Маоцзянь из Хунани, собранный вручную ранней весной. Свежий цветочный аромат со сладким послевкусием. Выращен на высоте 800 м, сертифицирован EU & USDA Organic.',
          greenBiluochun: 'Классический зелёный чай Билуочунь из Цзянсу с завитыми листьями и белыми кончиками. Нежный орхидейный аромат, мягкий вкус без терпкости. Один из десяти лучших чаев Китая.',
          greenLongjing: 'Лунцзин (Колодец Дракона) из региона Западное Озеро, обжарен в котле для получения плоской формы. Ореховый вкус с чистым послевкусием. Высоко ценится на премиальных рынках.',
          greenYunwu: 'Зелёный чай Юньу («Облака и туман») из Хунани, выращенный в высокогорных туманных зонах. Освежающий, слегка растительный вкус. Отличное соотношение цены и качества.',
          greenZhuyeqing: 'Чай Чжуечин («Зелень бамбуковых листьев») из Сычуани, в форме бамбуковых листьев нефритово-зеленого цвета. Четкий, умами вкус. Популярен на рынках Восточной Азии.',
          greenJasminePearl: 'Жасминовые жемчужины, скрученные вручную из зелёного чая и ароматизированные жасмином. Элегантно раскрываются при заваривании. Фаворит для afternoon tea.',
          blackDianhong: 'Дяньхун из Юньнани с золотыми типсами. Ноты солода, мёда и какао с насыщенным телом. Отлично подходит для завтраков и молочного чая.',
          blackKeemun: 'Кимун из Аньхоя с фруктово-цветочным ароматом и легким дымком. Считается одним из лучших чёрных чаев мира. Идеален для премиального листового чая.',
          blackLapsang: 'Сунчжэнь Чжэншань Сяо, первый в мире чёрный чай с характерным ароматом кострового дыма. Смелый, дымный вкус. Нишевый фаворит в Европе и Северной Америке.',
          blackYingdehong: 'Ин光德 Hong из Гуандуна с медовым ароматом и ярким красным настоем. Мягкий, солодовый профиль. Растёт популярность в Юго-Восточной Азии.',
          blackZhenghe: 'Чжэнхэ Гунфу из Фуцзяни, плотно скрученный с тёмным блестящим видом. Сладкий, мягкий вкус с нотами сухофруктов. Идеален для традиционного заваривания Гунфу.',
          oolongTieguanyin: 'Тегуаньинь («Железная богиня милосердия») из Фуцзяни, цветочный улун с орхидейным ароматом и сливочным послевкусием. Самый популярный улун в мире.',
          oolongDahongpao: 'Да Хун Пао («Большая красная мантия») с гор Уи, сильно прожаренный каменный улун с минеральным характером. Сложный, длительный вкус. Премиальное позиционирование.',
          oolongDongding: 'Дундин («Замёрзшая вершина») из Тайваня, среднепрожаренный с ореховыми и карамельными нотами. Традиционный угольный процесс. Высоко ценится в Восточной Азии.',
          oolongFenghuang: 'Фэнхуан Даньцун с натуральным орхидейным ароматом. Наследие одиночных деревьев, цветочные и медовые ноты. Восходящая звезда на глобальном рынке улуна.',
          whiteBaihao: 'Байхао Иньчжэнь («Серебряная игла») из Фуцзяни, изготовлен только из нежных белых типсов. Нежный, сладкий, с нотами мёда и дыни. Вершина белого чая.',
          whiteBaimudan: 'Баймудань («Белая пионка») из Фуцзяни, сочетает типсы и молодые листья. Более полный вкус, с цветочными нотами. Отличный повседневный белый чай.',
          whiteShoumei: 'Шоумэй («Бровь долголетия») из Фуцзяни, из зрелых листьев. Землистый, слегка сладкий с древесным характером. Отличное соотношение цены для смешивания.',
          puerShengcha: 'Сырой Пуэр из Юньнани, рецепт 7542. Яркий, слегка терпкий в молодости, благородно стареет десятилетиями. Классический рецепт Мэнхая.',
          puerShoucha: 'Спелый Пуэр из Юньнани, рецепт 7572. Землистый, мягкий, с нотами фиников и камфоры. Готов к употреблению сразу. Эталонный спелый Пуэр.',
          puerGoldenBud: 'Выдержанный золотой почковый Пуэр из высокосортных почек с золотистым ворсом. Сладкий, мягкий, с сиропной текстурой. Премиальное предложение для коллекционеров.',
          puerMiniTuocha: 'Индивидуально упакованные мини-Пуэр туоча (по 5г). Удобный формат одной порции, идеален для гостиниц и офисов. Быстрорастущая категория.',
          oemCustomBlend: 'Полностью индивидуальный сервис смешивания чая. Мы работаем с вашим профилем вкуса, целевым рынком и ценовой точкой. Доступна поддержка НИОКР.',
          oemPrivateLabel: 'Полное решение частной маркировки — от выбора чая до дизайна упаковки и брендинга. Низкий MOQ, быстрый оборот. Ваш бренд, наш премиальный чай.',
          matchaPremium: 'Матча церемониального класса из Чжэцзяна, каменного помола из тенча, выращенного в тени. Ярко-зеленый, богатый умами, без горечи. Для премиальных церемоний и кафе.',
          matchaCulinary: 'Матча кулинарного класса, универсальная для латте, смузи, выпечки и мороженого. Ярко-зеленый цвет, сбалансированный вкус. Экономично для предприятий общепита.'
        }
      },

      about: {
        title: 'О группе компаний Xiangfeng Tea',
        subtitle: 'Три десятилетия совершенства в экспорте китайского чая.',
        historyTitle: 'Наша история',
        historyText1: 'Основанная в 1996 году в провинции Хунань, Xiangfeng Tea Group начиналась как небольшая семейная плантация.',
        historyText2: 'Сегодня мы работаем в 6 провинциях с 3 перерабатывающими предприятиями и экспортируем в 50+ стран.',
        historyText3: 'Наша миссия: поставлять лучшие китайские чаи с безупречным качеством и прозрачным происхождением.',
        valuesTitle: 'Наши ценности',
        value1Title: 'Качество прежде всего',
        value1Desc: 'Каждая партия протестирована. Каждый сертификат проверен.',
        value2Title: 'Устойчивое снабжение',
        value2Desc: 'Поддержка 2000+ семейных ферм по справедливым ценам.',
        value3Title: 'Инновации',
        value3Desc: 'Современная переработка в сочетании с традиционным мастерством.',
        teamTitle: 'Команда руководства',
        productionTitle: 'Производство и переработка',
        productionDesc: 'От плантации до упаковки — каждый этап тщательно контролируется',
        step1Harvest: 'Сбор урожая',
        step2Sort: 'Сортировка и классификация',
        step3Process: 'Переработка и ферментация',
        step4Pack: 'Упаковка и QC',
        step5Ship: 'Глобальная доставка',
        globalTitle: 'Глобальная сеть продаж',
        globalDesc: 'Экспорт премиального китайского чая в 50+ стран мира',
        qcTitle: 'Контроль качества и сертификаты',
        qcDesc: 'Строгие стандарты качества, подтвержденные международными сертификатами'
      },

      news: {
        title: 'Новости и события',
        subtitle: 'Будьте в курсе новостей Xiangfeng Tea Group.',
        readMore: 'Читать далее',
        all: 'Все',
        company: 'Компания',
        industry: 'Отрасль',
        events: 'События',
        noResults: 'Статей не найдено.'
      },

      contact: {
        title: 'Связаться с нами',
        subtitle: 'Обращайтесь для запросов, образцов или партнерства.',
        formTitle: 'Отправить запрос',
        name: 'Ваше имя',
        company: 'Название компании',
        email: 'Email адрес',
        phone: 'Телефон / WhatsApp',
        productInterest: 'Интересующая продукция',
        message: 'Сообщение',
        submitBtn: 'Отправить запрос',
        infoTitle: 'Контактная информация',
        address: 'Адрес',
        phoneLabel: 'Телефон',
        emailLabel: 'Email',
        whatsapp: 'WhatsApp',
        wechat: 'WeChat',
        hours: 'Часы работы',
        faqTitle: 'Часто задаваемые вопросы',
        faq1Q: 'Каков минимальный объем заказа?',
        faq1A: 'MOQ зависит от продукта — обычно 100 кг для опта, 50 кг для OEM.',
        faq2Q: 'Вы предоставляете образцы?',
        faq2A: 'Да! Пробные наборы доступны для всех продуктов. Доставка оплачивается покупателем.',
        faq3Q: 'Какие сертификаты у вас есть?',
        faq3A: 'EU Organic, USDA Organic, ISO 22000, HACCP, Rainforest Alliance.'
      },

      certs: {
        title: 'Сертификаты и награды',
        subtitle: 'Наше стремление к качеству подтверждено международными органами',
        euOrganic: 'Сертификация EU Organic',
        usdaOrganic: 'Сертификация USDA Organic',
        rainforest: 'Rainforest Alliance',
        iso22000: 'ISO 22000 Безопасность пищевых продуктов',
        haccp: 'Сертификация HACCP',
        goldAward: 'Золотая награда World Tea Expo',
        exportAward: 'Награда China Export Excellence'
      },

      footer: {
        aboutTitle: 'О Xiangfeng',
        aboutDesc: 'Ведущее китайское предприятие по экспорту чая, поставляющее премиальные чаи по всему миру с 1996 года.',
        quickLinks: 'Быстрые ссылки',
        productsTitle: 'Продукция',
        contactTitle: 'Связаться с нами',
        subscribe: 'Подпишитесь на нашу рассылку',
        subscribeDesc: 'Получайте последние обновления продукции и аналитику чайной индустрии.',
        emailPlaceholder: 'Ваш email адрес',
        subscribeBtn: 'Подписаться',
        rights: 'Все права защищены.',
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования'
      },

      popup: {
        title: 'Запрос на продукцию',
        name: 'Ваше имя',
        company: 'Компания / Бренд',
        email: 'Email',
        phone: 'Телефон / WhatsApp',
        quantity: 'Примерный объем',
        message: 'Сообщение',
        messagePlaceholder: 'Расскажите о ваших требованиях...',
        submitBtn: 'Отправить запрос',
        successTitle: 'Запрос отправлен!',
        successDesc: 'Наша экспортная команда свяжется с вами в течение 24 часов.',
        submitting: 'Отправка...'
      }
    },

    ar: {
      common: {
        home: 'الرئيسية',
        language: 'اللغة',
        about: 'من نحن',
        products: 'مركز المنتجات',
        news: 'الأخبار',
        contact: 'اتصل بنا',
        inquiry: 'استفسار',
        certsHonors: 'الشهادات',
        events: 'المعارض والفعاليات',
        oem: 'OEM/ODM',
        matcha: 'ماتشا',
        loading: 'جاري التحميل…',
        back: 'عودة',
        readMore: 'اقرأ المزيد',
        learnMore: 'اعرف المزيد',
        viewAll: 'عرض الكل',
        close: 'إغلاق',
        send: 'إرسال',
        submit: 'إرسال',
        cancel: 'إلغاء',
        search: 'بحث',
        filter: 'تصفية',
        all: 'الكل',
        years: 'سنوات',
        countries: 'دول',
        clients: 'عملاء',
        varieties: 'أنواع'
      },

      hero: {
        badge: 'تأسست 1996 · خبير تصدير الشاي B2B',
        title: 'شاي صيني فاخر',
        subtitle: 'مباشرة من المنشأ · جودة معتمدة · شحن عالمي',
        ctaProducts: 'استكشف المنتجات',
        ctaInquiry: 'طلب عرض سعر'
      },

      home: {
        statsTitle: 'يتمتع بثقة المشترين في جميع أنحاء العالم',
        featureTitle: 'لماذا تختار Xiangfeng؟',
        feature1Title: 'مباشرة من المنشأ',
        feature1Desc: 'نحن نمتلك مزارع ونعمل مع 2000+ مزرعة عائلية في 6 مقاطعات.',
        feature2Title: 'جودة معتمدة',
        feature2Desc: 'EU & USDA Organic، ISO 22000، HACCP — تتبع كامل.',
        feature3Title: 'توريد مرن',
        feature3Desc: 'جملة بكميات كبيرة، علامة خاصة OEM، عينات — MOQ يبدأ من 50 كجم.',
        feature4Title: 'لوجستيات عالمية',
        feature4Desc: 'الشحن إلى 50+ دولة عبر البحر والجو والسكك الحديدية (China-Europe Express).',
        featuredTitle: 'المنتجات المميزة',
        featuredSubtitle: 'أكثر شايات التصدير شعبية لدينا، جاهزة لسوقك.',
        newsTitle: 'آخر الأخبار',
        newsSubtitle: 'تحديثات الشركة، رؤى صناعة الشاي، وإعلانات المعارض التجارية.',
        ctaTitle: 'هل أنت مستعد لاستيراد شاي صيني فاخر؟',
        ctaSubtitle: 'احصل على عرض سعر مخصص في غضون 24 ساعة. لا حد أدنى للعينات.',
        ctaBtn: 'بدء الاستفسار'
      },

      products: {
        title: 'منتجاتنا',
        subtitle: 'استكشف مجموعتنا الكاملة من الشاي الصيني الفاخر — من الأصناف الكلاسيكية إلى خلطات OEM المخصصة.',
        searchPlaceholder: 'البحث عن المنتجات...',
        searchCategory: 'نوع الشاي',
        searchRegion: 'المنطقة/المنشأ',
        searchOrderType: 'نوع الطلب',
        searchBtn: 'بحث',
        regionHunan: 'هونان',
        regionYunnan: 'يونان',
        regionFujian: 'فوجيان',
        regionZhejiang: 'تشيجيانغ',
        regionAnhui: 'أنهوي',
        regionJiangsu: 'جيانغسو',
        regionSichuan: 'سيشوان',
        regionGuangdong: 'غوانغدونغ',
        regionTaiwan: 'تايوان',
        orderBulk: 'جملة بكميات كبيرة',
        orderSample: 'حزمة عينات',
        orderOEM: 'OEM مخصص',
        orderSpecial: 'عرض خاص',
        catGreen: 'الشاي الأخضر',
        catBlack: 'الشاي الأسود',
        catOolong: 'شاي الأولونغ',
        catWhite: 'الشاي الأبيض',
        catPuer: 'شاي البو-أر',
        catOEM: 'OEM/ODM',
        catMatcha: 'ماتشا',
        greenMaojian: 'شاي أخضر · ماوجيان (فاخر)',
        greenBiluochun: 'شاي أخضر · بيلوتشون',
        greenLongjing: 'شاي أخضر · لونجينغ (بئر التنين)',
        greenYunwu: 'شاي أخضر · يونوو (سحب وضباب)',
        greenZhuyeqing: 'شاي أخضر · تشوييقينغ (ورقة بامبو)',
        greenJasmine: 'شاي أخضر · حبيبات الياسمين',
        blackDianhong: 'شاي أسود · ديان هونغ (يونان الأحمر)',
        blackKeemun: 'شاي أسود · كيمون (تشيمين)',
        blackLapsang: 'شاي أسود · لابسانغ سوشونغ',
        blackYingdehong: 'شاي أسود · يينغدي هونغ (غواندونغ الأحمر)',
        blackZhenghe: 'شاي أسود · تشينغهي غونغفو',
        oolongTieguanyin: 'شاي أولونغ · تيغوانيين (إلهة الحديد)',
        oolongDahongpao: 'شاي أولونغ · دا هونغ باو (الرداء الأحمر الكبير)',
        oolongDongding: 'شاي أولونغ · دونغدينغ (القمة المتجمدة)',
        oolongDancong: 'شاي أولونغ · فينغ هوانغ دانتسونغ (أشجار فينغ هوانغ)',
        whiteYinzhen: 'شاي أبيض · بايهاو يينتشن (إبر فضية)',
        whiteBaimudan: 'شاي أبيض · بايمودان (البيون الأبيض)',
        whiteShoumei: 'شاي أبيض · شوومي (حواجب طول العمر)',
        puerShengcha: 'شاي بوءر · شينغتشا 7542 (خام)',
        puerShoucha: 'شاي بوءر · شوتشا 7572 (معالج)',
        puerAged: 'شاي بوءر · براعم ذهبية معتقة',
        puerTuocha: 'شاي بوءر · توتشا صغيرة (مغلفة)',
        oemBlend: 'OEM/ODM · مزيج شاي مخصص',
        oemPrivateLabel: 'OEM/ODM · خدمة العلامة الخاصة',
        matchaCeremonial: 'ماتشا · فاخر درجة احتفالية',
        matchaCulinary: 'ماتشا · درجة الطبخ',
        viewDetails: 'عرض التفاصيل',
        noResults: 'لا توجد منتجات تطابق معايير البحث الخاصة بك',
        moqLabel: 'MOQ',
        originLabel: 'المنشأ',
        packagingLabel: 'التغليف'
      },

      news: {
        title1: 'مجموعة شيانفنغ تشارك في معرض SIAL باريس 2026',
        excerpt1: 'عرض الشاي الصيني الفاخر وقدرات OEM الجديدة في أكبر معرض ابتكارات الأغذية في أوروبا.',
        title2: 'الطلب العالمي على الماتشا يرتفع 35% في 2026',
        excerpt2: 'شيانفنغ توسع قدرات إنتاج الماتشا في تشجيانغ لتلبية الطلب الدولي المتزايد.',
        title3: 'مزرعة هونان تحصل على شهادة عضوية جديدة من الاتحاد الأوروبي',
        excerpt3: 'قاعدة مزرعة هونان لدينا التي تبلغ 53,000 مو نجحت في اجتياز إعادة شهادة الاتحاد الأوروبي العضوية ل2026-2027.'
      },

      detail: {
        title: 'تفاصيل المنتج',
        origin: 'المنشأ',
        description: 'الوصف',
        specifications: 'المواصفات',
        packaging: 'خيارات التغليف',
        minOrder: 'الحد الأدنى للطلب',
        inquireProduct: 'الاستفسار عن هذا المنتج',
        relatedProducts: 'منتجات ذات صلة',
        certifications: 'الشهادات',
        backToProducts: 'العودة إلى المنتجات',
        desc: {
          greenMaojian: 'شاي أخضر فاخر ماوجيان من هونان، مقطف يدوياً في أوائل الربيع. يتميز برائحة زهرية منعشة بلمسة حلاوة. يُزرع على ارتفاع 800 متر، معتمد EU & USDA Organic.',
          greenBiluochun: 'شاي أخضر كلاسيكي بيلوتشون من جيانغسو بأوراق ملتفة وأطراف بيضاء. عطر أوركيدي رقيق، طعم ناعم بدون قساوة. واحد من أفضل عشرة شايات في الصين.',
          greenLongjing: 'لونغجينغ (بئر التنين) من منطقة بحيرة الغرب، محمص في المقلاة لتشكيل مسطح مميز. نكهة جوزية مع لمسة منعشة. مطلوب بشدة في الأسواق الآسيوية والغربية الفاخرة.',
          greenYunwu: 'شاي أخضر يونوو ("السحاب والضباب") من هونان، يُزرع في مناطق جبلية عالية ضبابية. طعم منعش، نباتي قليلاً بلمسة نظيفة. قيمة ممتازة للمشترين بالجملة.',
          greenZhuyeqing: 'تشو يي تشينغ ("أوراق الخيزران الخضراء") من سيشوان، على شكل أوراق الخيزران بلون أخضر يشبه اليشم. نكهة حيوية، أومامي. شائع في أسواق شرق آسيا.',
          greenJasminePearl: 'لآلئ الياسمين الملفوفة يدوياً من شاي أخضر معطرة بأزهار الياسمين الطازجة. تتفتح بأناقة عند التحضير. مفضل لشاي ما بعد الظهيرة.',
          blackDianhong: 'ديانهونغ يونان بأطراف ذهبية بارزة. نكهات الشعير والعسل والكاكاو مع جسم قوي ناعم. ممتاز لخلطات الإفطار وشاي الحليب.',
          blackKeemun: 'كيمون آنهوي، معروف برائحة فواكه وزهور مع لمسة دخانية خفيفة. يُعتبر من أفضل الشايات السوداء في العالم. مثالي للشاي الفاخر ذو الأوراق الحرة.',
          blackLapsang: 'سونغتشون شاوتشونغ، أول شاي أسود في العالم برائحة مدخنة مميزة من الصنوبر. نكهة جريئة ومدخنة. مفضل متخصص في أوروبا وأمريكا الشمالية.',
          blackYingdehong: 'شاي أسود يينغده من غوانغدونغ برائحة عسلية مشرقة. ملف شعير ناعم. تنامي الشعبية في جنوب شرق آسيا.',
          blackZhenghe: 'تشنغخه غونغفو من فوجيان، ملفوف بإحكام بمظهر داكن لامع. طعم حلو وناعم مع نكهات الفواكه المجففة. مثالي للتحضير التقليدي.',
          oolongTieguanyin: 'تيغوانين ("إلهة الحديد للميرسي") من فوجيان، أولونغ زهري برائحة الأوركيد ولمسة نهائية كريمية. أكثر أنواع الأولونغ شعبية في العالم.',
          oolongDahongpao: 'دا هونغ باو ("الرداء الأحمر الكبير") من جبال ووي، أولونغ محمص بكثافة بطابع معدني. نكهة معقدة وطويلة الأمد. تموضع ممتاز للمقتنين.',
          oolongDongding: 'دونغدينغ ("قمة التجمد") من تايوان، محمص متوسط بنكهات الجوز والكراميل. عملية تقليدية بالفحم. يُحترم بشدة في أسواق شرق آسيا.',
          oolongFenghuang: 'فينغهوانغ دانتسونغ برائحة أوركيد طبيعية. تراث شجرة واحدة، نكهات زهرية وعسلية. نجم صاعد في سوق الأولونغ العالمي.',
          whiteBaihao: 'بايهاو يينتشين ("إبرة الفضة") من فوجيان، مصنوع فقط من البراعم البيضاء الرقيقة. رقيق وحلو بروائح العسل والشمام. قمة الشاي الأبيض.',
          whiteBaimudan: 'بايمودان ("أيقونة البتلة البيضاء") من فوجيان، يجمع بين البراعم والأوراق الشابة. نكهة أغنى مع نكهات زهرية. شاي أبيض يومي ممتاز.',
          whiteShoumei: 'شومي ("حاجب طويل العمر") من فوجيان، مصنوع من أوراق ناضجة. ترابي وحلو قليلاً بطابع خشبي. قيمة ممتازة للخلط والتوريد بالجملة.',
          puerShengcha: 'بو-أر خام، وصفة 7542. حيوي وقاسٍ قليلاً عند الصغر، يتقدم في العمر بكرامة لعقود. وصفة منغهاي كلاسيكية. طلب قوي في آسيا.',
          puerShoucha: 'بو-أر ناضج، وصفة 7572. ترابي وناعم مع نكهات التمر والكافور. جاهز للشرب فوراً. معيار البو-أر الناضج للبيع بالجملة وتجزئة.',
          puerGoldenBud: 'براعم بو-أر الذهبية المعتقة، مصنوعة من براعم عالية الدرجة بشعر ذهبي. حلو وناعم مع ملمس شرابي. عرض معتق فاخر للجامعين.',
          puerMiniTuocha: 'أقراص بو-أر المصغرة المغلفة فردياً (5غ لكل منها). تنسيق حصة واحدة مريح، مثالي للضيافة والمكاتب. فئة سريعة النمو عالمياً.',
          oemCustomBlend: 'خدمة خلط شاي مخصصة بالكامل. نحن نعمل مع ملف نكهتك والسوق المستهدف ونقطة السعر لإنشاء خلطات حصرية. دعم البحث والتطوير متاح.',
          oemPrivateLabel: 'حل علامة خاصة كامل — من اختيار الشاي إلى تصميم التغليف والعلامة التجارية. MOQ منخفض، تسليم سريع. علامتك التجارية، شاينا الفاخر.',
          matchaPremium: 'ماتشا درجة احتفالية من تشجيانغ، مطحون بالحجر من أوراق تنشا المزروعة في الظل. أخضر زاهٍ، غني بالأومامي، ناعم بدون مرارة. للاحتفالات وكافيهات فاخرة.',
          matchaCulinary: 'ماتشا درجة طهوية، متعدد الاستخدامات للاتيه والسموثي والخبز والآيس كريم. لون أخضر زاهٍ، نكهة متوازنة. فعال من حيث التكلفة لقطاع الأغذية.'
        }
      },

      about: {
        title: 'مجموعة شاي Xiangfeng',
        subtitle: 'ثلاثة عقود من التميز في تصدير الشاي الصيني.',
        historyTitle: 'قصتنا',
        historyText1: 'تأسست شركة Xiangfeng Tea Group في عام 1996 في مقاطعة هونان، وبدأت كمزرعة عائلية صغيرة.',
        historyText2: 'اليوم، نعمل في 6 مقاطعات بـ 3 منشآت تصنيع ونصدر إلى 50+ دولة.',
        historyText3: 'مهمتنا: تقديم أفضل الشاي الصيني بجودة لا تقبل المساومة ومصدر شفاف.',
        valuesTitle: 'قيمنا',
        value1Title: 'الجودة أولاً',
        value1Desc: 'كل دفعة مختبرة. كل شهادة تم التحقق منها.',
        value2Title: 'التوريد المستدام',
        value2Desc: 'دعم 2000+ مزرعة عائلية بأسعار عادلة.',
        value3Title: 'الابتكار',
        value3Desc: 'التصنيع الحديث يلتقي مع الحرفية التقليدية.',
        teamTitle: 'فريق القيادة',
        productionTitle: 'الإنتاج والتصنيع',
        productionDesc: 'من المزرعة إلى التغليف، كل خطوة يتم التحكم فيها بعناية',
        step1Harvest: 'الحصاد',
        step2Sort: 'الفرز والتصنيف',
        step3Process: 'التصنيع والتخمير',
        step4Pack: 'التغليف وضبط الجودة',
        step5Ship: 'الشحن العالمي',
        globalTitle: 'شبكة المبيعات العالمية',
        globalDesc: 'تصدير الشاي الصيني الفاخر إلى 50+ دولة حول العالم',
        qcTitle: 'مراقبة الجودة والشهادات',
        qcDesc: 'معايير جودة صارمة مدعومة بشهادات دولية'
      },

      news: {
        title: 'الأخبار والأحداث',
        subtitle: 'ابق على اطلاع مع مجموعة Xiangfeng Tea.',
        readMore: 'اقرأ المزيد',
        all: 'الكل',
        company: 'الشركة',
        industry: 'الصناعة',
        events: 'الأحداث',
        noResults: 'لم يتم العثور على مقالات.'
      },

      contact: {
        title: 'اتصل بنا',
        subtitle: 'تواصل معنا للاستفسارات أو العينات أو فرص الشراكة.',
        formTitle: 'إرسال استفسار',
        name: 'اسمك',
        company: 'اسم الشركة',
        email: 'عنوان البريد الإلكتروني',
        phone: 'هاتف / واتساب',
        productInterest: 'المنتج المهتم به',
        message: 'الرسالة',
        submitBtn: 'إرسال الاستفسار',
        infoTitle: 'معلومات الاتصال',
        address: 'العنوان',
        phoneLabel: 'هاتف',
        emailLabel: 'البريد الإلكتروني',
        whatsapp: 'واتساب',
        wechat: 'وي شات',
        hours: 'ساعات العمل',
        faqTitle: 'الأسئلة الشائعة',
        faq1Q: 'ما هو الحد الأدنى لكمية الطلب؟',
        faq1A: 'يختلف MOQ حسب المنتج — عادة 100 كجم للجملة، 50 كجم لـ OEM.',
        faq2Q: 'هل تقدمون عينات؟',
        faq2A: 'نعم! حزم العينات متاحة لجميع المنتجات. تكلفة الشحن يغطيها المشتري.',
        faq3Q: 'ما هي الشهادات التي لديكم؟',
        faq3A: 'EU Organic، USDA Organic، ISO 22000، HACCP، Rainforest Alliance.'
      },

      certs: {
        title: 'الشهادات والأوسمة',
        subtitle: 'التزامنا بالجودة معتمد من السلطات الدولية',
        euOrganic: 'شهادة EU Organic',
        usdaOrganic: 'شهادة USDA Organic',
        rainforest: 'Rainforest Alliance',
        iso22000: 'ISO 22000 سلامة الغذاء',
        haccp: 'شهادة HACCP',
        goldAward: 'الجائزة الذهبية لمعرض World Tea Expo',
        exportAward: 'جائزة China Export Excellence'
      },

      footer: {
        aboutTitle: 'عن Xiangfeng',
        aboutDesc: 'مؤسسة رائدة في تصدير الشاي الصيني، تقدم شاي فاخر في جميع أنحاء العالم منذ عام 1996.',
        quickLinks: 'روابط سريعة',
        productsTitle: 'المنتجات',
        contactTitle: 'اتصل بنا',
        subscribe: 'اشترك في نشرتنا الإخبارية',
        subscribeDesc: 'احصل على أحدث تحديثات المنتجات ورؤى صناعة الشاي.',
        emailPlaceholder: 'عنوان بريدك الإلكتروني',
        subscribeBtn: 'اشتراك',
        rights: 'جميع الحقوق محفوظة.',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      },

      popup: {
        title: 'استفسار عن المنتج',
        name: 'اسمك',
        company: 'الشركة / العلامة التجارية',
        email: 'البريد الإلكتروني',
        phone: 'هاتف / واتساب',
        quantity: 'الكمية التقديرية',
        message: 'الرسالة',
        messagePlaceholder: 'أخبرنا عن متطلباتك...',
        submitBtn: 'إرسال الاستفسار',
        successTitle: 'تم إرسال الاستفسار!',
        successDesc: 'سيقوم فريق التصدير بالاتصال بك في غضون 24 ساعة.',
        submitting: 'جاري الإرسال...'
      }
    },

    de: {
      common: {
        home: 'Startseite',
        language: 'Sprache',
        about: 'Über uns',
        products: 'Produktzentrum',
        news: 'Nachrichten',
        contact: 'Kontakt',
        inquiry: 'Anfrage',
        certsHonors: 'Zertifizierungen',
        events: 'Messen & Veranstaltungen',
        oem: 'OEM/ODM',
        matcha: 'Matcha',
        loading: 'Laden…',
        back: 'Zurück',
        readMore: 'Mehr lesen',
        learnMore: 'Mehr erfahren',
        viewAll: 'Alle anzeigen',
        close: 'Schließen',
        send: 'Senden',
        submit: 'Absenden',
        cancel: 'Abbrechen',
        search: 'Suchen',
        filter: 'Filtern',
        all: 'Alle',
        years: 'Jahre',
        countries: 'Länder',
        clients: 'Kunden',
        varieties: 'Sorten'
      },

      hero: {
        badge: 'Gegr. 1996 · B2B Tee-Export-Experte',
        title: 'Premium chinesischer Tee',
        subtitle: 'Direkt vom Ursprung · Zertifizierte Qualität · Weltweiter Versand',
        ctaProducts: 'Produkte entdecken',
        ctaInquiry: 'Angebot anfragen'
      },

      home: {
        statsTitle: 'Vertraut von Käufern weltweit',
        featureTitle: 'Warum Xiangfeng wählen?',
        feature1Title: 'Direkt vom Ursprung',
        feature1Desc: 'Wir besitzen Plantagen und arbeiten mit 2.000+ Familienfarmen in 6 Provinzen.',
        feature2Title: 'Zertifizierte Qualität',
        feature2Desc: 'EU & USDA Bio, ISO 22000, HACCP — vollständige Rückverfolgbarkeit.',
        feature3Title: 'Flexible Lieferung',
        feature3Desc: 'Großhandel, Private Label OEM, Probepackungen — MOQ ab 50 kg.',
        feature4Title: 'Globale Logistik',
        feature4Desc: 'Versand in 50+ Länder per See, Luft und Schiene (China-Europe Express).',
        featuredTitle: 'Ausgewählte Produkte',
        featuredSubtitle: 'Unsere beliebtesten Exporttees, bereit für Ihren Markt.',
        newsTitle: 'Aktuelle Nachrichten',
        newsSubtitle: 'Unternehmensupdates, Tee-Industrie-Einblicke und Messeankündigungen.',
        ctaTitle: 'Bereit, premium chinesischen Tee zu beschaffen?',
        ctaSubtitle: 'Personalisiertes Angebot innerhalb von 24 Stunden. Kein Minimum für Proben.',
        ctaBtn: 'Anfrage starten'
      },

      products: {
        title: 'Produktzentrum',
        subtitle: 'Entdecken Sie unser vollständiges Sortiment an premium chinesischem Tee — von klassischen Varietäten bis zu individuellen OEM-Blends.',
        searchPlaceholder: 'Produkte suchen...',
        searchCategory: 'Tee-Varietät',
        searchRegion: 'Region/Herkunft',
        searchOrderType: 'Bestelltyp',
        searchBtn: 'Suchen',
        regionHunan: 'Hunan',
        regionYunnan: 'Yunnan',
        regionFujian: 'Fujian',
        regionZhejiang: 'Zhejiang',
        regionAnhui: 'Anhui',
        regionJiangsu: 'Jiangsu',
        regionSichuan: 'Sichuan',
        regionGuangdong: 'Guangdong',
        regionTaiwan: 'Taiwan',
        orderBulk: 'Großhandel',
        orderSample: 'Probepackung',
        orderOEM: 'Individueller OEM',
        orderSpecial: 'Sonderangebot',
        catGreen: 'Grüner Tee',
        catBlack: 'Schwarzer Tee',
        catOolong: 'Oolong-Tee',
        catWhite: 'Weißer Tee',
        catPuer: 'Pu-erh-Tee',
        catOEM: 'OEM/ODM',
        catMatcha: 'Matcha',
        greenMaojian: 'Grüntee · Maojian Premium',
        greenBiluochun: 'Grüntee · Biluochun',
        greenLongjing: 'Grüntee · Longjing (Drachenbrunnen)',
        greenYunwu: 'Grüntee · Yunwu (Wolken & Nebel)',
        greenZhuyeqing: 'Grüntee · Zhuyeqing (Bambusblatt)',
        greenJasmine: 'Grüntee · Jasminperlen',
        blackDianhong: 'Schwarztee · Dianhong (Yunnan-Rot)',
        blackKeemun: 'Schwarztee · Keemun (Qimen)',
        blackLapsang: 'Schwarztee · Lapsang Souchong',
        blackYingdehong: 'Schwarztee · Yingdehong (Guangdong-Rot)',
        blackZhenghe: 'Schwarztee · Zhenghe Gongfu',
        oolongTieguanyin: 'Oolong · Tieguanyin (Eisengöttin)',
        oolongDahongpao: 'Oolong · Da Hong Pao (Große Rote Robe)',
        oolongDongding: 'Oolong · Dongding (Gefrorene Spitze)',
        oolongDancong: 'Oolong · Fenghuang Dancong (Phönix)',
        whiteYinzhen: 'Weißtee · Baihao Yinzhen (Silbernadel)',
        whiteBaimudan: 'Weißtee · Baimudan (Weiße Pfingstrose)',
        whiteShoumei: 'Weißtee · Shoumei (Langlebigkeitsbraue)',
        puerShengcha: 'Pu-erh · Shengcha 7542 (Raw)',
        puerShoucha: 'Pu-erh · Shoucha 7572 (Ripe)',
        puerAged: 'Pu-erh · Aged Golden Bud',
        puerTuocha: 'Pu-erh · Mini Tuocha',
        oemBlend: 'OEM/ODM · Custom Tea Blend',
        oemPrivateLabel: 'OEM/ODM · Private Label Service',
        matchaCeremonial: 'Matcha · Premium Ceremonial Grade',
        matchaCulinary: 'Matcha · Culinary Grade',
        viewDetails: 'Details anzeigen',
        noResults: 'Keine Produkte entsprechen Ihren Suchkriterien',
        moqLabel: 'MOQ',
        originLabel: 'Herkunft',
        packagingLabel: 'Verpackung'
      },

      news: {
        title1: 'Xiangfeng Tea Group präsentiert auf SIAL Paris 2026',
        excerpt1: 'Präsentation von Premium-Chinesischem Tee und neuen OEM-Fähigkeiten auf Europas größter Lebensmittel-Innovationsmesse.',
        title2: 'Weltweite Matcha-Nachfrage steigt 35% in 2026',
        excerpt2: 'Xiangfeng erweitert Zhejiang Matcha-Produktionskapazität zur Deckung der steigenden internationalen Nachfrage.',
        title3: 'Neue EU-Bio-Zertifizierung für Hunan-Plantage',
        excerpt3: 'Unsere 53.000-Mu Hunan-Plantagebasis hat die EU-Bio-Rezertifizierung für 2026-2027 erfolgreich bestanden.'
      },

      detail: {
        title: 'Produktdetails',
        origin: 'Herkunft',
        description: 'Beschreibung',
        specifications: 'Spezifikationen',
        packaging: 'Verpackungsoptionen',
        minOrder: 'Mindestbestellung',
        inquireProduct: 'Dieses Produkt anfragen',
        relatedProducts: 'Verwandte Produkte',
        certifications: 'Zertifizierungen',
        backToProducts: 'Zurück zu Produkten',
        desc: {
          greenMaojian: 'Premium Hunan Maojian Grüntee, handgepflückt im frühen Frühling. Frischer, blumiger Duft mit süßem Nachgeschmack. Grown at 800m altitude, EU & USDA Bio-zertifiziert.',
          greenBiluochun: 'Klassischer Jiangsu Biluochun Grüntee mit spiralförmigen Blättern und weißen Spitzen. Delikater Orchideenduft, milder Geschmack ohne Adstringenz. Einer der zehn besten Tees Chinas.',
          greenLongjing: 'Longjing (Drachenbrunnen) aus der Region Westsee, pfannenröstet für seine charakteristische flache Form. Nussiger, chestnutartiger Geschmack mit frischem Abgang.',
          greenYunwu: 'Hunan Yunwu (Wolken & Nebel) Grüntee, angebaut in nebligen Hochgebirgsregionen. Frisch, leicht vegetal mit klarem Abgang. Hervorragendes Preis-Leistungs-Verhältnis.',
          greenZhuyeqing: 'Sichuan Zhuyeqing (Bambusblattgrün), in Bambusblattform mit jade-grüner Farbe. Frischer, umami-Geschmack. Beliebt auf ostasiatischen Märkten.',
          greenJasminePearl: 'Handgerollte Jasminperlen aus Grüntee, aromatisiert mit frischen Jasminblüten. Elegant sich öffnend beim Aufbrühen. Favorit für Nachmittagstee.',
          blackDianhong: 'Yunnan Dianhong mit prominenten goldenen Tips. Malz-, Honig- und Kakao-Noten mit kräftigem, weichem Körper. Hervorragend für Frühstücksmischungen.',
          blackKeemun: 'Anhui Keemun, bekannt für fruchtig-blumigen Duft mit leichter Rauchnote. Als einer der besten schwarzen Tees der Welt betrachtet.',
          blackLapsang: 'Fujian Lapsang Souchong, der erste schwarze Tee der Welt mit distinctive pinienrauchigem Aroma. Kräftiger, rauchiger Geschmack.',
          blackYingdehong: 'Guangdong Yingde schwarzer Tee mit süßem, honigartigem Duft und hellroter Tasse. Weiches, malziges Profil.',
          blackZhenghe: 'Fujian Zhenghe Gongfu schwarzer Tee, fest gerollt mit dunklem, glänzendem Erscheinungsbild. Süßer, milder Geschmack mit Dörrobstnoten.',
          oolongTieguanyin: 'Fujian Tieguanyin (Eiserne Göttin der Barmherzigkeit), blumiger Oolong mit Orchideenduft und cremigem Abgang. Der weltweit beliebteste Oolong.',
          oolongDahongpao: 'Wuyi Da Hong Pao (Große Rote Robe), stark gerösteter Stein-Oolong mit mineralischem Charakter. Komplexer, langanhaltender Geschmack.',
          oolongDongding: 'Taiwan Dongding (Gefrorene Spitze) Oolong, mittleröst mit nussigen und Karamellnoten. Traditioneller Kohleprozess.',
          oolongFenghuang: 'Guangdong Fenghuang Dancong mit natürlichem Orchideenduft. Einzelbaum-Erbe, blumige und honigartige Noten.',
          whiteBaihao: 'Fujian Baihao Yinzhen (Silberne Nadel), nur aus zarten weißen Tips. Delikat, süß, mit Honig- und Melonennoten. Die Spitze des weißen Tees.',
          whiteBaimudan: 'Fujian Baimudan (Weiße Pfingstrose), Tips und junge Blätter kombiniert. Vollerer Geschmack mit blumigen Noten.',
          whiteShoumei: 'Fujian Shoumei (Langlebigkeitsbraue), aus maturen Blättern. Erdig, leicht süß mit holzigem Charakter.',
          puerShengcha: 'Yunnan roher Pu-erh, Rezept 7542. Lebhaft, leicht adstringent in der Jugend, altert würdevoll über Jahrzehnte.',
          puerShoucha: 'Yunnan ripe Pu-erh, Rezept 7572. Erdig, weich, mit Dattel- und Kampfernoten. Sofort trinkbar.',
          puerGoldenBud: 'Alterierter goldenen Bud Pu-erh, aus hochwertigen Knospen mit goldenem Haar. Süß, mild, mit sirupartiger Textur.',
          puerMiniTuocha: 'Individuell verpackte Mini-Pu-erh Tuochas (5g je). Praktisches Einzelportionenformat.',
          oemCustomBlend: 'Vollständig individueller Tee-Mischservice. Wir arbeiten mit Ihrem Geschmacksprofil, Zielmarkt und Preispunkt.',
          oemPrivateLabel: 'Komplette Private-Label-Lösung — von Teeselektion bis Verpackungsdesign und Branding. Niedriger MOQ, schnelle Umsetzung.',
          matchaPremium: 'Ceremonial-Grade Matcha aus Zhejiang, steingemahlen aus schattengewachsenen Tencha-Blättern. Lebhaft grün, umami-reich, ohne Bitterkeit.',
          matchaCulinary: 'Culinary-Grade Matcha, vielseitig für Lattes, Smoothies, Backen und Eiscreme. Lebhaft grüne Farbe, balancierter Geschmack.'
        }
      },

      about: {
        title: 'Über Xiangfeng Tea Group',
        subtitle: 'Drei Jahrzehnte Excellence im chinesischen Tee-Export.',
        historyTitle: 'Unsere Geschichte',
        historyText1: 'Gegründet 1996 in der Provinz Hunan, begann Xiangfeng Tea Group als kleine Familienplantage.',
        historyText2: 'Today operieren wir in 6 Provinzen mit 3 Verarbeitungseinrichtungen und exportieren in 50+ Länder.',
        historyText3: 'Unsere Mission: die besten chinesischen Tees mit kompromissloser Qualität und transparentem Sourcing liefern.',
        valuesTitle: 'Unsere Werte',
        value1Title: 'Qualität zuerst',
        value1Desc: 'Jede Charge getestet. Jedes Zertifikat verifiziert.',
        value2Title: 'Nachhaltiges Sourcing',
        value2Desc: '2.000+ Familienfarmen mit fairen Preisen unterstützt.',
        value3Title: 'Innovation',
        value3Desc: 'Moderne Verarbeitung trifft traditionelles Handwerk.',
        teamTitle: 'Leitungsteam',
        productionTitle: 'Produktion & Verarbeitung',
        productionDesc: 'Von der Plantage bis zur Verpackung — jeder Schritt sorgfältig kontrolliert',
        step1Harvest: 'Ernte',
        step2Sort: 'Sortierung & Klassifizierung',
        step3Process: 'Verarbeitung & Fermentation',
        step4Pack: 'Verpackung & QC',
        step5Ship: 'Weltweiter Versand',
        globalTitle: 'Globales Vertriebsnetz',
        globalDesc: 'Export von premium chinesischem Tee in 50+ Länder weltweit',
        qcTitle: 'Qualitätskontrolle & Zertifizierungen',
        qcDesc: 'Strengste Qualitätsstandards, gestützt durch internationale Zertifizierungen'
      },

      news: {
        title: 'Nachrichten & Veranstaltungen',
        subtitle: 'Bleiben Sie informiert mit Xiangfeng Tea Group.',
        readMore: 'Mehr lesen',
        all: 'Alle',
        company: 'Unternehmen',
        industry: 'Industrie',
        events: 'Veranstaltungen',
        noResults: 'Keine Artikel gefunden.'
      },

      contact: {
        title: 'Kontaktieren Sie uns',
        subtitle: 'Kontaktieren Sie uns für Anfragen, Proben oder Partnerschaften.',
        formTitle: 'Anfrage senden',
        name: 'Ihr Name',
        company: 'Firmenname',
        email: 'E-Mail-Adresse',
        phone: 'Telefon / WhatsApp',
        productInterest: 'Produktinteresse',
        message: 'Nachricht',
        submitBtn: 'Anfrage absenden',
        infoTitle: 'Kontaktinformationen',
        address: 'Adresse',
        phoneLabel: 'Telefon',
        emailLabel: 'E-Mail',
        whatsapp: 'WhatsApp',
        wechat: 'WeChat',
        hours: 'Geschäftszeiten',
        faqTitle: 'FAQ',
        faq1Q: 'Was ist Ihre Mindestbestellmenge?',
        faq1A: 'MOQ variiert je nach Produkt — typischerweise 100 kg für Großhandel, 50 kg für OEM.',
        faq2Q: 'Stellen Sie Proben zur Verfügung?',
        faq2A: 'Ja! Probepackungen für alle Produkte verfügbar. Versandkosten vom Käufer.',
        faq3Q: 'Welche Zertifizierungen haben Sie?',
        faq3A: 'EU Bio, USDA Bio, ISO 22000, HACCP, Rainforest Alliance.'
      },

      certs: {
        title: 'Zertifizierungen & Auszeichnungen',
        subtitle: 'Unser Qualitätscommitment wird von internationalen Behörden validiert',
        euOrganic: 'EU Bio-Zertifizierung',
        usdaOrganic: 'USDA Bio-Zertifizierung',
        rainforest: 'Rainforest Alliance',
        iso22000: 'ISO 22000 Lebensmittelsicherheit',
        haccp: 'HACCP-Zertifizierung',
        goldAward: 'Gold Award World Tea Expo',
        exportAward: 'China Export Excellence Award'
      },

      footer: {
        aboutTitle: 'Über Xiangfeng',
        aboutDesc: 'Ein führendes chinesisches Tee-Exportunternehmen, premium Tees weltweit seit 1996 liefernd.',
        quickLinks: 'Quicklinks',
        productsTitle: 'Produkte',
        contactTitle: 'Kontakt',
        subscribe: 'Newsletter abonnieren',
        subscribeDesc: 'Die neuesten Produktupdates und Tee-Industrie-Einblicke erhalten.',
        emailPlaceholder: 'Ihre E-Mail-Adresse',
        subscribeBtn: 'Abonnieren',
        rights: 'Alle Rechte vorbehalten.',
        privacy: 'Datenschutzrichtlinie',
        terms: 'Nutzungsbedingungen'
      },

      popup: {
        title: 'Produktanfrage',
        name: 'Ihr Name',
        company: 'Firma / Marke',
        email: 'E-Mail',
        phone: 'Telefon / WhatsApp',
        quantity: 'Geschätzte Menge',
        message: 'Nachricht',
        messagePlaceholder: 'Erzählen Sie uns über Ihre Anforderungen...',
        submitBtn: 'Anfrage absenden',
        successTitle: 'Anfrage gesendet!',
        successDesc: 'Unser Exportteam kontaktiert Sie innerhalb von 24 Stunden.',
        submitting: 'Absenden...'
      }
    },

    zh: {
      common: {
        home: '首页',
        language: '语言',
        about: '关于我们',
        products: '产品中心',
        news: '新闻动态',
        contact: '联系我们',
        inquiry: '询盘',
        certsHonors: '公司资质',
        events: '展会动态',
        oem: 'OEM/ODM定制',
        matcha: '抹茶',
        loading: '加载中…',
        back: '返回',
        readMore: '阅读更多',
        learnMore: '了解更多',
        viewAll: '查看全部',
        close: '关闭',
        send: '发送',
        submit: '提交',
        cancel: '取消',
        search: '搜索',
        filter: '筛选',
        all: '全部',
        years: '年',
        countries: '个国家',
        clients: '家客户',
        varieties: '个品种'
      },

      hero: {
        badge: '成立于1996年 · B2B茶叶出口专家',
        title: '优质中国茶',
        subtitle: '原产地直供 · 认证品质 · 全球配送',
        ctaProducts: '浏览产品',
        ctaInquiry: '获取报价'
      },

      home: {
        statsTitle: '深受全球买家信赖',
        featureTitle: '为什么选择湘丰？',
        feature1Title: '原产地直供',
        feature1Desc: '我们拥有茶园，并与6个省份的2000+家庭农场合作。',
        feature2Title: '认证品质',
        feature2Desc: '欧盟及美国有机认证、ISO 22000、HACCP — 全程可追溯。',
        feature3Title: '灵活供应',
        feature3Desc: '大宗批发、自有品牌OEM、样品装 — 最低起订量低至50公斤。',
        feature4Title: '全球物流',
        feature4Desc: '通过海运、空运和铁路（中欧班列）配送至50+国家。',
        featuredTitle: '精选产品',
        featuredSubtitle: '我们最受欢迎的出口茶叶，为您的市场做好准备。',
        newsTitle: '最新动态',
        newsSubtitle: '公司更新、茶叶行业洞察和展会公告。',
        ctaTitle: '准备好采购优质中国茶了吗？',
        ctaSubtitle: '24小时内获取个性化报价。样品无需最低起订量。',
        ctaBtn: '开始询盘'
      },

      products: {
        title: '产品中心',
        subtitle: '探索我们全系列优质中国茶 — 从经典品种到定制OEM拼配。',
        searchPlaceholder: '搜索产品...',
        searchCategory: '茶类',
        searchRegion: '地区/产地',
        searchOrderType: '订单类型',
        searchBtn: '搜索',
        regionHunan: '湖南',
        regionYunnan: '云南',
        regionFujian: '福建',
        regionZhejiang: '浙江',
        regionAnhui: '安徽',
        regionJiangsu: '江苏',
        regionSichuan: '四川',
        regionGuangdong: '广东',
        regionTaiwan: '台湾',
        orderBulk: '大宗批发',
        orderSample: '样品装',
        orderOEM: '定制OEM',
        orderSpecial: '特惠',
        catGreen: '绿茶',
        catBlack: '红茶',
        catOolong: '乌龙茶',
        catWhite: '白茶',
        catPuer: '普洱茶',
        catOEM: 'OEM/ODM',
        catMatcha: '抹茶',
        greenMaojian: '绿茶 · 毛尖（特级）',
        greenBiluochun: '绿茶 · 碧螺春',
        greenLongjing: '绿茶 · 龙井（西湖）',
        greenYunwu: '绿茶 · 云雾茶',
        greenZhuyeqing: '绿茶 · 竹叶青',
        greenJasmine: '绿茶 · 茉莉花茶珠',
        blackDianhong: '红茶 · 滇红（云南红）',
        blackKeemun: '红茶 · 祁门红茶',
        blackLapsang: '红茶 · 正山小种',
        blackYingdehong: '红茶 · 英德红',
        blackZhenghe: '红茶 · 政和功夫',
        oolongTieguanyin: '乌龙茶 · 铁观音',
        oolongDahongpao: '乌龙茶 · 大红袍',
        oolongDongding: '乌龙茶 · 冻顶乌龙',
        oolongDancong: '乌龙茶 · 凤凰单丛',
        whiteYinzhen: '白茶 · 白毫银针',
        whiteBaimudan: '白茶 · 白牡丹',
        whiteShoumei: '白茶 · 寿眉',
        puerShengcha: '普洱茶 · 生茶 7542',
        puerShoucha: '普洱茶 · 熟茶 7572',
        puerAged: '普洱茶 · 陈年金芽',
        puerTuocha: '普洱茶 · 小沱茶',
        oemBlend: 'OEM/ODM · 定制拼配茶',
        oemPrivateLabel: 'OEM/ODM · 私标服务',
        matchaCeremonial: '抹茶 · 仪式级抹茶',
        matchaCulinary: '抹茶 · 烹饪级抹茶',
        viewDetails: '查看详情',
        noResults: '没有符合您搜索条件的产品',
        moqLabel: '起订量',
        originLabel: '产地',
        packagingLabel: '包装'
      },

      news: {
        title1: '湘丰茶业集团亮相SIAL巴黎2026国际食品展',
        excerpt1: '在欧洲最大食品创新展上展示优质中国茶及全新OEM能力。',
        title2: '2026年全球抹茶需求激增35%',
        excerpt2: '湘丰扩大浙江抹茶产能以满足国际市场日益增长的需求。',
        title3: '湖南茶园获欧盟有机认证',
        excerpt3: '我司53,000亩湖南茶园基地顺利通过2026-2027年度欧盟有机再认证。'
      },

      detail: {
        title: '产品详情',
        origin: '产地',
        description: '产品描述',
        specifications: '规格参数',
        packaging: '包装选项',
        minOrder: '起订量',
        inquireProduct: '询盘此产品',
        relatedProducts: '相关产品',
        certifications: '认证资质',
        backToProducts: '返回产品列表',
        desc: {
          greenMaojian: '湘丰优质湖南毛尖绿茶，早春手工采摘。具有清新的花香和甘甜的回味。生长于海拔800米高山，通过欧盟及美国有机认证。适合欧洲和北美健康意识较强的市场。',
          greenBiluochun: '经典江苏碧螺春绿茶，卷曲如螺，白毫显露。兰花幽香，滋味甘醇不涩。中国十大名茶之一。适合高端零售和礼品市场。',
          greenLongjing: '西湖龙井（绿茶皇后），扁炒青工艺造就其独特的扁平形状。板栗香，滋味鲜爽。在亚洲和西方高端市场备受追捧。',
          greenYunwu: '湖南云雾绿茶，生长于高山云雾缭绕之地。清新爽口，略带植物气息，回味干净。大宗采购和自有品牌的优质选择。',
          greenZhuyeqing: '四川竹叶青，形似竹叶，色泽翠绿。滋味鲜爽，富含氨基酸。在东亚市场和专业茶叶店广受欢迎。',
          greenJasminePearl: '手工扎花茉莉珍珠，绿茶芯经多次茉莉鲜花窨制。冲泡时如花绽放。是下午茶和高端餐饮的热门选择。',
          blackDianhong: '云南滇红，金毫显露。麦芽、蜂蜜和可可香气，汤色红艳明亮。适合早餐茶拼配和奶茶应用。',
          blackKeemun: '安徽祁门红茶，果香花香兼具，带有独特的"祁门香"。世界三大高香红茶之一。适合高端散茶和拼配基茶。',
          blackLapsang: '福建正山小种，世界红茶鼻祖，独具松烟香。滋味醇厚，带有独特的烟熏味。在欧洲和北美拥有忠实客户群。',
          blackYingdehong: '广东英德红茶，甜香高扬，汤色红亮。滋味醇厚甘甜，麦芽香突出。在东南亚市场日益受欢迎。',
          blackZhenghe: '福建政和工夫红茶，条索紧结，色泽乌润。滋味甜醇，带有干果香气。适合传统工夫泡法。',
          oolongTieguanyin: '福建铁观音（乌龙茶之王），兰花香馥郁，滋味醇厚甘鲜，回甘持久。全球最受欢迎的乌龙茶。任何乌龙茶产品线的必备之选。',
          oolongDahongpao: '武夷山大红袍（岩茶之王），重焙火工艺，独具"岩韵"。滋味复杂，回味悠长。面向收藏家和鉴赏家的高端定位。',
          oolongDongding: '台湾冻顶乌龙，中焙火工艺，带有坚果和焦糖香气。传统炭焙工艺。在东亚市场备受推崇。',
          oolongFenghuang: '广东凤凰单丛，天然兰花香。单株传承，花香蜜韵。在全球乌龙茶市场中冉冉升起的新星。',
          whiteBaihao: '福建白毫银针，仅采肥壮芽头。滋味清鲜甜爽，带有蜂蜜和甜瓜香气。白茶之冠，高端零售的高毛利产品。',
          whiteBaimudan: '福建白牡丹，一芽一二叶。滋味较银针更饱满，带有花香和鲜草香。优秀的日常白茶，适合零售。',
          whiteShoumei: '福建寿眉，以成熟叶片制成。滋味醇厚，略带甜香和木质气息。拼配和大宗供应的高性价比白茶。',
          puerShengcha: '云南生普，7542配方。年轻时微涩，可经数十年陈化。经典勐海配方。在亚洲和陈化爱好者中需求强劲。',
          puerShoucha: '云南熟普，7572配方。陈香醇厚，带有枣香和樟香。即时可饮。大宗和零售的标杆熟普。',
          puerGoldenBud: '陈年金芽普洱，以高级金毫芽头制成。滋味甜醇，有蜜韵，汤感如蜜。面向收藏家的高端陈年产品。',
          puerMiniTuocha: '独立包装迷你小沱茶（每粒5克）。便捷的单份装 format，适合酒店、办公室和即饮消费者。全球快速增长的品类。',
          oemCustomBlend: '全定制拼配服务。我们根据您的风味 profile、目标市场和价格点创建独家拼配。提供研发支持和试产。',
          oemPrivateLabel: '完整自有品牌解决方案 — 从茶叶选择到包装设计和品牌化。低起订量，快速交付。您的品牌，我们的优质茶叶。',
          matchaPremium: '浙江产抹茶， ceremonial 级，以遮阴栽培的碾茶石磨而成。鲜绿色，富含鲜味，无苦味。适合高端茶道和咖啡馆。',
          matchaCulinary: '料理级抹茶，适用于拿铁、冰沙、烘焙和冰淇淋。鲜绿色，风味均衡。餐饮和制造业的高性价比选择。'
        }
      },

      about: {
        title: '关于湘丰茶业集团',
        subtitle: '中国茶叶出口三十年的卓越品质。',
        historyTitle: '我们的故事',
        historyText1: '湘丰茶业集团成立于1996年，总部位于湖南省，最初是一家小型家庭茶园。',
        historyText2: '如今，我们在6个省份运营，拥有3个加工设施，产品出口到50多个国家。',
        historyText3: '我们的使命：以不妥协的品质和透明的采购，提供最优质的中国茶叶。',
        valuesTitle: '我们的价值观',
        value1Title: '品质第一',
        value1Desc: '每批次检测。每个证书验证。',
        value2Title: '可持续采购',
        value2Desc: '以公平价格支持2000+家庭农场。',
        value3Title: '创新',
        value3Desc: '现代加工与传统工艺相结合。',
        teamTitle: '领导团队',
        productionTitle: '生产与加工',
        productionDesc: '从茶园到包装，每一步都精心控制',
        step1Harvest: '采摘',
        step2Sort: '分拣与分级',
        step3Process: '加工与发酵',
        step4Pack: '包装与质检',
        step5Ship: '全球配送',
        globalTitle: '全球销售网络',
        globalDesc: '优质中国茶出口到全球50多个国家',
        qcTitle: '质量控制与认证',
        qcDesc: '严格的质量标准，获得国际认证支持'
      },

      news: {
        title: '新闻与活动',
        subtitle: '关注湘丰茶业集团的最新动态。',
        readMore: '阅读更多',
        all: '全部',
        company: '公司新闻',
        industry: '行业动态',
        events: '活动',
        noResults: '未找到文章。'
      },

      contact: {
        title: '联系我们',
        subtitle: '欢迎咨询、索取样品或洽谈合作机会。',
        formTitle: '发送询盘',
        name: '您的姓名',
        company: '公司名称',
        email: '电子邮箱',
        phone: '电话 / WhatsApp',
        productInterest: '感兴趣的产品',
        message: '留言',
        submitBtn: '提交询盘',
        infoTitle: '联系信息',
        address: '地址',
        phoneLabel: '电话',
        emailLabel: '邮箱',
        whatsapp: 'WhatsApp',
        wechat: '微信',
        hours: '工作时间',
        faqTitle: '常见问题',
        faq1Q: '你们的最低起订量是多少？',
        faq1A: 'MOQ因产品而异 — 通常散装100公斤，OEM 50公斤。',
        faq2Q: '你们提供样品吗？',
        faq2A: '是的！所有产品均提供样品装。运费由买方承担。',
        faq3Q: '你们有哪些认证？',
        faq3A: '欧盟有机、美国有机、ISO 22000、HACCP、雨林联盟。'
      },

      certs: {
        title: '资质和荣誉',
        subtitle: '我们对质量的承诺得到了国际权威机构的认可',
        euOrganic: '欧盟有机认证',
        usdaOrganic: '美国有机认证',
        rainforest: '雨林联盟认证',
        iso22000: 'ISO 22000 食品安全',
        haccp: 'HACCP 认证',
        goldAward: '世界茶博会金奖',
        exportAward: '中国出口优秀企业奖'
      },

      footer: {
        aboutTitle: '关于湘丰',
        aboutDesc: '中国领先的茶叶出口企业，自1996年以来向世界各地的客户提供优质茶叶。',
        quickLinks: '快速链接',
        productsTitle: '产品中心',
        contactTitle: '联系我们',
        subscribe: '订阅我们的通讯',
        subscribeDesc: '获取最新产品更新和茶叶行业洞察。',
        emailPlaceholder: '您的电子邮箱地址',
        subscribeBtn: '订阅',
        rights: '保留所有权利。',
        privacy: '隐私政策',
        terms: '服务条款'
      },

      popup: {
        title: '产品询盘',
        name: '您的姓名',
        company: '公司 / 品牌',
        email: '电子邮箱',
        phone: '电话 / WhatsApp',
        quantity: '预估数量',
        message: '留言',
        messagePlaceholder: '告诉我们您的需求...',
        submitBtn: '提交询盘',
        successTitle: '询盘已提交！',
        successDesc: '我们的出口团队将在24小时内与您联系。',
        submitting: '提交中...'
      }
    }
  };

  /* ---------- Runtime State ---------- */
  let currentLang = localStorage.getItem('xf_lang') || 'en';
  const RTL_LANGS = ['ar'];

  /* ---------- Core Methods ---------- */
  function t(key, vars = {}) {
    const keys = key.split('.');
    let node = dict[currentLang];
    for (const k of keys) {
      if (node == null) return key;
      node = node[k];
    }
    if (node == null) return key;
    let str = node;
    for (const [vk, vv] of Object.entries(vars)) {
      str = str.replace(`{{${vk}}}`, vv);
    }
    return str;
  }

  function applyLang(lang) {
    if (!dict[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('xf_lang', lang);

    // RTL handling
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';

    updatePageText();
    updateLangSelectorUI();
  }

  function updatePageText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('data-i18n-placeholder')) {
          el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        }
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });
  }

  function injectLangSelector() {
    const container = document.getElementById('lang-selector');
    if (!container) return;
    container.innerHTML = `
      <div class="lang-dropdown">
        <button class="lang-btn" aria-label="Select language">
          <span class="lang-icon">🌐</span>
          <span class="lang-label">${getLangLabel(currentLang)}</span>
          <span class="lang-arrow">▾</span>
        </button>
        <ul class="lang-menu">
          <li data-lang="en">🇬🇧 English</li>
          <li data-lang="zh">🇨🇳 中文</li>
          <li data-lang="ru">🇷🇺 Русский</li>
          <li data-lang="de">🇩🇪 Deutsch</li>
          <li data-lang="ar">🇸🇦 العربية</li>
        </ul>
      </div>`;

    const btn = container.querySelector('.lang-btn');
    const menu = container.querySelector('.lang-menu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        setLang(li.dataset.lang);
        menu.classList.remove('open');
      });
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
  }

  function updateLangSelectorUI() {
    const label = document.querySelector('#lang-selector .lang-label');
    if (label) label.textContent = getLangLabel(currentLang);
  }

  function getLangLabel(lang) {
    const labels = { en: 'EN', zh: 'ZH', ru: 'RU', de: 'DE', ar: 'AR' };
    return labels[lang] || 'EN';
  }

  /* ---------- Public API ---------- */
  function init() {
    injectLangSelector();
    applyLang(currentLang);
  }

  function setLang(lang) {
    applyLang(lang);
  }

  function getLang() {
    return currentLang;
  }

  return { init, setLang, getLang, t, applyLang };
})();

/* Auto‑init on DOM ready */
document.addEventListener('DOMContentLoaded', () => XF_i18n.init());
