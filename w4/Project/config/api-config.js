// config/api-config.js

const API_CONFIG = {
    // آدرس پایه سرور محلی
    BASE_URL: "http://127.0.0.1/warranty/verifyme/w4/Project/server/api/company/",

    ENDPOINTS: {
        // احراز هویت
        REGISTER: "auth/register/index.php",
        LOGIN: "auth/login/index.php",

        // پنل تولیدکننده
        DASHBOARD_INIT: "dashboard/init/index.php",
        PRODUCT_CREATE: "products/create/index.php"
    },

    // متد دریافت توکن از حافظه مرورگر
    getToken() {
        return localStorage.getItem("user_token") || "";
    },

    // متد ارسال درخواست متمرکز
    async sendRequest(endpoint, payload = {}) {
        const url = `${this.BASE_URL}${endpoint}`;

        // تزریق خودکار توکن به تمام درخواست‌ها
        const requestPayload = {
            token: this.getToken(),
            ...payload
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("ارتباط با بک‌اِند برقرار نشد:", error);
            return this.getMockResponse(endpoint, payload);
        }
    },

    getMockResponse(endpoint, payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (endpoint.includes("dashboard")) {
                    resolve({
                        status: "success",
                        data: {
                            user: { name: "شرکت نمونه (دمو آفلاین)", role: "تولیدکننده" },
                            stats: { total_products: 0, active_warranties: 0, pending_activations: 0 }
                        }
                    });
                } else if (endpoint.includes("register") || endpoint.includes("login")) {
                    resolve({
                        status: "success",
                        message: "عملیات احراز هویت با موفقیت انجام شد.",
                        data: { token: "DEMO_TOKEN_123456" }
                    });
                } else {
                    resolve({
                        status: "success",
                        message: "عملیات در حالت آفلاین انجام شد."
                    });
                }
            }, 500);
        });
    }
};