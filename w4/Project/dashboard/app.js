/* ============================================
   منطق صفحه داشبورد
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    // ---- ارجاعات DOM ----
    const pageLoader = document.getElementById("page-loader");
    const userNameEl = document.getElementById("user-display-name");
    const userRoleEl = document.getElementById("user-role");
    const avatarImg = document.getElementById("user-avatar-img");
    const avatarInitials = document.getElementById("avatar-initials");
    const productMenuBtn = document.getElementById("product-menu-btn");
    const productSubmenu = document.getElementById("product-submenu");
    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const toastContainer = document.getElementById("toast-container");
    const statTotal = document.getElementById("stat-total");
    const statActive = document.getElementById("stat-active");
    const statPending = document.getElementById("stat-pending");


    // ---- زیرمنوی محصولات ----
    if (productMenuBtn && productSubmenu) {
        productMenuBtn.addEventListener("click", () => {
            productMenuBtn.classList.toggle("open");
            productSubmenu.classList.toggle("open");
        });
    }


    // ---- منوی موبایل ----
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });

        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove("mobile-open");
            }
        });
    }


    // ---- تبدیل رقم انگلیسی به فارسی ----
    function toPersianDigits(num) {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
    }


    // ---- انیمیشن شمارش عدد ----
    function animateNumber(element, target, duration = 1100) {
        if (typeof target !== "number" || target < 0) {
            element.textContent = "۰";
            return;
        }

        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);

            element.textContent = toPersianDigits(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }


    // ---- استخراج حروف اول نام ----
    function extractInitials(name) {
        if (!name || !name.trim()) return "؟";
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return parts[0][0] + parts[1][0];
        }
        return parts[0].substring(0, 2);
    }


    // ---- تنظیم آواتار ----
    function setupAvatar(user) {
        if (user.avatar && user.avatar.trim() !== "") {
            avatarImg.src = user.avatar;
            avatarImg.style.display = "block";
            avatarInitials.style.display = "none";

            // اگر عکس لود نشد → فال‌بک به حروف اول نام
            avatarImg.onerror = () => {
                avatarImg.style.display = "none";
                avatarInitials.textContent = extractInitials(user.name);
                avatarInitials.style.display = "block";
            };
        } else {
            // بدون آواتار → حروف اول نام
            avatarImg.style.display = "none";
            avatarInitials.textContent = extractInitials(user.name);
            avatarInitials.style.display = "block";
        }
    }


    // ---- نمایش تاست ----
    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("removing");
            toast.addEventListener("animationend", () => toast.remove());
        }, 3500);
    }


    // ---- مخفی کردن لودر ----
    function hideLoader() {
        if (pageLoader) {
            pageLoader.classList.add("hidden");
            setTimeout(() => pageLoader.remove(), 600);
        }
    }


    // ---- داده‌های جایگزین آفلاین ----
    function setFallbackData() {
        userNameEl.textContent = "شرکت نمونه (دمو)";
        avatarImg.style.display = "none";
        avatarInitials.textContent = extractInitials("شرکت نمونه");
        avatarInitials.style.display = "block";

        setTimeout(() => {
            animateNumber(statTotal, 0, 800);
            animateNumber(statActive, 0, 800);
            animateNumber(statPending, 0, 800);
        }, 200);
    }


    // ---- بارگذاری اصلی داشبورد ----
    async function loadDashboard() {
        try {
            const response = await API_CONFIG.sendRequest("dashboard/init/");

            if (response.status === "success" && response.data) {
                const { user, stats } = response.data;

                // اطلاعات کاربر
                if (user) {
                    userNameEl.textContent = user.name || "نامشخص";
                    if (user.role) userRoleEl.textContent = user.role;
                    setupAvatar(user);
                }

                // آمار با انیمیشن شمارش
                if (stats) {
                    setTimeout(() => {
                        animateNumber(statTotal, stats.total_products, 1200);
                        animateNumber(statActive, stats.active_warranties, 1400);
                        animateNumber(statPending, stats.pending_activations, 1000);
                    }, 200);
                }

            } else {
                showToast(response.message || "خطا در دریافت اطلاعات", "error");
                setFallbackData();
            }

        } catch (error) {
            console.error("خطا در بارگذاری داشبورد:", error);
            showToast("اتصال برقرار نشد — حالت آفلاین", "warning");
            setFallbackData();
        } finally {
            hideLoader();
        }
    }


    // ---- شروع ----
    loadDashboard();

});