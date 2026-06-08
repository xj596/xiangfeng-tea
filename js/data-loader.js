// 数据加载脚本 - 从data目录读取JSON数据

// 获取GitHub Pages仓库路径
const repoPath = ''; // 如果部署在子路径下，填写如 '/xiangfeng-tea'

async function loadJSON(file) {
    try {
        const response = await fetch(repoPath + '/data/' + file);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.warn('加载数据失败:', file, error);
        return null;
    }
}

// 加载产品数据
async function loadProductsData() {
    const data = await loadJSON('products.json');
    if (data) {
        window.productsData = data;
        return data;
    }
    return null;
}

// 加载新闻数据
async function loadNewsData() {
    const data = await loadJSON('news.json');
    if (data) {
        window.newsData = data;
        return data;
    }
    return null;
}

// 加载网站设置
async function loadSettingsData() {
    const data = await loadJSON('settings.json');
    if (data) {
        window.settingsData = data;
        return data;
    }
    return null;
}

// 加载媒体数据
async function loadMediaData() {
    const data = await loadJSON('media.json');
    if (data) {
        window.mediaData = data;
        return data;
    }
    return null;
}

// 加载所有数据
async function loadAllData() {
    await Promise.all([
        loadProductsData(),
        loadNewsData(),
        loadSettingsData(),
        loadMediaData()
    ]);
}