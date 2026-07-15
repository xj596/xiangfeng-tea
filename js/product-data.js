/* ============================================================
   Xiangfeng Tea Group — Product Data & Search Engine
   ============================================================
   Contains:
   - 26+ product entries with full metadata
   - filterProducts()  — search by category / region / orderType / text
   - getProductById()  — single product lookup
   - getRelatedProducts() — related product lookup
   - Featured carousel logic (8 products, 4s auto-rotate)
   ============================================================ */

const XF_Products = (() => {
  /* ---------- Full Product Array ---------- */
  const products = [
    // ===== Green Tea (6) =====
    {
      id: 'green-maojian',
      nameKey: 'products.greenMaojian',
      catKey: 'products.catGreen',
      region: 'products.regionHunan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🍵',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.greenMaojian',
      specs: {
        origin: 'Hunan, China',
        packaging: '25kg/bag, 1kg/foil bag',
        minOrder: '100kg',
        certifications: 'EU Organic, USDA Organic'
      },
      relatedIds: ['green-biluochun', 'green-longjing', 'green-yunwu']
    },
    {
      id: 'green-biluochun',
      nameKey: 'products.greenBiluochun',
      catKey: 'products.catGreen',
      region: 'products.regionJiangsu',
      orderTypes: ['products.orderBulk', 'products.orderSample', 'products.orderSpecial'],
      emoji: '🍃',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.greenBiluochun',
      specs: {
        origin: 'Jiangsu, China',
        packaging: '20kg/bag, 500g/box',
        minOrder: '100kg',
        certifications: 'EU Organic'
      },
      relatedIds: ['green-maojian', 'green-longjing']
    },
    {
      id: 'green-longjing',
      nameKey: 'products.greenLongjing',
      catKey: 'products.catGreen',
      region: 'products.regionZhejiang',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🫖',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.greenLongjing',
      specs: {
        origin: 'Zhejiang, China',
        packaging: '25kg/bag, 250g/tin',
        minOrder: '100kg',
        certifications: 'EU Organic, ISO 22000'
      },
      relatedIds: ['green-maojian', 'green-biluochun', 'green-zhuyeqing']
    },
    {
      id: 'green-yunwu',
      nameKey: 'products.greenYunwu',
      catKey: 'products.catGreen',
      region: 'products.regionHunan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '☁️',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.greenYunwu',
      specs: {
        origin: 'Hunan, China',
        packaging: '25kg/bag, 1kg/bag',
        minOrder: '100kg',
        certifications: 'USDA Organic'
      },
      relatedIds: ['green-maojian', 'green-zhuyeqing']
    },
    {
      id: 'green-zhuyeqing',
      nameKey: 'products.greenZhuyeqing',
      catKey: 'products.catGreen',
      region: 'products.regionSichuan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🎋',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.greenZhuyeqing',
      specs: {
        origin: 'Sichuan, China',
        packaging: '20kg/bag, 100g/box',
        minOrder: '100kg',
        certifications: 'EU Organic'
      },
      relatedIds: ['green-longjing', 'green-yunwu']
    },
    {
      id: 'green-jasmine-pearl',
      nameKey: 'products.greenJasmine',
      catKey: 'products.catGreen',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample', 'products.orderSpecial'],
      emoji: '🌸',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.greenJasminePearl',
      specs: {
        origin: 'Fujian, China',
        packaging: '25kg/bag, 500g/jar',
        minOrder: '100kg',
        certifications: 'ISO 22000, HACCP'
      },
      relatedIds: ['green-biluochun', 'green-longjing']
    },

    // ===== Black Tea (5) =====
    {
      id: 'black-dianhong',
      nameKey: 'products.blackDianhong',
      catKey: 'products.catBlack',
      region: 'products.regionYunnan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🔴',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.blackDianhong',
      specs: {
        origin: 'Yunnan, China',
        packaging: '30kg/bag, 1kg/bag',
        minOrder: '100kg',
        certifications: 'EU Organic, Rainforest Alliance'
      },
      relatedIds: ['black-keemun', 'black-yingdehong']
    },
    {
      id: 'black-keemun',
      nameKey: 'products.blackKeemun',
      catKey: 'products.catBlack',
      region: 'products.regionAnhui',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🫕',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.blackKeemun',
      specs: {
        origin: 'Anhui, China',
        packaging: '25kg/bag, 500g/box',
        minOrder: '100kg',
        certifications: 'EU Organic, ISO 22000'
      },
      relatedIds: ['black-dianhong', 'black-zhenghe']
    },
    {
      id: 'black-lapsang',
      nameKey: 'products.blackLapsang',
      catKey: 'products.catBlack',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🔥',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.blackLapsang',
      specs: {
        origin: 'Fujian, China',
        packaging: '20kg/bag, 250g/box',
        minOrder: '100kg',
        certifications: 'HACCP, ISO 22000'
      },
      relatedIds: ['black-keemun', 'black-yingdehong']
    },
    {
      id: 'black-yingdehong',
      nameKey: 'products.blackYingdehong',
      catKey: 'products.catBlack',
      region: 'products.regionGuangdong',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🟤',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.blackYingdehong',
      specs: {
        origin: 'Guangdong, China',
        packaging: '25kg/bag, 1kg/bag',
        minOrder: '100kg',
        certifications: 'EU Organic'
      },
      relatedIds: ['black-dianhong', 'black-lapsang']
    },
    {
      id: 'black-zhenghe',
      nameKey: 'products.blackZhenghe',
      catKey: 'products.catBlack',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🏮',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.blackZhenghe',
      specs: {
        origin: 'Fujian, China',
        packaging: '25kg/bag, 500g/box',
        minOrder: '100kg',
        certifications: 'ISO 22000'
      },
      relatedIds: ['black-keemun', 'black-lapsang']
    },

    // ===== Oolong Tea (4) =====
    {
      id: 'oolong-tieguanyin',
      nameKey: 'products.oolongTieguanyin',
      catKey: 'products.catOolong',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample', 'products.orderSpecial'],
      emoji: '🌀',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.oolongTieguanyin',
      specs: {
        origin: 'Fujian, China',
        packaging: '20kg/bag, 250g/box',
        minOrder: '100kg',
        certifications: 'EU Organic, USDA Organic'
      },
      relatedIds: ['oolong-dahongpao', 'oolong-dongding']
    },
    {
      id: 'oolong-dahongpao',
      nameKey: 'products.oolongDahongpao',
      catKey: 'products.catOolong',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🍂',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.oolongDahongpao',
      specs: {
        origin: 'Fujian, China',
        packaging: '20kg/bag, 100g/box',
        minOrder: '100kg',
        certifications: 'HACCP, ISO 22000'
      },
      relatedIds: ['oolong-tieguanyin', 'oolong-fenghuang']
    },
    {
      id: 'oolong-dongding',
      nameKey: 'products.oolongDongding',
      catKey: 'products.catOolong',
      region: 'products.regionTaiwan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '❄️',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.oolongDongding',
      specs: {
        origin: 'Taiwan, China',
        packaging: '15kg/bag, 150g/box',
        minOrder: '100kg',
        certifications: 'ISO 22000'
      },
      relatedIds: ['oolong-tieguanyin', 'oolong-dahongpao']
    },
    {
      id: 'oolong-fenghuang',
      nameKey: 'products.oolongDancong',
      catKey: 'products.catOolong',
      region: 'products.regionGuangdong',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🦚',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.oolongFenghuang',
      specs: {
        origin: 'Guangdong, China',
        packaging: '20kg/bag, 250g/box',
        minOrder: '100kg',
        certifications: 'HACCP'
      },
      relatedIds: ['oolong-dahongpao', 'oolong-dongding']
    },

    // ===== White Tea (3) =====
    {
      id: 'white-baihao',
      nameKey: 'products.whiteYinzhen',
      catKey: 'products.catWhite',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🤍',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.whiteBaihao',
      specs: {
        origin: 'Fujian, China',
        packaging: '15kg/bag, 100g/box',
        minOrder: '100kg',
        certifications: 'EU Organic, USDA Organic'
      },
      relatedIds: ['white-baimudan', 'white-shoumei']
    },
    {
      id: 'white-baimudan',
      nameKey: 'products.whiteBaimudan',
      catKey: 'products.catWhite',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🌺',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.whiteBaimudan',
      specs: {
        origin: 'Fujian, China',
        packaging: '20kg/bag, 250g/box',
        minOrder: '100kg',
        certifications: 'EU Organic'
      },
      relatedIds: ['white-baihao', 'white-shoumei']
    },
    {
      id: 'white-shoumei',
      nameKey: 'products.whiteShoumei',
      catKey: 'products.catWhite',
      region: 'products.regionFujian',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🌿',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.whiteShoumei',
      specs: {
        origin: 'Fujian, China',
        packaging: '25kg/bag, 500g/bag',
        minOrder: '100kg',
        certifications: 'ISO 22000'
      },
      relatedIds: ['white-baihao', 'white-baimudan']
    },

    // ===== Pu-erh Tea (4) =====
    {
      id: 'puer-shengcha',
      nameKey: 'products.puerShengcha',
      catKey: 'products.catPuer',
      region: 'products.regionYunnan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🟢',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.puerShengcha',
      specs: {
        origin: 'Yunnan, China',
        packaging: '40kg/bag, 357g/cake',
        minOrder: '100kg',
        certifications: 'Rainforest Alliance'
      },
      relatedIds: ['puer-shoucha', 'puer-goldenbud']
    },
    {
      id: 'puer-shoucha',
      nameKey: 'products.puerShoucha',
      catKey: 'products.catPuer',
      region: 'products.regionYunnan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🔵',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.puerShoucha',
      specs: {
        origin: 'Yunnan, China',
        packaging: '40kg/bag, 357g/cake',
        minOrder: '100kg',
        certifications: 'HACCP'
      },
      relatedIds: ['puer-shengcha', 'puer-minituocha']
    },
    {
      id: 'puer-goldenbud',
      nameKey: 'products.puerAged',
      catKey: 'products.catPuer',
      region: 'products.regionYunnan',
      orderTypes: ['products.orderBulk', 'products.orderSample', 'products.orderSpecial'],
      emoji: '✨',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.puerGoldenBud',
      specs: {
        origin: 'Yunnan, China',
        packaging: '20kg/bag, 200g/cake',
        minOrder: '100kg',
        certifications: 'ISO 22000'
      },
      relatedIds: ['puer-shengcha', 'puer-shoucha']
    },
    {
      id: 'puer-minituocha',
      nameKey: 'products.puerTuocha',
      catKey: 'products.catPuer',
      region: 'products.regionYunnan',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🫔',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.puerMiniTuocha',
      specs: {
        origin: 'Yunnan, China',
        packaging: '10kg/carton, 5g/tuocha',
        minOrder: '100kg',
        certifications: 'HACCP, ISO 22000'
      },
      relatedIds: ['puer-shengcha', 'puer-shoucha']
    },

    // ===== OEM/ODM (2) =====
    {
      id: 'oem-custom-blend',
      nameKey: 'products.oemBlend',
      catKey: 'products.catOEM',
      region: 'products.regionHunan',
      orderTypes: ['products.orderOEM'],
      emoji: '🧪',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.oemCustomBlend',
      specs: {
        origin: 'Hunan / Custom, China',
        packaging: 'Custom private label packaging',
        minOrder: '500kg',
        certifications: 'As per client requirement'
      },
      relatedIds: ['oem-private-label']
    },
    {
      id: 'oem-private-label',
      nameKey: 'products.oemPrivateLabel',
      catKey: 'products.catOEM',
      region: 'products.regionHunan',
      orderTypes: ['products.orderOEM'],
      emoji: '🏷️',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.oemPrivateLabel',
      specs: {
        origin: 'Multi-region, China',
        packaging: 'Fully customizable packaging & branding',
        minOrder: '500kg',
        certifications: 'All major certifications available'
      },
      relatedIds: ['oem-custom-blend']
    },

    // ===== Matcha (2) =====
    {
      id: 'matcha-premium',
      nameKey: 'products.matchaCeremonial',
      catKey: 'products.catMatcha',
      region: 'products.regionZhejiang',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🍵',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.matchaPremium',
      specs: {
        origin: 'Zhejiang, China',
        packaging: '20kg/bag, 30g/can, 100g/bag',
        minOrder: '50kg',
        certifications: 'EU Organic, USDA Organic, JAS Organic'
      },
      relatedIds: ['matcha-culinary']
    },
    {
      id: 'matcha-culinary',
      nameKey: 'products.matchaCulinary',
      catKey: 'products.catMatcha',
      region: 'products.regionZhejiang',
      orderTypes: ['products.orderBulk', 'products.orderSample'],
      emoji: '🥣',
      images: [
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png',
        'https://video.aultras-tea.com/wulongcha.png'
      ],
      descriptionKey: 'detail.desc.matchaCulinary',
      specs: {
        origin: 'Zhejiang, China',
        packaging: '25kg/bag, 500g/bag, 1kg/bag',
        minOrder: '50kg',
        certifications: 'EU Organic, USDA Organic'
      },
      relatedIds: ['matcha-premium']
    }
  ];

  /* ---------- Helper: resolve category key to display string ---------- */
  function resolve(key) {
    // Try via XF_i18n first, fallback to raw key
    if (typeof XF_i18n !== 'undefined' && XF_i18n.t) {
      const val = XF_i18n.t(key);
      if (val !== key) return val;
    }
    return key;
  }

  /* ---------- filterProducts ---------- */
  function filterProducts(category, region, orderType, searchText) {
    return products.filter(p => {
      if (category && category !== 'all' && p.catKey !== category) return false;
      if (region && region !== 'all' && p.region !== region) return false;
      if (orderType && orderType !== 'all' && !p.orderTypes.includes(orderType)) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        const haystack = [
          p.nameKey,
          resolve(p.catKey),
          resolve(p.region),
          ...p.orderTypes.map(resolve)
        ].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  /* ---------- getProductById ---------- */
  function getProductById(id) {
    return products.find(p => p.id === id) || null;
  }

  /* ---------- getRelatedProducts ---------- */
  function getRelatedProducts(id) {
    const product = getProductById(id);
    if (!product) return [];
    return product.relatedIds
      .map(rid => getProductById(rid))
      .filter(Boolean);
  }

  /* ---------- Featured Products (Carousel) ---------- */
  const featuredIds = [
    'green-maojian',
    'black-dianhong',
    'oolong-tieguanyin',
    'white-baihao',
    'puer-shengcha',
    'matcha-premium',
    'green-jasmine-pearl',
    'black-keemun'
  ];

  function getFeaturedProducts() {
    return featuredIds
      .map(id => getProductById(id))
      .filter(Boolean);
  }

  /* ---------- Carousel Controller ---------- */
  let carouselInterval = null;
  let currentSlide = 0;

  function startCarousel(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = getFeaturedProducts();
    const autoRotate = options.autoRotate !== false;
    const intervalMs = options.intervalMs || 4000;

    function render() {
      const html = items.map((item, i) => {
        const active = i === currentSlide ? 'active' : '';
        return `
          <div class="carousel-slide ${active}" data-index="${i}">
            <div class="carousel-card">
              <div class="carousel-img-wrap">
                <img src="${item.images[0]}" alt="${item.nameKey}" loading="lazy">
                <span class="carousel-emoji">${item.emoji}</span>
              </div>
              <div class="carousel-info">
                <h3>${item.nameKey}</h3>
                <p class="carousel-cat">${resolve(item.catKey)}</p>
                <p class="carousel-region">${resolve(item.region)}</p>
                <a href="product-detail.html?id=${item.id}" class="carousel-btn" data-i18n="products.viewDetails">${resolve('products.viewDetails')}</a>
              </div>
            </div>
          </div>`;
      }).join('');

      const dots = items.map((_, i) =>
        `<span class="carousel-dot ${i === currentSlide ? 'active' : ''}" data-index="${i}"></span>`
      ).join('');

      container.innerHTML = `
        <div class="carousel-track">
          ${html}
        </div>
        <button class="carousel-prev" aria-label="Previous">‹</button>
        <button class="carousel-next" aria-label="Next">›</button>
        <div class="carousel-dots">${dots}</div>`;

      // Prev / Next
      container.querySelector('.carousel-prev').addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoRotate();
      });
      container.querySelector('.carousel-next').addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoRotate();
      });

      // Dots
      container.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          goToSlide(parseInt(dot.dataset.index, 10));
          resetAutoRotate();
        });
      });
    }

    function goToSlide(index) {
      const track = container.querySelector('.carousel-track');
      if (!track) return;
      currentSlide = ((index % items.length) + items.length) % items.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      // Update dots
      container.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
      // Update slide active class
      container.querySelectorAll('.carousel-slide').forEach((s, i) => {
        s.classList.toggle('active', i === currentSlide);
      });
    }

    function resetAutoRotate() {
      if (!autoRotate) return;
      clearInterval(carouselInterval);
      carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, intervalMs);
    }

    render();
    if (autoRotate) {
      carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, intervalMs);
    }
  }

  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  /* ---------- Public API ---------- */
  return {
    products,
    filterProducts,
    getProductById,
    getRelatedProducts,
    getFeaturedProducts,
    startCarousel,
    stopCarousel,
    resolve
  };
})();
