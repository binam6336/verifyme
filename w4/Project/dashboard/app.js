// dashboard/app.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("صفحه لود شد. درحال راه‌اندازی منو...");
    initSubmenu();

    try {
        loadDashboardData();
    } catch (e) {
        console.warn("خطا در لود دیتای بک‌اند:", e);
    }
});

function initSubmenu() {
    const btn = document.getElementById("product-menu-btn");
    const submenu = document.getElementById("product-submenu");

    if (btn && submenu) {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            submenu.classList.toggle("show");

            const arrow = btn.querySelector(".arrow");
            if (arrow) {
                arrow.textContent = submenu.classList.contains("show") ? "▲" : "▼";
            }
        });
    }
}

async function loadDashboardData() {
    if (typeof API_CONFIG === 'undefined') {
        console.warn("فایل api-config.js لود نشده است. استفاده از دیتای آفلاین.");
        renderDashboard({
            user: { name: "تولیدکننده نمونه (آفلاین)", role: "مدیر شرکت", avatar: "" },
            stats: { total_products: 500, active_warranties: 150, pending_activations: 350 }
        });
        return;
    }

    const mockToken = "SESSION_TOKEN_123456";
    const response = await API_CONFIG.sendRequest(
        API_CONFIG.ENDPOINTS.DASHBOARD_INIT,
        { token: mockToken }
    );

    if (response && response.status === "success" && response.data) {
        renderDashboard(response.data);
    }
}

function renderDashboard(data) {
    if (document.getElementById("user-display-name")) document.getElementById("user-display-name").textContent = data.user.name;
    if (document.getElementById("user-role")) document.getElementById("user-role").textContent = data.user.role;

    // مدیریت و رندر هوشمند آواتار از API
    const avatarImg = document.getElementById("user-avatar-img");
    const avatarContainer = document.getElementById("avatar-container");

    if (avatarImg && avatarContainer) {
        if (data.user && data.user.avatar && data.user.avatar.trim() !== "") {
            // اگر آدرس معتبر بود متن را پاک کرده و تصویر را فعال میکنیم
            avatarContainer.textContent = "";
            avatarContainer.appendChild(avatarImg);
            avatarImg.src = data.user.avatar;
            avatarImg.style.display = "block";
        } else {
            // اگر عکسی از سمت سرور نیامد، حرف اول نام شرکت رندر می‌شود
            avatarImg.style.display = "none";
            avatarContainer.textContent = data.user.name ? data.user.name.charAt(0) : "G";
            avatarContainer.style.color = "#fff";
        }
    }

    // رندر اعداد آمار با فرمت یونیکد فارسی
    if (data.stats) {
        if (document.getElementById("stat-total") && data.stats.total_products !== undefined) {
            document.getElementById("stat-total").textContent = data.stats.total_products.toLocaleString('fa-IR');
        }
        if (document.getElementById("stat-active") && data.stats.active_warranties !== undefined) {
            document.getElementById("stat-active").textContent = data.stats.active_warranties.toLocaleString('fa-IR');
        }
        if (document.getElementById("stat-pending") && data.stats.pending_activations !== undefined) {
            document.getElementById("stat-pending").textContent = data.stats.pending_activations.toLocaleString('fa-IR');
        }
    }
}