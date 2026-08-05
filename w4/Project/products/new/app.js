document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const submitBtn = document.getElementById("submit-btn");
    const toastContainer = document.getElementById("toast-container");
    const avatarImg = document.getElementById("user-avatar-img");
    const avatarInitials = document.getElementById("avatar-initials");
    const themeToggle = document.getElementById("theme-toggle");
    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const productMenuBtn = document.getElementById("product-menu-btn");
    const productSubmenu = document.getElementById("product-submenu");

    // ==========================================
    // منطق تم
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
            sidebar.classList.remove("mobile-open"); sidebarOverlay.classList.remove("active"); document.body.style.overflow = "";
        } else {
            sidebar.classList.add("mobile-open"); sidebarOverlay.classList.add("active"); document.body.style.overflow = "hidden";
        }
    }
    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMobileMenu(); });
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", () => toggleMobileMenu(true));

    // زیرمنو
    if (productMenuBtn && productSubmenu) {
        productMenuBtn.addEventListener("click", () => { productMenuBtn.classList.toggle("open"); productSubmenu.classList.toggle("open"); });
    }

    // ==========================================
    // توابع کمکی
    // ==========================================
    function extractInitials(n) {
        if (!n) return "؟";
        const p = n.trim().split(/\s+/);
        return p.length >= 2 ? p[0][0] + p[1][0] : p[0].substring(0, 2);
    }

    function showToast(message, type = "success") {
        const toast = document.createElement("div"); toast.className = `toast ${type}`; toast.textContent = message; toastContainer.appendChild(toast);
        setTimeout(() => { toast.classList.add("removing"); toast.addEventListener("animationend", () => toast.remove()); }, 4000);
    }

    function toggleLoading(isLoading) {
        if (isLoading) { submitBtn.classList.add("loading"); submitBtn.disabled = true; }
        else { submitBtn.classList.remove("loading"); submitBtn.disabled = false; }
    }

    // ==========================================
    // دریافت مستقیم آواتار از API (بدون وابستگی به localStorage)
    // ==========================================
    async function loadAvatar() {
        try {
            const response = await API_CONFIG.sendRequest("dashboard/init/");

            if (response.status === "success" && response.data && response.data.user) {
                const user = response.data.user;

                if (user.avatar && user.avatar.trim() && avatarImg) {
                    avatarImg.src = user.avatar;
                    avatarImg.style.display = "block";
                    avatarInitials.style.display = "none";

                    // اگر عکس لود نشد، فال‌بک به حروف اول نام
                    avatarImg.onerror = () => {
                        avatarImg.style.display = "none";
                        avatarInitials.textContent = extractInitials(user.name);
                        avatarInitials.style.display = "block";
                    };
                } else {
                    // بدون آواتار -> حروف اول نام
                    avatarImg.style.display = "none";
                    avatarInitials.textContent = extractInitials(user.name);
                    avatarInitials.style.display = "block";
                }
            }
        } catch (error) {
            console.error("خطا در دریافت اطلاعات کاربر:", error);
            // در صورت خطا، حروف اول رو نشون بده
            avatarInitials.textContent = "؟";
            avatarInitials.style.display = "block";
        }
    }

    // ==========================================
    // فرم ثبت محصول
    // ==========================================
    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const payload = {
            product_name: document.getElementById("product_name").value.trim(),
            category: document.getElementById("category").value.trim(),
            brand: document.getElementById("brand").value.trim()
        };

        if (!payload.product_name || !payload.category || !payload.brand) {
            showToast("لطفاً تمام فیلدها را پر کنید.", "error"); return;
        }

        toggleLoading(true);
        try {
            const response = await API_CONFIG.sendRequest("products/create/", payload);
            if (response.status === "success") {
                const productId = response.data?.product_id;
                const successMsg = productId ? `محصول با موفقیت ثبت شد (کد: ${productId}).` : (response.message || "محصول با موفقیت ثبت شد.");
                showToast(successMsg, "success");
                productForm.reset();
            } else {
                showToast(response.message || "خطایی در ثبت محصول رخ داد.", "error");
            }
        } catch (error) {
            console.error("خطا در ارسال فرم:", error);
            showToast("اتصال برقرار نشد. لطفاً دوباره تلاش کنید.", "warning");
        } finally {
            toggleLoading(false);
        }
    });

    // ==========================================
    // اجرای اولیه
    // ==========================================
    loadAvatar();
});