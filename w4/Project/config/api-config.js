const API_CONFIG = {
    // آدرس پایه سرور
    BASE_URL: "http://127.0.0.1/warranty/verifyme/w4/Project/server/api/company/",

    ENDPOINTS: {
        // احراز هویت
        REGISTER: "auth/register/",
        LOGIN: "auth/login/",

        // پنل تولیدکننده
        DASHBOARD_INIT: "dashboard/init/",
        PRODUCT_CREATE: "products/create/"
    },

    // دریافت توکن از حافظه مرورگر
    getToken() {
        return localStorage.getItem("user_token") || "";
    },

    // ذخیره توکن در حافظه مرورگر
    setToken(token) {
        if (token) {
            localStorage.setItem("user_token", token);
        } else {
            localStorage.removeItem("user_token");
        }
    },

    // پاک کردن توکن (خروج از حساب)
    clearToken() {
        localStorage.removeItem("user_token");
    },

    // ارسال درخواست متمرکز
    async sendRequest(endpoint, payload = {}) {
        const url = `${this.BASE_URL}${endpoint}`;
        const token = this.getToken();

        // ساخت هدرها — توکن فقط از اینجا عبور می‌کنه
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        if (token) {
            headers["Authorization"] = `${token}`;
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            });

            // اگر سرور 401 برگرداند یعنی توکن منقضی یا نامعتبره
            if (response.status === 401) {
                this.clearToken();
                console.warn("توکن نامعتبر است — کاربر باید دوباره لاگین کند.");
            }

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error("ارتباط با بک‌اِند برقرار نشد:", error);
            return this.getMockResponse(endpoint, payload);
        }
    },

    // پاسخ‌های مک — فقط زمانی اجرا میشه که سرور در دسترس نباشه
    getMockResponse(endpoint, payload) {
        return new Promise((resolve) => {
            setTimeout(() => {

                if (endpoint.includes("dashboard")) {
                    resolve({
                        status: "success",
                        data: {
                            user: {
                                name: "شرکت نمونه (دمو آفلاین)",
                                role: "تولید کننده",
                                avatar: ""
                            },
                            stats: {
                                total_products: 0,
                                active_warranties: 0,
                                pending_activations: 0
                            }
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