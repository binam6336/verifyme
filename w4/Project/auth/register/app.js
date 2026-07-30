document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const submitBtn = document.getElementById("submit-btn");
    const toastContainer = document.getElementById("toast-container");
    const themeToggle = document.getElementById("auth-theme-toggle");

    const passwordEl = document.getElementById("password");
    const confirmPasswordEl = document.getElementById("confirm_password");
    const mobileEl = document.getElementById("mobile");

    // ==========================================
    // منطق تم (اصلاح شده روی documentElement)
    // ==========================================
    if (localStorage.getItem("app_theme") === "light") {
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
        document.documentElement.classList.toggle("theme-light");
        localStorage.setItem("app_theme", themeToggle.checked ? "light" : "dark");
    });

    // ==========================================
    // فرم ثبت‌نام
    // ==========================================
    function showToast(message, type = "success") {
        const toast = document.createElement("div"); toast.className = `toast ${type}`; toast.textContent = message; toastContainer.appendChild(toast);
        setTimeout(() => { toast.classList.add("removing"); toast.addEventListener("animationend", () => toast.remove()); }, 4000);
    }

    function toggleLoading(isLoading) {
        if (isLoading) { submitBtn.classList.add("loading"); submitBtn.disabled = true; }
        else { submitBtn.classList.remove("loading"); submitBtn.disabled = false; }
    }

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const password = passwordEl.value.trim();
        const confirmPassword = confirmPasswordEl.value.trim();
        const mobile = mobileEl.value.trim();

        if (password !== confirmPassword) { showToast("رمز عبور و تکرار آن مطابقت ندارند.", "error"); return; }
        if (mobile.length < 11 || !mobile.startsWith("09")) { showToast("شماره موبایل وارد شده نامعتبر است.", "error"); return; }

        const payload = {
            first_name: document.getElementById("first_name").value.trim(),
            last_name: document.getElementById("last_name").value.trim(),
            company_name: document.getElementById("company_name").value.trim(),
            email: document.getElementById("email").value.trim(),
            mobile: mobile,
            password: password
        };

        toggleLoading(true);
        try {
            const response = await API_CONFIG.sendRequest("auth/register/", payload);
            if (response.status === "success") {
                API_CONFIG.setToken(response.data.token);
                if (response.data.user?.company_name) localStorage.setItem("user_company_name", response.data.user.company_name);
                showToast(response.message || "ثبت‌نام با موفقیت انجام شد. در حال انتقال...", "success");
                setTimeout(() => { window.location.href = "../../dashboard"; }, 1500);
            } else {
                let errorMsg = response.message || "خطایی در ثبت‌نام رخ داد.";
                if (response.errors && typeof response.errors === "object") {
                    const firstFieldError = Object.values(response.errors)[0];
                    if (firstFieldError) errorMsg = firstFieldError;
                }
                showToast(errorMsg, "error");
            }
        } catch (error) {
            console.error("خطا در ارسال فرم ثبت‌نام:", error);
            showToast("اتصال به سرور برقرار نشد. لطفاً دوباره تلاش کنید.", "warning");
        } finally {
            toggleLoading(false);
        }
    });
});