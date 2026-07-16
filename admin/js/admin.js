/**
 * admin.js — 后台公共脚本
 *
 * 功能：
 *  - 图片上传预览
 *  - 删除确认弹窗
 *  - 移动端侧边栏切换
 *  - 表单未保存提示
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== 移动端侧边栏切换 ===== */
    var mobileToggle = document.querySelector('.mobile-toggle');
    var sidebar = document.querySelector('.sidebar');

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
        });

        // 点击主内容区关闭侧边栏
        document.querySelector('.main-content')?.addEventListener('click', function () {
            sidebar.classList.remove('show');
        });
    }

    /* ===== 图片上传预览 ===== */
    document.querySelectorAll('input[type="file"][data-preview]').forEach(function (input) {
        input.addEventListener('change', function () {
            var previewId = input.getAttribute('data-preview');
            var preview = document.getElementById(previewId);
            if (!preview) return;

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    preview.innerHTML = '<img src="' + e.target.result + '" alt="预览">';
                };
                reader.readAsDataURL(input.files[0]);
            }
        });
    });

    /* ===== 删除确认 ===== */
    document.querySelectorAll('[data-confirm]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            var msg = el.getAttribute('data-confirm');
            if (!confirm(msg)) {
                e.preventDefault();
            }
        });
    });

    /* ===== 表单提交时删除未保存提示 ===== */
    var formModified = false;
    document.querySelectorAll('form[data-dirty-check]').forEach(function (form) {
        form.addEventListener('input', function () {
            formModified = true;
        });
        form.addEventListener('submit', function () {
            formModified = false;
        });
    });

    window.addEventListener('beforeunload', function (e) {
        if (formModified) {
            e.preventDefault();
            e.returnValue = '您有未保存的更改，确定要离开吗？';
        }
    });

    /* ===== 自动消失提示 ===== */
    var alerts = document.querySelectorAll('.alert[data-auto-dismiss]');
    alerts.forEach(function (alert) {
        setTimeout(function () {
            alert.style.transition = 'opacity 0.5s';
            alert.style.opacity = '0';
            setTimeout(function () {
                alert.remove();
            }, 500);
        }, 4000);
    });
});

/**
 * 打开模态框
 */
function openModal(id) {
    var modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('show');
    }
}

/**
 * 关闭模态框
 */
function closeModal(id) {
    var modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * 填充编辑表单数据
 */
function fillEditForm(formId, data) {
    var form = document.getElementById(formId);
    if (!form) return;

    Object.keys(data).forEach(function (key) {
        var field = form.querySelector('[name="' + key + '"]');
        if (field) {
            field.value = data[key];
        }
    });

    // 更新图片预览
    if (data.image_url) {
        var preview = form.querySelector('.image-preview');
        if (preview) {
            preview.innerHTML = '<img src="' + data.image_url + '" alt="预览">';
        }
    }
}
