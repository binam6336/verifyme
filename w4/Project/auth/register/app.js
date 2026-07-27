/* ============================================
   منطق صفحه ثبت‌نام
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    // ---- ارجاعات DOM ----
    const registerForm = document.getElementById("register-form");
    const submitBtn = document.getElementById("submit-btn");
    const toastContainer = document.getElementById("toast-container");

    const firstNameEl = document.getElementById("first_name");
    const lastNameEl = document.getElementById("last_name");
    const companyNameEl = document.getElementById("company_name");
    const emailEl = document.getElementById("email");
    const mobileEl = document.getElementById("mobile");
    const passwordEl = document.getElementById("password");
    const confirmPasswordEl = document.getElementById("confirm_password");


    // ---- نمایش تاست ----
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


    // ---- تغییر وضعیت دکمه ----
    function toggleLoading(isLoading) {
        if (isLoading) {
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove("loading");
            submitBtn.disabled = false;
        }
    }


    // ---- سابمیت فرم ----
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const password = passwordEl.value.trim();
        const confirmPassword = confirmPasswordEl.value.trim();
        const mobile = mobileEl.value.trim();

        // اعتبارسنجی فرانت: تطابق رمز عبور
        if (password !== confirmPassword) {
            showToast("رمز عبور و تکرار آن مطابقت ندارند.", "error");
            return;
        }

        // اعتبارسنجی فرانت: طول شماره موبایل
        if (mobile.length < 11 || !mobile.startsWith("09")) {
            showToast("شماره موبایل وارد شده نامعتبر است.", "error");
            return;
        }

        // ساخت پیلود — توکن ارسال نمیشه چون هنوز نداریم
        // فیلد confirm_password هم فقط برای چک فرانته و به بک‌اند نمیره
        const payload = {
            first_name: firstNameEl.value.trim(),
            last_name: lastNameEl.value.trim(),
            company_name: companyNameEl.value.trim(),
            email: emailEl.value.trim(),
            mobile: mobile,
            password: password
        };

        toggleLoading(true);

        try {
            const response = await API_CONFIG.sendRequest("auth/register/", payload);

            if (response.status === "success") {

                // ذخیره توکن در حافظه مرورگر (مربوط به api-config.js)
                API_CONFIG.setToken(response.data.token);

                // ذخیره نام شرکت برای نمایش سریع در داشبورد (اختیاری)
                if (response.data.user?.company_name) {
                    localStorage.setItem("user_company_name", response.data.user.company_name);
                }

                showToast(response.message || "ثبت‌نام با موفقیت انجام شد. در حال انتقال...", "success");

                // ریدایرکت به داشبورد بعد از ۱.۵ ثانیه
                setTimeout(() => {
                    window.location.href = "../../dashboard";
                }, 1500);

            } else {
                // هندلینگ خطاها
                let errorMsg = response.message || "خطایی در ثبت‌نام رخ داد.";

                // اگر بک‌اند خطای فیلد خاصی فرستاده (مثل تکراری بودن موبایل)
                if (response.errors && typeof response.errors === "object") {
                    const firstFieldError = Object.values(response.errors)[0];
                    if (firstFieldError) {
                        errorMsg = firstFieldError;
                    }
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