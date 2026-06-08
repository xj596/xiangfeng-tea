# 湘丰茶叶网站后台管理系统使用说明

## 系统概述

本系统为湘丰茶叶外贸网站的后台管理解决方案，包含以下功能：

1. **内容管理** - 管理产品、新闻等网站内容
2. **媒体管理** - 管理图片、视频、PDF等外链资源
3. **GitHub同步** - 将修改内容同步到GitHub仓库

## 文件结构

```
├── admin/                    # 后台管理系统
│   ├── login.html           # 登录页面
│   ├── admin.html           # 管理主页面
│   ├── admin.css            # 后台样式
│   └── admin.js             # 后台逻辑
├── data/                     # JSON数据文件
│   ├── products.json        # 产品数据
│   ├── news.json            # 新闻数据
│   ├── settings.json        # 网站设置
│   └── media.json           # 媒体资源（图片、视频、PDF外链）
├── js/
│   └── data-loader.js       # 数据加载脚本
├── products.html            # 产品中心页面（已支持PDF下载）
└── ...
```

## 快速开始

### 1. 首次使用配置

1. 访问 `admin/login.html` 页面
2. 填写GitHub Personal Access Token和仓库信息
3. 点击登录进入后台管理

### 2. 创建GitHub Personal Access Token

1. 登录GitHub
2. 进入 Settings → Developer settings → Personal access tokens
3. 点击 Generate new token (classic)
4. 设置Token名称，选择过期时间
5. 勾选以下权限：
   - `repo` (Full repository access)
   - `read:user` (Read user profile data)
6. 点击 Generate token
7. 复制生成的Token（请妥善保存，只会显示一次）

### 3. 配置仓库信息

仓库格式：`username/repository-name`
例如：`xiangfeng-tea/xiangfeng-tea.github.io`

## 功能说明

### 产品管理

- 添加、编辑、删除产品
- 设置产品名称、分类、价格、图片URL等
- 为产品关联PDF手册外链
- 标记精选产品

### 新闻管理

- 添加、编辑、删除新闻
- 设置新闻标题、分类、日期、内容、图片

### 图片管理

- 添加图片外链URL（R2生成的URL）
- 复制图片链接
- 删除不再使用的图片

### 视频管理

- 添加视频外链URL
- 设置视频名称和封面图

### PDF管理

- 添加产品手册PDF外链
- 将PDF关联到具体产品
- 在产品页面显示下载按钮

### 网站设置

- 修改网站基本信息
- 更新联系方式

### 同步到GitHub

点击"同步到GitHub"按钮，将本地修改同步到GitHub仓库。

## 外链资源管理（R2）

### 上传流程

1. 将图片/视频/PDF上传到Cloudflare R2存储桶
2. 复制R2生成的公共URL
3. 在后台管理系统的对应模块中添加外链URL

### R2 URL格式

```
https://your-bucket.your-account.r2.dev/filename.jpg
```

### 注意事项

- 所有图片、视频、PDF必须使用外链URL
- 不支持直接上传文件到GitHub仓库
- 建议在R2中创建不同的文件夹分类管理资源：
  - `/images/` - 产品图片
  - `/videos/` - 视频文件
  - `/pdfs/` - 产品手册PDF

## 数据存储

系统采用本地存储 + GitHub同步的方案：

1. **本地存储 (localStorage)**：在浏览器中临时保存数据
2. **GitHub存储**：将数据同步到GitHub仓库的JSON文件

每次修改后，建议点击"同步到GitHub"按钮保存数据。

## 部署说明

### 推送代码到GitHub

```bash
git add .
git commit -m "添加后台管理系统"
git push origin main
```

### 访问后台管理

网站上线后，访问：`https://your-username.github.io/admin/login.html`

## 故障排除

### 无法登录

- 检查GitHub Token是否正确
- 检查仓库名称是否正确
- 确保Token有repo权限

### 数据无法同步

- 检查网络连接
- 确认GitHub Token未过期
- 检查仓库权限设置

### 产品图片不显示

- 检查图片外链URL是否正确
- 确认R2存储桶设置为公开访问
- 验证图片URL可以直接访问

## 技术支持

如有问题，请联系技术支持。

---

*最后更新：2024年*
