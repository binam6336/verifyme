// auth/register/app.js

document.addEventListener("DOMContentLoaded", () => {
    initRegisterForm();
});

function initRegisterForm() {
    const form = document.getElementById("register-form");
    const submitBtn = document.getElementById("submit-btn");
    const loader = document.getElementById("btn-loader");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = document.getElementById("first_name").value.trim();
        const lastName = document.getElementById("last_name").value.trim();
        const companyName = document.getElementById("company_name").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // اعتبارسنجی رمز عبور
        if (password !== confirmPassword) {
            showToast("رمز عبور و تایید آن یکسان نیستند!", "error");
            return;
        }

        if (password.length < 6) {
            showToast("رمز عبور باید حداقل ۶ کاراکتر باشد.", "error");
            return;
        }

        // اعتبارسنجی شماره موبایل
        if (!/^09\d{9}$/.test(mobile)) {
            showToast("شماره موبایل وارد شده معتبر نیست.", "error");
            return;
        }

        if (submitBtn) submitBtn.disabled = true;
        if (loader) loader.style.display = "block";

        try {
            let response;
            if (typeof API_CONFIG !== 'undefined') {
                response = await API_CONFIG.sendRequest(
                    API_CONFIG.ENDPOINTS.REGISTER,
                    {
                        first_name: firstName,
                        last_name: lastName,
                        company_name: companyName,
                        email: email,
                        mobile: mobile,
                        password: password
                    }
                );
            } else {
                // دمو آفلاین در صورت عدم وجود کانفیگ
                response = {
                    status: "success",
                    message: "ثبت‌نام با موفقیت انجام شد.",
                    data: { token: "DEMO_TOKEN_998877" }
                };
            }

            if (response && response.status === "success") {
                showToast(response.message || "ثبت‌نام با موفقیت انجام شد.", "success");

                // ذخیره توکن در localStorage جهت استفاده در کدهای فرانت‌اِند
                if (response.data && response.data.token) {
                    localStorage.setItem("user_token", response.data.token);
                }

                // انتقال به داشبورد پس از ۱.۵ ثانیه
                setTimeout(() => {
                    window.location.href = "../../dashboard";
                }, 1500);

            } else {
                showToast((response && response.message) || "خطایی در ثبت‌نام رخ داد.", "error");
            }

        } catch (error) {
            console.error("خطای ثبت‌نام:", error);
            showToast("ارتباط با سرور برقرار نشد.", "error");
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (loader) loader.style.display = "none";
        }
    });
}

function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const emoji = type === "success" ? "✅" : "❌";

    toast.innerHTML = `
        <span>${emoji}</span>
        <div class="toast-content">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("hide");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 4000);
}