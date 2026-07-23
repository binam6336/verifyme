company-panel/
│
├── config/
│   └── api-config.js      <-- 🚀 آپدیت شد (اصلاح مسیر اندپوینت‌ها به پوشه server)
│
├── dashboard/
│   ├── index.html         <-- (بدون تغییر)
│   └── app.js             <-- (بدون تغییر)
│
|
|├── auth/                  <-- 📁 پوشه احراز هویت
│   └── register/          <-- 📁 صفحه ثبت‌نام
│       ├── index.html     <-- فرم ثبت‌نام شیشه‌ای
│       ├── style.css      <-- استایل اختصاصی صفحه احراز هویت
│       └── app.js
|
├── products/
│   └── new/
│       ├── index.html     <-- (بدون تغییر)
│       └── app.js         <-- (بدون تغییر)
│
└── server/                <-- 📁 پوشه جدید بک‌اِند
    └── api/
        company/
        ├── dashboard/init/index.php
        └── products/create/index.php