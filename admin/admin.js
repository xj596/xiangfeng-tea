// 湘丰茶叶后台管理系统 JavaScript

// 全局数据存储
let productsData = { products: [], categories: [] };
let newsData = { news: [] };
let settingsData = {};
let mediaData = { images: [], videos: [], pdfs: [] };

// GitHub配置
let githubConfig = {
    token: '',
    repo: ''
};

// 当前编辑项
let currentEditId = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    const savedConfig = localStorage.getItem('adminConfig');
    if (!savedConfig) {
        window.location.href = 'login.html';
        return;
    }

    const config = JSON.parse(savedConfig);
    githubConfig.token = config.githubToken;
    githubConfig.repo = config.repo;

    // 加载数据
    loadAllData();

    // 初始化导航
    initNavigation();

    // 初始化图片预览
    initImagePreview();
});

// 加载所有数据
async function loadAllData() {
    try {
        showToast('正在加载数据...', 'info');

        // 尝试从本地localStorage加载数据
        const localProducts = localStorage.getItem('productsData');
        const localNews = localStorage.getItem('newsData');
        const localSettings = localStorage.getItem('settingsData');
        const localMedia = localStorage.getItem('mediaData');

        if (localProducts) productsData = JSON.parse(localProducts);
        if (localNews) newsData = JSON.parse(localNews);
        if (localSettings) settingsData = JSON.parse(localSettings);
        if (localMedia) mediaData = JSON.parse(localMedia);

        // 如果有GitHub配置，尝试从GitHub加载
        if (githubConfig.token && githubConfig.repo) {
            await loadFromGitHub();
        }

        // 更新UI
        updateDashboard();
        renderProductsTable();
        renderNewsTable();
        renderImagesList();
        renderVideosList();
        renderPdfsTable();
        populateSettingsForm();

        showToast('数据加载完成', 'success');
    } catch (error) {
        console.error('加载数据失败:', error);
        showToast('数据加载失败，请检查网络连接', 'error');
    }
}

// 从GitHub加载数据
async function loadFromGitHub() {
    try {
        const branch = 'main';
        const apiBase = `https://api.github.com/repos/${githubConfig.repo}`;

        // 获取JSON文件
        const files = ['data/products.json', 'data/news.json', 'data/settings.json', 'data/media.json'];

        for (const file of files) {
            try {
                const response = await fetch(`${apiBase}/contents/${file}?ref=${branch}`, {
                    headers: {
                        'Authorization': `token ${githubConfig.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                if (response.ok) {
                    const content = await response.json();
                    const decoded = atob(content.content);

                    if (file.includes('products')) {
                        productsData = JSON.parse(decoded);
                        localStorage.setItem('productsData', JSON.stringify(productsData));
                    } else if (file.includes('news')) {
                        newsData = JSON.parse(decoded);
                        localStorage.setItem('newsData', JSON.stringify(newsData));
                    } else if (file.includes('settings')) {
                        settingsData = JSON.parse(decoded);
                        localStorage.setItem('settingsData', JSON.stringify(settingsData));
                    } else if (file.includes('media')) {
                        mediaData = JSON.parse(decoded);
                        localStorage.setItem('mediaData', JSON.stringify(mediaData));
                    }
                }
            } catch (e) {
                console.log(`文件 ${file} 不存在或加载失败`);
            }
        }
    } catch (error) {
        console.error('从GitHub加载数据失败:', error);
    }
}

// 保存到GitHub
async function syncToGitHub() {
    if (!githubConfig.token || !githubConfig.repo) {
        showToast('请先在设置中配置GitHub Token和仓库', 'error');
        return;
    }

    try {
        showToast('正在同步到GitHub...', 'info');

        const branch = 'main';
        const apiBase = `https://api.github.com/repos/${githubConfig.repo}`;

        // 确保data目录存在
        const dataDir = {
            path: 'data',
            type: 'dir'
        };

        // 保存各个JSON文件
        const files = [
            { path: 'data/products.json', content: productsData },
            { path: 'data/news.json', content: newsData },
            { path: 'data/settings.json', content: settingsData },
            { path: 'data/media.json', content: mediaData }
        ];

        for (const file of files) {
            const content = JSON.stringify(file.content, null, 2);
            const blob = btoa(unescape(encodeURIComponent(content)));

            // 检查文件是否存在
            let sha = null;
            try {
                const existing = await fetch(`${apiBase}/contents/${file.path}?ref=${branch}`, {
                    headers: {
                        'Authorization': `token ${githubConfig.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (existing.ok) {
                    const existingData = await existing.json();
                    sha = existingData.sha;
                }
            } catch (e) {
                // 文件不存在，继续创建
            }

            // 创建或更新文件
            const fileData = {
                message: `更新 ${file.path}`,
                content: blob,
                branch: branch
            };
            if (sha) fileData.sha = sha;

            const response = await fetch(`${apiBase}/contents/${file.path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${githubConfig.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fileData)
            });

            if (!response.ok) {
                throw new Error(`更新 ${file.path} 失败`);
            }
        }

        showToast('同步成功！', 'success');
        addRecentChange('已同步所有数据到GitHub');
    } catch (error) {
        console.error('同步失败:', error);
        showToast('同步失败: ' + error.message, 'error');
    }
}

// 保存数据到localStorage
function saveData() {
    localStorage.setItem('productsData', JSON.stringify(productsData));
    localStorage.setItem('newsData', JSON.stringify(newsData));
    localStorage.setItem('settingsData', JSON.stringify(settingsData));
    localStorage.setItem('mediaData', JSON.stringify(mediaData));
}

// 初始化导航
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            showPage(page);

            // 更新导航状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // 更新页面标题
            const titles = {
                'dashboard': '控制面板',
                'products': '产品管理',
                'news': '新闻管理',
                'images': '图片管理',
                'videos': '视频管理',
                'pdfs': 'PDF管理',
                'settings': '网站设置'
            };
            document.getElementById('pageTitle').textContent = titles[page] || '控制面板';
        });
    });
}

// 显示指定页面
function showPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById('page-' + pageId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// 更新控制面板统计
function updateDashboard() {
    document.getElementById('statProducts').textContent = productsData.products.length;
    document.getElementById('statNews').textContent = newsData.news.length;
    document.getElementById('statImages').textContent = (mediaData.images || []).length;
    document.getElementById('statPdfs').textContent = (mediaData.pdfs || []).length;
}

// 渲染产品表格
function renderProductsTable() {
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';

    productsData.products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.image}" class="table-image" alt="${product.name}"></td>
            <td>
                <strong>${product.name}</strong><br>
                <small style="color: #888;">${product.nameEn || ''}</small>
            </td>
            <td>${product.category}</td>
            <td>¥${product.price} <small>/ ${product.priceUnit}</small></td>
            <td class="table-actions">
                <button class="btn-icon edit" onclick="editProduct('${product.id}')" title="编辑">✏️</button>
                <button class="btn-icon delete" onclick="deleteProduct('${product.id}')" title="删除">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 渲染新闻表格
function renderNewsTable() {
    const tbody = document.querySelector('#newsTable tbody');
    tbody.innerHTML = '';

    newsData.news.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.image}" class="table-image" alt="${item.title}"></td>
            <td><strong>${item.title}</strong></td>
            <td><span class="badge badge-success">${item.category}</span></td>
            <td>${item.date}</td>
            <td class="table-actions">
                <button class="btn-icon edit" onclick="editNews('${item.id}')" title="编辑">✏️</button>
                <button class="btn-icon delete" onclick="deleteNews('${item.id}')" title="删除">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 渲染图片列表
function renderImagesList() {
    const container = document.getElementById('imagesList');
    const images = mediaData.images || [];

    if (images.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">🖼️</div>
                <p>暂无图片，请添加图片外链</p>
            </div>
        `;
        return;
    }

    container.innerHTML = images.map(img => `
        <div style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
            <img src="${img.url}" style="width: 100%; height: 120px; object-fit: cover;" alt="${img.name}">
            <div style="padding: 12px;">
                <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px;">${img.name}</div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-icon edit" onclick="copyToClipboard('${img.url}')" title="复制链接">📋</button>
                    <button class="btn-icon delete" onclick="deleteImage('${img.name}')" title="删除">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染视频列表
function renderVideosList() {
    const container = document.getElementById('videosList');
    const videos = mediaData.videos || [];

    if (videos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">🎬</div>
                <p>暂无视频，请添加视频外链</p>
            </div>
        `;
        return;
    }

    container.innerHTML = videos.map(video => `
        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px;">
            <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px;">${video.name}</div>
            <div style="font-size: 12px; color: #888; word-break: break-all; margin-bottom: 12px;">${video.url}</div>
            <div style="display: flex; gap: 8px;">
                <button class="btn-icon edit" onclick="copyToClipboard('${video.url}')" title="复制链接">📋</button>
                <button class="btn-icon delete" onclick="deleteVideo('${video.name}')" title="删除">🗑️</button>
            </div>
        </div>
    `).join('');
}

// 渲染PDF表格
function renderPdfsTable() {
    const tbody = document.querySelector('#pdfsTable tbody');
    const pdfs = mediaData.pdfs || [];
    tbody.innerHTML = '';

    if (pdfs.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #888;">
                    暂无PDF，请添加PDF外链
                </td>
            </tr>
        `;
        return;
    }

    pdfs.forEach(pdf => {
        const product = productsData.products.find(p => p.pdf === pdf.url);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${pdf.name}</strong></td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${pdf.url}</td>
            <td>${product ? product.name : '-'}</td>
            <td class="table-actions">
                <button class="btn-icon edit" onclick="copyToClipboard('${pdf.url}')" title="复制链接">📋</button>
                <button class="btn-icon edit" onclick="editPdf('${pdf.name}')" title="编辑">✏️</button>
                <button class="btn-icon delete" onclick="deletePdf('${pdf.name}')" title="删除">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // 更新产品选择下拉框
    updateProductSelect();
}

// 更新产品选择下拉框
function updateProductSelect() {
    const select = document.getElementById('newPdfProduct');
    select.innerHTML = '<option value="">选择产品（可选）</option>';

    productsData.products.forEach(product => {
        select.innerHTML += `<option value="${product.id}">${product.name}</option>`;
    });
}

// 填充设置表单
function populateSettingsForm() {
    if (settingsData.site) {
        document.getElementById('settingSiteName').value = settingsData.site.name || '';
        document.getElementById('settingSiteNameEn').value = settingsData.site.nameEn || '';
        document.getElementById('settingDescription').value = settingsData.site.description || '';
    }

    if (settingsData.hero) {
        document.getElementById('settingHeroImage').value = settingsData.hero.image || '';
    }

    if (settingsData.contact) {
        document.getElementById('settingAddress').value = settingsData.contact.address || '';
        document.getElementById('settingPhone').value = settingsData.contact.phone || '';
        document.getElementById('settingEmail').value = settingsData.contact.email || '';
        document.getElementById('settingHours').value = settingsData.contact.hours || '';
    }
}

// 初始化图片预览
function initImagePreview() {
    // 产品图片预览
    document.getElementById('productImage').addEventListener('input', function() {
        const preview = document.getElementById('productImagePreview');
        if (this.value) {
            preview.src = this.value;
            preview.style.display = 'block';
            preview.onerror = () => preview.style.display = 'none';
        } else {
            preview.style.display = 'none';
        }
    });

    // 新闻图片预览
    document.getElementById('newsImage').addEventListener('input', function() {
        const preview = document.getElementById('newsImagePreview');
        if (this.value) {
            preview.src = this.value;
            preview.style.display = 'block';
            preview.onerror = () => preview.style.display = 'none';
        } else {
            preview.style.display = 'none';
        }
    });

    // 新图片预览
    document.getElementById('newImageUrl').addEventListener('input', function() {
        const preview = document.getElementById('newImagePreview');
        if (this.value) {
            preview.src = this.value;
            preview.style.display = 'block';
            preview.onerror = () => preview.style.display = 'none';
        } else {
            preview.style.display = 'none';
        }
    });
}

// 产品操作
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // 重置表单
    if (modalId === 'productModal') {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('productImagePreview').style.display = 'none';
    } else if (modalId === 'newsModal') {
        document.getElementById('newsForm').reset();
        document.getElementById('newsId').value = '';
        document.getElementById('newsImagePreview').style.display = 'none';
    }
}

function editProduct(id) {
    const product = productsData.products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productModalTitle').textContent = '编辑产品';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productNameEn').value = product.nameEn || '';
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productOrigin').value = product.origin || '';
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productPriceUnit').value = product.priceUnit;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productPdf').value = product.pdf || '';
    document.getElementById('productFeatured').checked = product.featured || false;

    // 显示预览
    if (product.image) {
        const preview = document.getElementById('productImagePreview');
        preview.src = product.image;
        preview.style.display = 'block';
    }

    openModal('productModal');
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const productData = {
        id: id || generateId(),
        name: document.getElementById('productName').value,
        nameEn: document.getElementById('productNameEn').value,
        category: document.getElementById('productCategory').value,
        origin: document.getElementById('productOrigin').value,
        price: document.getElementById('productPrice').value,
        priceUnit: document.getElementById('productPriceUnit').value,
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        pdf: document.getElementById('productPdf').value,
        featured: document.getElementById('productFeatured').checked
    };

    if (!productData.name || !productData.category) {
        showToast('请填写必填项', 'error');
        return;
    }

    if (id) {
        // 更新
        const index = productsData.products.findIndex(p => p.id === id);
        if (index !== -1) {
            productsData.products[index] = productData;
        }
    } else {
        // 新增
        productsData.products.push(productData);
    }

    saveData();
    renderProductsTable();
    updateDashboard();
    closeModal('productModal');
    showToast('产品保存成功', 'success');
    addRecentChange(id ? `更新产品: ${productData.name}` : `添加产品: ${productData.name}`);
}

function deleteProduct(id) {
    if (!confirm('确定要删除这个产品吗？')) return;

    productsData.products = productsData.products.filter(p => p.id !== id);
    saveData();
    renderProductsTable();
    updateDashboard();
    showToast('产品已删除', 'success');
    addRecentChange('删除产品');
}

// 新闻操作
function editNews(id) {
    const item = newsData.news.find(n => n.id === id);
    if (!item) return;

    document.getElementById('newsModalTitle').textContent = '编辑新闻';
    document.getElementById('newsId').value = item.id;
    document.getElementById('newsTitle').value = item.title;
    document.getElementById('newsCategory').value = item.category;
    document.getElementById('newsDate').value = item.date;
    document.getElementById('newsContent').value = item.content;
    document.getElementById('newsImage').value = item.image;

    // 显示预览
    if (item.image) {
        const preview = document.getElementById('newsImagePreview');
        preview.src = item.image;
        preview.style.display = 'block';
    }

    openModal('newsModal');
}

function saveNews() {
    const id = document.getElementById('newsId').value;
    const newsItem = {
        id: id || generateId(),
        title: document.getElementById('newsTitle').value,
        category: document.getElementById('newsCategory').value,
        date: document.getElementById('newsDate').value,
        content: document.getElementById('newsContent').value,
        image: document.getElementById('newsImage').value
    };

    if (!newsItem.title || !newsItem.category || !newsItem.content) {
        showToast('请填写必填项', 'error');
        return;
    }

    if (id) {
        const index = newsData.news.findIndex(n => n.id === id);
        if (index !== -1) {
            newsData.news[index] = newsItem;
        }
    } else {
        newsData.news.unshift(newsItem);
    }

    saveData();
    renderNewsTable();
    updateDashboard();
    closeModal('newsModal');
    showToast('新闻保存成功', 'success');
    addRecentChange(id ? `更新新闻: ${newsItem.title}` : `添加新闻: ${newsItem.title}`);
}

function deleteNews(id) {
    if (!confirm('确定要删除这条新闻吗？')) return;

    newsData.news = newsData.news.filter(n => n.id !== id);
    saveData();
    renderNewsTable();
    updateDashboard();
    showToast('新闻已删除', 'success');
    addRecentChange('删除新闻');
}

// 视频操作
function saveVideo() {
    const name = document.getElementById('videoName').value;
    const url = document.getElementById('videoUrl').value;

    if (!name || !url) {
        showToast('请填写视频名称和URL', 'error');
        return;
    }

    if (!mediaData.videos) mediaData.videos = [];

    mediaData.videos.push({
        name: name,
        url: url,
        thumbnail: document.getElementById('videoThumbnail').value
    });

    saveData();
    renderVideosList();
    updateDashboard();
    closeModal('videoModal');
    document.getElementById('videoName').value = '';
    document.getElementById('videoUrl').value = '';
    document.getElementById('videoThumbnail').value = '';
    showToast('视频添加成功', 'success');
    addRecentChange(`添加视频: ${name}`);
}

function deleteVideo(name) {
    if (!confirm('确定要删除这个视频吗？')) return;

    mediaData.videos = mediaData.videos.filter(v => v.name !== name);
    saveData();
    renderVideosList();
    updateDashboard();
    showToast('视频已删除', 'success');
    addRecentChange('删除视频');
}

// 图片操作
function addImageUrl() {
    const name = document.getElementById('newImageName').value;
    const url = document.getElementById('newImageUrl').value;

    if (!name || !url) {
        showToast('请填写图片名称和URL', 'error');
        return;
    }

    if (!mediaData.images) mediaData.images = [];

    mediaData.images.push({ name, url });
    saveData();
    renderImagesList();
    updateDashboard();

    document.getElementById('newImageName').value = '';
    document.getElementById('newImageUrl').value = '';
    document.getElementById('newImagePreview').style.display = 'none';

    showToast('图片添加成功', 'success');
    addRecentChange(`添加图片: ${name}`);
}

function deleteImage(name) {
    if (!confirm('确定要删除这个图片吗？')) return;

    mediaData.images = mediaData.images.filter(i => i.name !== name);
    saveData();
    renderImagesList();
    updateDashboard();
    showToast('图片已删除', 'success');
    addRecentChange('删除图片');
}

// PDF操作
function addPdfUrl() {
    const name = document.getElementById('newPdfName').value;
    const url = document.getElementById('newPdfUrl').value;
    const productId = document.getElementById('newPdfProduct').value;

    if (!name || !url) {
        showToast('请填写PDF名称和URL', 'error');
        return;
    }

    if (!mediaData.pdfs) mediaData.pdfs = [];

    mediaData.pdfs.push({ name, url });

    // 如果关联了产品，更新产品数据
    if (productId) {
        const product = productsData.products.find(p => p.id === productId);
        if (product) {
            product.pdf = url;
        }
    }

    saveData();
    renderPdfsTable();
    renderProductsTable();
    updateDashboard();

    document.getElementById('newPdfName').value = '';
    document.getElementById('newPdfUrl').value = '';
    document.getElementById('newPdfProduct').value = '';

    showToast('PDF添加成功', 'success');
    addRecentChange(`添加PDF: ${name}`);
}

function editPdf(name) {
    const pdf = mediaData.pdfs.find(p => p.name === name);
    if (!pdf) return;

    document.getElementById('pdfId').value = name;
    document.getElementById('pdfName').value = pdf.name;
    document.getElementById('pdfUrl').value = pdf.url;

    openModal('pdfModal');
}

function savePdf() {
    const oldName = document.getElementById('pdfId').value;
    const name = document.getElementById('pdfName').value;
    const url = document.getElementById('pdfUrl').value;

    if (!name || !url) {
        showToast('请填写PDF名称和URL', 'error');
        return;
    }

    const index = mediaData.pdfs.findIndex(p => p.name === oldName);
    if (index !== -1) {
        mediaData.pdfs[index] = { name, url };
    }

    saveData();
    renderPdfsTable();
    updateDashboard();
    closeModal('pdfModal');
    showToast('PDF保存成功', 'success');
    addRecentChange(`更新PDF: ${name}`);
}

function deletePdf(name) {
    if (!confirm('确定要删除这个PDF吗？')) return;

    mediaData.pdfs = mediaData.pdfs.filter(p => p.name !== name);
    saveData();
    renderPdfsTable();
    updateDashboard();
    showToast('PDF已删除', 'success');
    addRecentChange('删除PDF');
}

// 设置保存
function saveSettings() {
    settingsData.site = {
        name: document.getElementById('settingSiteName').value,
        nameEn: document.getElementById('settingSiteNameEn').value,
        description: document.getElementById('settingDescription').value
    };

    settingsData.hero = {
        image: document.getElementById('settingHeroImage').value
    };

    settingsData.contact = {
        address: document.getElementById('settingAddress').value,
        phone: document.getElementById('settingPhone').value,
        email: document.getElementById('settingEmail').value,
        hours: document.getElementById('settingHours').value
    };

    saveData();
    showToast('设置保存成功', 'success');
    addRecentChange('更新网站设置');
}

// 工具函数
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('链接已复制到剪贴板', 'success');
    }).catch(() => {
        showToast('复制失败', 'error');
    });
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function addRecentChange(text) {
    const container = document.getElementById('recentChanges');
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    if (container.innerHTML === '暂无最近修改记录') {
        container.innerHTML = '';
    }

    const html = `<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;">
        <span>${text}</span>
        <span style="color: #888;">${time}</span>
    </div>`;

    container.innerHTML = html + container.innerHTML;

    // 只保留最近10条
    const items = container.querySelectorAll('div');
    if (items.length > 10) {
        items[items.length - 1].remove();
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}

// 页面跳转后初始化图片预览
document.addEventListener('DOMContentLoaded', initImagePreview);