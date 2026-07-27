/* ============================================
   منطق صفحه ثبت محصول جدید
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    // ---- ارجاعات DOM ----
    const productForm = document.getElementById("product-form");
    const submitBtn = document.getElementById("submit-btn");
    const toastContainer = document.getElementById("toast-container");
    const avatarImg = document.getElementById("user-avatar-img");

    // ارجاعات منو
    const productMenuBtn = document.getElementById("product-menu-btn");
    const productSubmenu = document.getElementById("product-submenu");
    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");


    // ---- منطق زیرمنوی محصولات ----
    if (productMenuBtn && productSubmenu) {
        productMenuBtn.addEventListener("click", () => {
            productMenuBtn.classList.toggle("open");
            productSubmenu.classList.toggle("open");
        });
    }


    // ---- منطق منوی موبایل ----
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });

        // بستن سایدبار با کلیک خارج از آن
        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove("mobile-open");
            }
        });
    }


    // ---- آواتار کاربر ----
    const savedAvatar = localStorage.getItem("user_avatar");
    if (savedAvatar && avatarImg) {
        avatarImg.src = savedAvatar;
        avatarImg.style.display = "block";
        avatarImg.onerror = () => {
            avatarImg.style.display = "none";
        };
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
        }, 4000);
    }


    // ---- تغییر وضعیت دکمه (لودینگ / عادی) ----
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
    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // فقط داده‌های فرم — توکن توسط api-config در هدر Authorization قرار می‌گیرد
        const payload = {
            product_name: document.getElementById("product_name").value.trim(),
            category: document.getElementById("category").value.trim(),
            brand: document.getElementById("brand").value.trim()
        };

        // اعتبارسنجی ساده فرانت
        if (!payload.product_name || !payload.category || !payload.brand) {
            showToast("لطفاً تمام فیلدها را پر کنید.", "error");
            return;
        }

        toggleLoading(true);

        try {
            const response = await API_CONFIG.sendRequest("products/create/", payload);

            if (response.status === "success") {

                // استفاده از داده‌های بازگشتی برای بازخورد غنی‌تر
                const productId = response.data?.product_id;
                const successMsg = productId
                    ? `محصول با موفقیت ثبت شد (کد: ${productId}).`
                    : (response.message || "محصول با موفقیت ثبت شد.");

                showToast(successMsg, "success");

                // پاک کردن فرم بعد از موفقیت
                productForm.reset();

            } else {
                // نمایش دقیق پیام خطای ارسالی از بک‌اند
                showToast(response.message || "خطایی در ثبت محصول رخ داد.", "error");
            }

        } catch (error) {
            console.error("خطا در ارسال فرم:", error);
            showToast("اتصال برقرار نشد. لطفاً دوباره تلاش کنید.", "warning");
        } finally {
            toggleLoading(false);
        }
    });

});