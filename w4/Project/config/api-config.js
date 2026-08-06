const API_CONFIG = {
    // آدرس پایه سرور
    BASE_URL: "http://127.0.0.1/warranty/verifyme/w4/Project/server/api/company/",

    ENDPOINTS: {
        // احراز هویت
        REGISTER: "auth/register/",
        LOGIN: "auth/login/",

        // پنل تولیدکننده
        DASHBOARD_INIT: "dashboard/init/",
        PRODUCT_CREATE: "products/create/",
        PRODUCT_LIST: "products/list/"  // اضافه شد
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

    // بررسی احراز هویت
    isAuthenticated() {
        return !!this.getToken();
    },

    // خروج از حساب
    logout() {
        this.clearToken();
        window.location.href = "/auth/login/";
    },

    // ارسال درخواست متمرکز
    async sendRequest(endpoint, payload = {}, options = {}) {
        const url = `${this.BASE_URL}${endpoint}`;
        const token = this.getToken();
        const method = options.method || "POST";

        // ساخت هدرها — توکن فقط از اینجا عبور می‌کنه
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        // ⚠️ توکن رو فقط به صورت خودش می‌فرستیم، بدون "Bearer"
        if (token) {
            headers["Authorization"] = token;
        }

        // ساخت گزینه‌های درخواست
        const fetchOptions = {
            method: method,
            headers: headers,
        };

        // اگر متد GET نباشه، body رو اضافه کن
        if (method.toUpperCase() !== "GET") {
            fetchOptions.body = JSON.stringify(payload);
        }

        try {
            const response = await fetch(url, fetchOptions);

            // اگر سرور 401 برگرداند یعنی توکن منقضی یا نامعتبره
            if (response.status === 401) {
                this.clearToken();
                console.warn("توکن نامعتبر است — کاربر باید دوباره لاگین کند.");
                throw new Error("توکن نامعتبر");
            }

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error("ارتباط با بک‌اِند برقرار نشد:", error);
            throw error; // دیگر Mock برنمی‌گردونه
        }
    },

    // ==========================================
    // متدهای کمکی برای صفحات خاص
    // ==========================================

    // دریافت اطلاعات داشبورد
    async getDashboard() {
        return this.sendRequest(this.ENDPOINTS.DASHBOARD_INIT, {});
    },

    // ثبت محصول جدید
    async createProduct(productData) {
        return this.sendRequest(this.ENDPOINTS.PRODUCT_CREATE, productData);
    },

    // دریافت لیست محصولات
    async getProducts(page = 1, limit = 10, search = "") {
        return this.sendRequest(
            this.ENDPOINTS.PRODUCT_LIST,
            { page, limit, search },
            { method: "POST" }
        );
    },

    // ثبت‌نام کاربر
    async register(userData) {
        return this.sendRequest(
            this.ENDPOINTS.REGISTER,
            userData,
            { method: "POST" }
        );
    },

    // ورود کاربر
    async login(credentials) {
        return this.sendRequest(
            this.ENDPOINTS.LOGIN,
            credentials,
            { method: "POST" }
        );
    }
};

// ==========================================
// اکسپورت برای استفاده در سایر فایل‌ها
// ==========================================
if (typeof module !== "undefined" && module.exports) {
    module.exports = API_CONFIG;
}