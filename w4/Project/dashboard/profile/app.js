document.addEventListener("DOMContentLoaded", () => {
    // المنت‌ها
    const $ = id => document.getElementById(id);
    const pageLoader = $("page-loader");
    const userNameEl = $("user-display-name");
    const userCompanyNameEl = $("user-company-name");
    const userRoleEl = $("user-role");
    const avatarImg = $("user-avatar-img");
    const avatarInitials = $("avatar-initials");
    const themeToggle = $("theme-toggle");
    const statusIndicator = $("company-status");
    const profileForm = $("profile-form");
    const submitBtn = $("submit-btn");
    const fullNameEl = $("full_name");
    const companyNameEl = $("company_name");
    const emailEl = $("email");
    const mobileEl = $("mobile");
    const passwordEl = $("password");
    const confirmPasswordEl = $("confirm_password");
    const profileAvatarImg = $("profile-avatar-img");
    const profileAvatarInitials = $("profile-avatar-initials");
    const changeAvatarBtn = $("change-avatar-btn");
    const avatarUpload = $("avatar-upload");
    const toastContainer = $("toast-container");

    // ===== تم =====
    if (localStorage.getItem("app_theme") === "light") {
        document.documentElement.classList.add("theme-light");
        themeToggle.checked = true;
    }
    themeToggle.addEventListener("change", function () {
        document.documentElement.classList.toggle("theme-light");
        localStorage.setItem("app_theme", this.checked ? "light" : "dark");
    });

    // ===== منو =====
    function toggleMobileMenu(close) {
        const sidebar = $("sidebar");
        const overlay = $("sidebar-overlay");
        if (close || sidebar.classList.contains("mobile-open")) {
            sidebar.classList.remove("mobile-open");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        } else {
            sidebar.classList.add("mobile-open");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }
    $("mobile-menu-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    $("sidebar-overlay")?.addEventListener("click", () => toggleMobileMenu(true));

    // زیرمنو
    const productMenuBtn = $("product-menu-btn");
    const productSubmenu = $("product-submenu");
    if (productMenuBtn && productSubmenu) {
        productMenuBtn.addEventListener("click", () => {
            productMenuBtn.classList.toggle("open");
            productSubmenu.classList.toggle("open");
        });
    }

    // ===== توابع کمکی =====
    function showToast(msg, type = "success") {
        const t = document.createElement("div");
        t.className = `toast ${type}`;
        t.textContent = msg;
        toastContainer.appendChild(t);
        setTimeout(() => {
            t.classList.add("removing");
            t.addEventListener("animationend", () => t.remove());
        }, 4000);
    }

    function toggleLoading(isLoading) {
        submitBtn.classList.toggle("loading", isLoading);
        submitBtn.disabled = isLoading;
    }

    function hideLoader() {
        if (pageLoader) {
            pageLoader.classList.add("hidden");
            setTimeout(() => pageLoader.remove(), 600);
        }
    }

    function setupAvatar(user) {
        const url = user.avatar || "";
        const name = user.name || "کاربر";
        const initials = name.split(" ").map(w => w[0]).join("").substring(0, 2);

        [avatarImg, profileAvatarImg].forEach(img => {
            if (url) {
                img.src = url;
                img.style.display = "block";
                img.onerror = () => {
                    img.style.display = "none";
                    img.parentElement.querySelector("span").style.display = "block";
                };
            } else {
                img.style.display = "none";
            }
        });

        [avatarInitials, profileAvatarInitials].forEach(el => {
            el.textContent = initials;
            el.style.display = url ? "none" : "block";
        });
    }

    // ✅ تابع نمایش وضعیت فروشگاه (مثل داشبورد)
    function setupCompanyStatus(status) {
        // اگر المنت وجود نداشت، خارج شو
        if (!statusIndicator) return;

        const dot = statusIndicator.querySelector(".status-dot");
        const text = statusIndicator.querySelector(".status-text");

        // حذف کلاس‌های قبلی
        statusIndicator.classList.remove("active", "pending");

        // تنظیم وضعیت
        if (status === "active") {
            statusIndicator.classList.add("active");
            if (text) text.textContent = "فعال";
        } else {
            statusIndicator.classList.add("pending");
            if (text) text.textContent = "در انتظار تایید";
        }
    }

    function fillForm(user) {
        fullNameEl.value = user.name || "";
        companyNameEl.value = user.company_name || "";
        emailEl.value = user.email || "";
        mobileEl.value = user.mobile || "";
        userRoleEl.textContent = user.role || "تولیدکننده";
        userNameEl.textContent = user.name || "نامشخص";
        userCompanyNameEl.textContent = user.company_name || "";
        userCompanyNameEl.style.display = user.company_name ? "block" : "none";

        // ✅ نمایش وضعیت فروشگاه در هدر
        if (user.company_status) {
            setupCompanyStatus(user.company_status);
        } else {
            setupCompanyStatus("deactive"); // مقدار پیش‌فرض
        }
    }

    // ===== بارگذاری با API جدید =====
    async function loadProfile() {
        try {
            const res = await API_CONFIG.getProfile();
            if (res.status === "success" && res.data?.user) {
                const user = res.data.user;
                fillForm(user);
                setupAvatar(user);
                // fillForm قبلاً setupCompanyStatus رو صدا زده، ولی برای اطمینان دوباره صدا می‌زنیم
                setupCompanyStatus(user.company_status || "deactive");
            } else {
                showToast(res.message || "خطا در دریافت اطلاعات", "error");
            }
        } catch (e) {
            showToast("اتصال برقرار نشد.", "warning");
        } finally {
            hideLoader();
        }
    }

    // ===== ارسال فرم =====
    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const password = passwordEl.value.trim();
        const confirm = confirmPasswordEl.value.trim();

        if (password && password !== confirm) {
            showToast("رمز عبور و تکرار آن مطابقت ندارند.", "error");
            return;
        }
        if (password && password.length < 6) {
            showToast("رمز عبور باید حداقل ۶ کاراکتر باشد.", "error");
            return;
        }

        const payload = {
            name: fullNameEl.value.trim(),
            company_name: companyNameEl.value.trim(),
            email: emailEl.value.trim(),
            mobile: mobileEl.value.trim(),
        };
        if (password) payload.password = password;

        toggleLoading(true);
        try {
            const res = await API_CONFIG.updateProfile(payload);
            if (res.status === "success") {
                showToast(res.message || "پروفایل به‌روزرسانی شد.", "success");
                if (res.data?.user) {
                    const updatedUser = res.data.user;
                    fillForm(updatedUser);
                    setupAvatar(updatedUser);
                    setupCompanyStatus(updatedUser.company_status || "deactive");
                }
                passwordEl.value = "";
                confirmPasswordEl.value = "";
            } else {
                const err = res.errors ? Object.values(res.errors)[0] : res.message;
                showToast(err || "خطا در به‌روزرسانی", "error");
            }
        } catch (e) {
            showToast("اتصال برقرار نشد.", "warning");
        } finally {
            toggleLoading(false);
        }
    });

    // ===== آواتار =====
    changeAvatarBtn?.addEventListener("click", () => avatarUpload.click());
    avatarUpload?.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
            showToast("فایل نامعتبر است.", "error");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const data = ev.target.result;
            avatarImg.src = data;
            avatarImg.style.display = "block";
            avatarInitials.style.display = "none";
            profileAvatarImg.src = data;
            profileAvatarImg.style.display = "block";
            profileAvatarInitials.style.display = "none";
            showToast("آواتار آپلود شد.", "success");
        };
        reader.readAsDataURL(file);
    });

    loadProfile();
});