document.addEventListener("DOMContentLoaded", () => {
    const pageLoader = document.getElementById("page-loader");
    const userNameEl = document.getElementById("user-display-name");
    const userCompanyNameEl = document.getElementById("user-company-name");
    const userRoleEl = document.getElementById("user-role");
    const avatarImg = document.getElementById("user-avatar-img");
    const avatarInitials = document.getElementById("avatar-initials");
    const productMenuBtn = document.getElementById("product-menu-btn");
    const productSubmenu = document.getElementById("product-submenu");
    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const toastContainer = document.getElementById("toast-container");
    const statTotal = document.getElementById("stat-total");
    const statActive = document.getElementById("stat-active");
    const statPending = document.getElementById("stat-pending");
    const themeToggle = document.getElementById("theme-toggle");
    const statusIndicator = document.getElementById("company-status"); // ✅ جدید

    // ==========================================
    // منطق تم (استفاده از documentElement به جای body)
    // ==========================================
    if (localStorage.getItem("app_theme") === "light") {
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
        document.documentElement.classList.toggle("theme-light");
        localStorage.setItem("app_theme", themeToggle.checked ? "light" : "dark");
    });

    // ==========================================
    // منوی موبایل و اورلی
    // ==========================================
    function toggleMobileMenu(close) {
        const isOpen = sidebar.classList.contains("mobile-open");
        if (close || isOpen) {
            sidebar.classList.remove("mobile-open");
            sidebarOverlay.classList.remove("active");
            document.body.style.overflow = "";
        } else {
            sidebar.classList.add("mobile-open");
            sidebarOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }
    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", () => toggleMobileMenu(true));

    // زیرمنو
    if (productMenuBtn && productSubmenu) {
        productMenuBtn.addEventListener("click", () => {
            productMenuBtn.classList.toggle("open");
            productSubmenu.classList.toggle("open");
        });
    }

    // ==========================================
    // توابع کمکی
    // ==========================================
    function toPersianDigits(num) { return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]); }

    function animateNumber(el, target, duration = 1100) {
        if (typeof target !== "number" || target < 0) { el.textContent = "۰"; return; }
        const start = performance.now();
        (function update(now) {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = toPersianDigits(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(update);
        })(start);
    }

    function extractInitials(n) {
        if (!n) return "؟";
        const p = n.trim().split(/\s+/);
        return p.length >= 2 ? p[0][0] + p[1][0] : p[0].substring(0, 2);
    }

    function setupAvatar(user) {
        if (user.avatar && user.avatar.trim()) {
            avatarImg.src = user.avatar;
            avatarImg.style.display = "block";
            avatarInitials.style.display = "none";
            avatarImg.onerror = () => {
                avatarImg.style.display = "none";
                avatarInitials.textContent = extractInitials(user.name);
                avatarInitials.style.display = "block";
            };
        } else {
            avatarImg.style.display = "none";
            avatarInitials.textContent = extractInitials(user.name);
            avatarInitials.style.display = "block";
        }
    }

    // ✅ تابع جدید برای نمایش وضعیت فروشگاه
    function setupCompanyStatus(status) {
        const dot = statusIndicator.querySelector(".status-dot");
        const text = statusIndicator.querySelector(".status-text");

        // حذف کلاس‌های قبلی
        statusIndicator.classList.remove("active", "pending");

        if (status === "active") {
            statusIndicator.classList.add("active");
            text.textContent = "فعال";
        } else if (status === "deactive") {
            statusIndicator.classList.add("pending");
            text.textContent = "در انتظار تایید";
        } else {
            statusIndicator.classList.add("pending");
            text.textContent = "نامشخص";
        }
    }

    function showToast(msg, type = "success") {
        const t = document.createElement("div");
        t.className = `toast ${type}`;
        t.textContent = msg;
        toastContainer.appendChild(t);
        setTimeout(() => {
            t.classList.add("removing");
            t.addEventListener("animationend", () => t.remove());
        }, 3500);
    }

    function hideLoader() {
        if (pageLoader) {
            pageLoader.classList.add("hidden");
            setTimeout(() => pageLoader.remove(), 600);
        }
    }

    // ==========================================
    // بارگذاری داده‌ها
    // ==========================================
    async function loadDashboard() {
        try {
            const res = await API_CONFIG.sendRequest("dashboard/init/");
            if (res.status === "success" && res.data) {
                const { user, stats } = res.data;
                if (user) {
                    userNameEl.textContent = user.name || "نامشخص";

                    // نمایش نام شرکت زیر اسم کاربر
                    if (user.company_name) {
                        userCompanyNameEl.textContent = user.company_name;
                        userCompanyNameEl.style.display = "block";
                    } else {
                        userCompanyNameEl.style.display = "none";
                    }

                    if (user.role) userRoleEl.textContent = user.role;
                    setupAvatar(user);

                    // ✅ نمایش وضعیت فروشگاه
                    if (user.company_status) {
                        setupCompanyStatus(user.company_status);
                    } else {
                        setupCompanyStatus("deactive");
                    }
                }
                if (stats) {
                    setTimeout(() => {
                        animateNumber(statTotal, stats.total_products, 1200);
                        animateNumber(statActive, stats.active_warranties, 1400);
                        animateNumber(statPending, stats.pending_activations, 1000);
                    }, 200);
                }
            } else {
                showToast(res.message || "خطا در دریافت اطلاعات", "error");
                setFallback();
            }
        } catch (e) {
            console.error(e);
            showToast("اتصال برقرار نشد.", "warning");
            setFallback();
        } finally {
            hideLoader();
        }
    }

    function setFallback() {
        userNameEl.textContent = "شرکت نمونه (دمو)";
        userCompanyNameEl.textContent = "شرکت نمونه (دمو)";
        userCompanyNameEl.style.display = "block";
        avatarImg.style.display = "none";
        avatarInitials.textContent = extractInitials("شرکت نمونه");
        avatarInitials.style.display = "block";
        setupCompanyStatus("deactive");
        setTimeout(() => {
            animateNumber(statTotal, 0, 800);
            animateNumber(statActive, 0, 800);
            animateNumber(statPending, 0, 800);
        }, 200);
    }

    loadDashboard();
});