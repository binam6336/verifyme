document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const submitBtn = document.getElementById("submit-btn");
    const toastContainer = document.getElementById("toast-container");
    const themeToggle = document.getElementById("auth-theme-toggle");

    const mobileEl = document.getElementById("mobile");
    const passwordEl = document.getElementById("password");

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
    // توابع کمکی
    // ==========================================
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

    // ==========================================
    // ارسال فرم ورود
    // ==========================================
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const mobile = mobileEl.value.trim();
        const password = passwordEl.value.trim();

        // اعتبارسنجی ساده
        if (mobile.length < 11 || !mobile.startsWith("09")) {
            showToast("شماره موبایل وارد شده نامعتبر است.", "error");
            return;
        }
        if (password.length < 6) {
            showToast("رمز عبور باید حداقل ۶ کاراکتر باشد.", "error");
            return;
        }

        const payload = {
            mobile: mobile,
            password: password
        };

        toggleLoading(true);

        try {
            const response = await API_CONFIG.sendRequest("auth/login/", payload);

            if (response.status === "success") {
                // ذخیره توکن
                API_CONFIG.setToken(response.data.token);

                // ذخیره اطلاعات کاربر در صورت نیاز
                if (response.data.user?.company_name) {
                    localStorage.setItem("user_company_name", response.data.user.company_name);
                }
                if (response.data.user?.role) {
                    localStorage.setItem("user_role", response.data.user.role);
                }

                showToast(response.message || "ورود با موفقیت انجام شد. در حال انتقال...", "success");

                setTimeout(() => {
                    window.location.href = "../../dashboard";
                }, 1500);

            } else {
                let errorMsg = response.message || "خطایی در ورود رخ داد.";
                if (response.errors && typeof response.errors === "object") {
                    const firstFieldError = Object.values(response.errors)[0];
                    if (firstFieldError) errorMsg = firstFieldError;
                }
                showToast(errorMsg, "error");
            }

        } catch (error) {
            console.error("خطا در ارسال فرم ورود:", error);
            showToast("اتصال به سرور برقرار نشد. لطفاً دوباره تلاش کنید.", "warning");
        } finally {
            toggleLoading(false);
        }
    });
});