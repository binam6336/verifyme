document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // المنت‌های اصلی (مثل داشبورد)
    // ==========================================
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
    const themeToggle = document.getElementById("theme-toggle");
    const statusIndicator = document.getElementById("company-status");

    // المنت‌های پروفایل
    const profileForm = document.getElementById("profile-form");
    const submitBtn = document.getElementById("submit-btn");
    const firstNameEl = document.getElementById("first_name");
    const lastNameEl = document.getElementById("last_name");
    const companyNameEl = document.getElementById("company_name");
    const emailEl = document.getElementById("email");
    const mobileEl = document.getElementById("mobile");
    const passwordEl = document.getElementById("password");
    const confirmPasswordEl = document.getElementById("confirm_password");

    // المنت‌های آواتار (هدر و پروفایل)
    const profileAvatarImg = document.getElementById("profile-avatar-img");
    const profileAvatarInitials = document.getElementById("profile-avatar-initials");
    const changeAvatarBtn = document.getElementById("change-avatar-btn");
    const avatarUpload = document.getElementById("avatar-upload");

    // ==========================================
    // ✅ منطق تم (دقیقاً مثل داشبورد)
    // ==========================================
    if (localStorage.getItem("app_theme") === "light") {
        document.documentElement.classList.add("theme-light");
        themeToggle.checked = true;
    } else {
        document.documentElement.classList.remove("theme-light");
        themeToggle.checked = false;
    }

    themeToggle.addEventListener("change", function () {
        if (this.checked) {
            document.documentElement.classList.add("theme-light");
            localStorage.setItem("app_theme", "light");
        } else {
            document.documentElement.classList.remove("theme-light");
            localStorage.setItem("app_theme", "dark");
        }
    });

    // ==========================================
    // منوی موبایل و اورلی (مثل داشبورد)
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

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => toggleMobileMenu(true));
    }

    // زیرمنو
    if (productMenuBtn && productSubmenu) {
        productMenuBtn.addEventListener("click", () => {
            productMenuBtn.classList.toggle("open");
            productSubmenu.classList.toggle("open");
        });
    }

    // ==========================================
    // توابع کمکی (مثل داشبورد)
    // ==========================================
    function extractInitials(firstName, lastName) {
        if (!firstName && !lastName) return "؟";
        if (firstName && lastName) return firstName[0] + lastName[0];
        if (firstName) return firstName.substring(0, 2);
        return "؟";
    }

    function setupAvatar(user) {
        const avatarUrl = user.avatar || "";

        // آواتار هدر
        if (avatarUrl && avatarUrl.trim()) {
            avatarImg.src = avatarUrl;
            avatarImg.style.display = "block";
            avatarInitials.style.display = "none";
            avatarImg.onerror = () => {
                avatarImg.style.display = "none";
                avatarInitials.textContent = extractInitials(user.first_name, user.last_name);
                avatarInitials.style.display = "block";
            };
        } else {
            avatarImg.style.display = "none";
            avatarInitials.textContent = extractInitials(user.first_name, user.last_name);
            avatarInitials.style.display = "block";
        }

        // آواتار بزرگ پروفایل
        if (avatarUrl && avatarUrl.trim()) {
            profileAvatarImg.src = avatarUrl;
            profileAvatarImg.style.display = "block";
            profileAvatarInitials.style.display = "none";
            profileAvatarImg.onerror = () => {
                profileAvatarImg.style.display = "none";
                profileAvatarInitials.textContent = extractInitials(user.first_name, user.last_name);
                profileAvatarInitials.style.display = "block";
            };
        } else {
            profileAvatarImg.style.display = "none";
            profileAvatarInitials.textContent = extractInitials(user.first_name, user.last_name);
            profileAvatarInitials.style.display = "block";
        }
    }

    function setupCompanyStatus(status) {
        const dot = statusIndicator.querySelector(".status-dot");
        const text = statusIndicator.querySelector(".status-text");

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

    function fillForm(user) {
        firstNameEl.value = user.first_name || "";
        lastNameEl.value = user.last_name || "";
        companyNameEl.value = user.company_name || "";
        emailEl.value = user.email || "";
        mobileEl.value = user.mobile || "";
        if (user.role) userRoleEl.textContent = user.role;
    }

    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add("removing");
            toast.addEventListener("animationend", () => toast.remove());
        }, 4000);
    }

    function toggleLoading(isLoading) {
        if (isLoading) {
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove("loading");
            submitBtn.disabled = false;
        }
    }

    function hideLoader() {
        if (pageLoader) {
            pageLoader.classList.add("hidden");
            setTimeout(() => pageLoader.remove(), 600);
        }
    }

    // ==========================================
    // بارگذاری اطلاعات پروفایل از API (init)
    // ==========================================
    async function loadProfile() {
        try {
            const res = await API_CONFIG.sendRequest("dashboard/init/", {});
            if (res.status === "success" && res.data) {
                const { user } = res.data;
                if (user) {
                    // نمایش نام و شرکت در هدر
                    userNameEl.textContent = user.name || "نامشخص";
                    if (user.company_name) {
                        userCompanyNameEl.textContent = user.company_name;
                        userCompanyNameEl.style.display = "block";
                    } else {
                        userCompanyNameEl.style.display = "none";
                    }

                    fillForm(user);
                    setupAvatar(user);
                    if (user.company_status) {
                        setupCompanyStatus(user.company_status);
                    } else {
                        setupCompanyStatus("deactive");
                    }
                }
            } else {
                showToast(res.message || "خطا در دریافت اطلاعات", "error");
            }
        } catch (e) {
            console.error(e);
            showToast("اتصال به سرور برقرار نشد.", "warning");
        } finally {
            hideLoader();
        }
    }

    // ==========================================
    // به‌روزرسانی پروفایل (update)
    // ==========================================
    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const password = passwordEl.value.trim();
        const confirmPassword = confirmPasswordEl.value.trim();

        // اعتبارسنجی رمز عبور (اگر وارد شده باشد)
        if (password && password !== confirmPassword) {
            showToast("رمز عبور و تکرار آن مطابقت ندارند.", "error");
            return;
        }
        if (password && password.length < 6) {
            showToast("رمز عبور باید حداقل ۶ کاراکتر باشد.", "error");
            return;
        }

        const payload = {
            first_name: firstNameEl.value.trim(),
            last_name: lastNameEl.value.trim(),
            company_name: companyNameEl.value.trim(),
            email: emailEl.value.trim(),
            mobile: mobileEl.value.trim(),
        };

        if (password) {
            payload.password = password;
        }

        toggleLoading(true);

        try {
            const res = await API_CONFIG.sendRequest("dashboard/update/", payload);
            if (res.status === "success") {
                showToast(res.message || "پروفایل با موفقیت به‌روزرسانی شد.", "success");
                // به‌روزرسانی آواتار و اطلاعات در صورت تغییر
                if (res.data?.user) {
                    const updatedUser = res.data.user;
                    // به‌روزرسانی نام در هدر
                    if (updatedUser.first_name && updatedUser.last_name) {
                        userNameEl.textContent = updatedUser.first_name + " " + updatedUser.last_name;
                    }
                    fillForm(updatedUser);
                    setupAvatar(updatedUser);
                }
                // پاک کردن فیلدهای رمز عبور
                passwordEl.value = "";
                confirmPasswordEl.value = "";
            } else {
                let errorMsg = res.message || "خطا در به‌روزرسانی پروفایل.";
                if (res.errors && typeof res.errors === "object") {
                    const firstError = Object.values(res.errors)[0];
                    if (firstError) errorMsg = firstError;
                }
                showToast(errorMsg, "error");
            }
        } catch (e) {
            console.error(e);
            showToast("اتصال به سرور برقرار نشد.", "warning");
        } finally {
            toggleLoading(false);
        }
    });

    // ==========================================
    // تغییر آواتار (آپلود)
    // ==========================================
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener("click", () => {
            avatarUpload.click();
        });
    }

    if (avatarUpload) {
        avatarUpload.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith("image/")) {
                showToast("لطفاً یک فایل تصویری انتخاب کنید.", "error");
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                showToast("حجم فایل نباید بیشتر از ۲ مگابایت باشد.", "error");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                // به‌روزرسانی آواتار هدر
                avatarImg.src = dataUrl;
                avatarImg.style.display = "block";
                avatarInitials.style.display = "none";
                // به‌روزرسانی آواتار بزرگ پروفایل
                profileAvatarImg.src = dataUrl;
                profileAvatarImg.style.display = "block";
                profileAvatarInitials.style.display = "none";

                showToast("آواتار با موفقیت آپلود شد.", "success");
            };
            reader.readAsDataURL(file);
        });
    }

    // ==========================================
    // اجرا
    // ==========================================
    loadProfile();
});