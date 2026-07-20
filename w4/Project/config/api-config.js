// config/api-config.js

const API_CONFIG = {
    // آدرس پایه سرور محلی شما
    BASE_URL: "http://localhost/w4/Project",

    ENDPOINTS: {
        // اضافه شدن پوشه server به ساختار آدرس‌دهی
        DASHBOARD_INIT: "/server/api/company/dashboard/init/index.php",
        PRODUCT_CREATE: "/server/api/company/products/create/index.php"
    },

    async sendRequest(endpoint, payload) {
        const url = `${this.BASE_URL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
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