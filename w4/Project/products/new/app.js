// products/new/app.js

document.addEventListener("DOMContentLoaded", () => {
    initSubmenu();
    initFormSubmit();

    if (typeof API_CONFIG !== 'undefined') {
        loadHeaderData();
    }
});

function initSubmenu() {
    const btn = document.getElementById("product-menu-btn");
    const submenu = document.getElementById("product-submenu");

    if (btn && submenu) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            submenu.classList.toggle("show");
            const arrow = btn.querySelector(".arrow");
            if (arrow) {
                arrow.textContent = submenu.classList.contains("show") ? "▲" : "▼";
            }
        });
    }
}

async function loadHeaderData() {
    try {
        const response = await API_CONFIG.sendRequest(
            API_CONFIG.ENDPOINTS.DASHBOARD_INIT,
            { token: "SESSION_TOKEN_123456" }
        );

        if (response && response.status === "success" && response.data) {
            const data = response.data;
            if (document.getElementById("user-role")) document.getElementById("user-role").textContent = data.user.role;

            const avatarImg = document.getElementById("user-avatar-img");
            const avatarContainer = document.getElementById("avatar-container");

            if (avatarImg && avatarContainer) {
                if (data.user && data.user.avatar && data.user.avatar.trim() !== "") {
                    avatarContainer.textContent = "";
                    avatarContainer.appendChild(avatarImg);
                    avatarImg.src = data.user.avatar;
                    avatarImg.style.display = "block";
                } else {
                    avatarImg.style.display = "none";
                    avatarContainer.textContent = data.user.name ? data.user.name.charAt(0) : "G";
                    avatarContainer.style.color = "#fff";
                }
            }
        }
    } catch (error) {
        console.error("خطا در بارگذاری اطلاعات هدر:", error);
    }
}

// مدیریت ثبت محصول جدید (ارسال نام، دسته‌بندی و برند)
function initFormSubmit() {
    const form = document.getElementById("product-form");
    const submitBtn = document.getElementById("submit-btn");
    const loader = document.getElementById("btn-loader");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const product_name = document.getElementById("product_name").value.trim();
            const category = document.getElementById("category").value.trim();
            const brand = document.getElementById("brand").value.trim();

            submitBtn.disabled = true;
            loader.style.display = "block";

            try {
                const response = await API_CONFIG.sendRequest(
                    API_CONFIG.ENDPOINTS.PRODUCT_CREATE,
                    {
                        token: "SESSION_TOKEN_123456",
                        product_name: product_name,
                        category: category,
                        brand: brand
                    }
                );

                if (response.status === "success") {
                    showToast(response.message || "محصول با موفقیت ثبت شد.", "success");
                    form.reset();
                } else {
                    showToast(response.message || "خطایی رخ داده است.", "error");
                }

            } catch (error) {
                showToast(error.message || "ارتباط با سرور برقرار نشد.", "error");
            } finally {
                submitBtn.disabled = false;
                loader.style.display = "none";
            }
        });
    }
}

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

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