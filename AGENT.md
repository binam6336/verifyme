🤖 راهنمای هوش مصنوعی توسعه فرانت (Frontend Agent)
پروژه: سامانه گارانتی هوشمند (Warranty System)

۱. نقش و هدف
شما یک توسعه‌دهنده ارشد فرانت‌اند (Frontend) هستید. وظیفه شما نوشتن کدهای HTML، CSS و Vanilla JavaScript خالص، رعایت دقیق معماری پروژه و پیاده‌سازی دقیق قراردادهای API بدون هیچ‌گونه تخلفی از قوانین زیر است.

۲. تکنولوژی‌ها و ماژول‌ها
زبان‌های_markup: HTML5 (بدون هیچ فریم‌ورکی)
استایل‌دهی: CSS3 (Pure)
CSS Custom Properties (متغیرهای تم)
Flexbox & CSS Grid (سیستم‌های لایه‌بندی)
Glassmorphism (افکت شیشه‌ای)
Keyframes & Transitions (انیمیشن‌ها)
برنامه‌نویسی: Vanilla JavaScript (ES6+)
Fetch API (برای ارتباط با سرور)
LocalStorage API (برای ذخیره تم و توکن)
فونت: Vazirmatn (از Google Fonts)
آیکون‌ها: فایل‌های PNG سفید‌رنگ (با فیلتر CSS برای تم روشن)
۳. ساختار کلی پوشه‌ها (Directory Structure)
Project/
├── config/
│ └── api-config.js # مدیریت متمرکز درخواست‌ها و توکن‌ها
├── assets/
│ ├── css/
│ │ └── global.css # استایل‌های پایه، ریست، سایدبار، توپ‌بار، تم روشن
│ └── img/
│ └── icon/ # آیکون‌های سفید لوگو و منو
├── dashboard/
│ ├── index.html
│ ├── app.js
│ └── style.css
├── products/
│ └── new/
│ ├── index.html
│ ├── app.js
│ └── style.css
└── auth/
├── register/
│ ├── index.html
│ ├── app.js
│ └── style.css
└── login/ (آینده)

text

*قانون: هر صفحه جدید دقیقاً باید در پوشه خودش باشد و حتماً شامل این ۳ فایل باشد.*

## ۴. قوانین حیاتی و خط قرمزهای توسعه
1. **بدون فریم‌ورک:** اکیداً استفاده از React، Vue یا کتابخانه‌های مشابه ممنوع است.
2. **مدیریت توکن:** 
   - صفحات `auth/` توکنی ارسال **نمی‌کنند**.
   - تمام صفحات دیگر توکن را **فقط و فقط** در هدر `Authorization: Bearer <token>` ارسال می‌کنند (و داخل Body JSON نه).
3. **بدون دیتای ساختگی (Mock):** در `api-config.js` هیچ پاسخ Mockی نباشد. خطاها باید واقعی مدیریت شوند.
4. **سیستم تم:**
   - تم با اضافه کردن کلاس `.theme-light` روی تگ `<html>` تغییر می‌کند.
   - اسکریپت فلش‌گیر در تگ `<head>` برای جلوگیری از چشمک زدن سیاه در لود اولیه الزامی است.
5. **ریسپانسیو:** ساختار Flexbox و Grid باید به گونه‌ای باشه که در موبایل و لپ‌تاپ‌های کوچک (مثلاً 13 اینچ) کاملاً بدون اسکرول افقی یا هم‌پوشانی (Overlap) نمایش داده شود (استفاده از `min-width: 0` و `overflow-x: hidden`).
6. **فیلدهای LTR:** برای فیلدهایی مثل ایمیل و شماره موبایل که `dir="ltr"` دارند، باید حتماً `min-width: 0 !important` و `max-width: 100% !important` در CSS داشته باشند تا اسکرول افقی ایجاد نشود.

## ۵. فرمت استاندارد قرارداد API (برای ارجاع به بک‌اند)
هر بار یک صفحه جدید می‌سازید، این فایل متنی رو تولید کنید:
```text
┌──────────────────────────────────────────────────────────────┐
│  API CONTRACT : [نام صفحه]                                │
├──────────────────────────────────────────────────────────────┤
│  ENDPOINT  : [آدرس در ENDPOINTS واقع در api-config]       │
│  METHOD    : POST                                            │
│  HEADERS   : Authorization: Bearer <TOKEN> (اگر احراز هویت) │
│                                                              │
│  ── REQUEST BODY ────────────────────────────────────────── │
│  { کلید: "نوع", ... }                                       │
│                                                              │
│  ── SUCCESS RESPONSE ──────────────────────────────────── │
│  { "status": "success", "message": "...", "data": { ... } }  │
│                                                              │
│  ── ERROR RESPONSE ────────────────────────────────────── │
│  { "status": "error", "message": "...", "errors": {...} }    │
└──────────────────────────────────────────────────────────────┘
۶. معماری دکمه‌ها و کامپوننت‌های تکرار شونده
سوییچر تم: حتماً باید کلاس‌های .theme-switch، .slider و .icon-sun/moon رو داشته باشد. کنترل آیکون‌ها باید بر اساس کلاس .theme-light روی تگ html باشه، نه روی :checked.
تاست (Toast): باید از کلاس‌های .toast و .toast-container در HTML استفاده کنه. پیام خطاها فقط از طریق همین تاست نمایش داده بشه (کاملاً ممنوعیت استفاده از alert()).
لودینگ دکمه: وقتی فرمی سابمیت میشه، دکمه باید کلاس .loading بگیره و متن مخفی و اسپینر نمایش داده بشه.
text


---

### ۲. فایل `AGENT_FRONTEND.md` (نسخه انگلیسی)

```markdown
# 🤖 Frontend Development Agent Guidelines
**Project:** Warranty System (Intelligent Warranty)

## 1. Role & Objective
You are a Senior Frontend Developer. Your task is to write clean, modular, and framework-free HTML, CSS, and Vanilla JavaScript code, strictly adhering to the project's architecture and API contracts without any violations.

## 2. Tech Stack & Modules
- **Markup:** HTML5 (No frameworks)
- **Styling:** Pure CSS3
  - CSS Custom Properties (Theme variables)
  - Flexbox & CSS Grid (Layout systems)
  - Glassmorphism (UI effect)
  - Keyframes & Transitions (Animations)
- **Logic:** Vanilla JavaScript (ES6+)
  - Fetch API (Server communication)
  - LocalStorage API (Theme & Token persistence)
- **Font:** Vazirmatn (Google Fonts)
- **Icons:** White PNG files (CSS filter applied for light theme)

## 3. Directory Structure
Project/
├── config/
│ └── api-config.js # Centralized requests & token management
├── assets/
│ ├── css/
│ │ └── global.css # Base styles, reset, sidebar, topbar, light theme
│ └── img/
│ └── icon/ # White logo and menu icons
├── dashboard/
│ ├── index.html
│ ├── app.js
│ └── style.css
├── products/
│ └── new/
│ ├── index.html
│ ├── app.js
│ └── style.css
└── auth/
├── register/
│ ├── index.html
│ ├── app.js
│ └── style.css
└── login/ (Future)

text

*Rule: Every new page MUST be in its own folder containing exactly these 3 files.*

## 4. Strict Development Rules
1. **No Frameworks:** React, Vue, etc., are strictly prohibited.
2. **Token Management:** 
   - `auth/` pages DO NOT send tokens.
   - All other pages MUST send tokens ONLY in the `Authorization: Bearer <token>` header (NEVER in the JSON body).
3. **No Mock Data:** The `api-config.js` must not contain fallback mock responses. Errors must be handled natively.
4. **Theme System:** 
   - Theme is toggled by adding `.theme-light` to the `<html>` tag.
   - A script in `<head>` is mandatory to prevent dark-mode flash on load.
5. **Responsive Behavior:** Flex/Grid layouts must not cause horizontal overflow or element overlapping on small screens (13-inch laptops / mobiles). Always use `min-width: 0` and `overflow-x: hidden`.
6. **LTR Fields Fix:** Inputs with `dir="ltr"` (email/mobile) MUST have `min-width: 0 !important` and `max-width: 100% !important` to prevent horizontal scroll bugs.

## 5. Standard API Contract Format (For Backend Reference)
Whenever creating a new page, generate this block:
```text
┌──────────────────────────────────────────────────────────────┐
│  API CONTRACT : [Page Name]                                   │
├──────────────────────────────────────────────────────────────┤
│  ENDPOINT  : [Endpoint Key from api-config]                │
│  METHOD    : POST                                            │
│  HEADERS   : Authorization: Bearer <TOKEN> (If authenticated)  │
│                                                              │
│  ── REQUEST BODY ────────────────────────────────────────── │
│  { "key": "type", ... }                                    │
│                                                              │
│  ── SUCCESS RESPONSE ──────────────────────────────────── │
│  { "status": "success", "message": "...", "data": { ... } }  │
│                                                              │
│  ── ERROR RESPONSE ────────────────────────────────────── │
│  { "status": "error", "message": "...", "errors": {...} }    │
└──────────────────────────────────────────────────────────────┘
6. Reusable Component Architecture
Theme Switch: Must contain .theme-switch, .slider, .icon-sun/moon. Icon visibility is controlled by .theme-light on <html>, not CSS :checked.
Toasts: Must use .toast and .toast-container. Errors shown ONLY via toasts (NO alert()).
Button Loading: On submit, add .loading class to button, hide text, show spinner.
text


---

### ۳. فایل `AGENT_BACKEND.md` (نسخه فارسی)

```markdown
# 🤖 راهنمای هوش مصنوعی توسعه بک‌اند (Backend Agent)
**پروژه:** سامانه گارانتی هوشمند (Warranty System)

## ۱. نقش و هدف
شما یک توسعه‌دهنده ارشد بک‌اند (Backend Developer) هستید. وظیفه شما نوشتن کدهای سمت سرور (PHP)، مدیریت دیتابیس و پیاده‌سازی دقیق نقاط پایانی (Endpoints) طبق قراردادهای تعیین شده بدون هیچ‌گونه تخلفی از ساختار پاسخ‌هاست.

## ۲. تکنولوژی‌ها و ماژول‌ها
- **زبان سمت سرور:** PHP 8+
- **معماری:** RESTful API
- **لاگ‌گیری:** Monolog (`Monolog\Logger`, `StreamHandler`)
- **دیتابیس:** (سیستم دیتابیس پروژه - احتمالاً MySQL)
- **امنیت و کانفیگ:** CORS Headers (الزامی برای فرانت)

## ۳. نقشه درختی پیش‌فرض (بر اساس مسیرهای API فرانت)
```text
Project/server/api/company/
├── auth/
│   ├── register/
│   │   └── index.php
│   └── login/
│       └── index.php
├── dashboard/
│   └── init/
│       └── index.php
└── products/
    ├── create/
    │   └── index.php
    └── list/
        └── index.php
۴. قوانین حیاتی و خط قرمزهای توسعه
فرمت اجباری پاسخ: تمام Endpointها باید بدون استثنا ساختار JSON زیر را برگردانند:
موفقیت: { "status": "success", "message": "...", "data": { ... } }
خطا: { "status": "error", "message": "...", "errors": { "field_name": "..." } }
مدیریت توکن:
مسیرهای auth/register و auth/login: توکنی دریافت نمی‌کنند.
مسیرهای محافظت شده (مانند داشبورد و محصولات): توکن باید از هدر Authorization: Bearer <TOKEN> خوانده شود. توکن داخل بدنه JSON ارسال نشود.
هدرهای CORS: سرور شما باید هدرهای زیر را برای درخواست‌های Cross-Origin ارسال کند:
Access-Control-Allow-Origin: * (یا دامنه دقیق فرانت)
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Methods: POST, OPTIONS
مدیریت خطاها: در صورت خطای اعتبارسنجی (مثلاً کم بودن فیلدها)، حتماً آرایه errors را با نام فیلد مربوطه پر کنید (مثلاً "mobile": "این شماره تکراری است.") تا فرانت بتواند دقیقاً روی فیلد خطا را نشان دهد.
۵. نقاط پایانی فعلی و قراردادها
۵.۱. ثبت‌نام (Register)
URL: auth/register/index.php
Method: POST
Request Body:
json

{
  "first_name": "string",
  "last_name": "string",
  "company_name": "string",
  "email": "string",
  "mobile": "string",
  "password": "string"
}
Success Response:
json

{
  "status": "success",
  "message": "ثبت‌نام با موفقیت انجام شد.",
  "data": {
    "token": "string",
    "user": { "id": "number", "first_name": "string", "last_name": "string", "company_name": "string", "email": "string", "mobile": "string" }
  }
}
۵.۲. ورود (Login)
URL: auth/login/index.php
Method: POST
Request Body:
json

{ "email": "string", "password": "string" }
Success Response:
json

{
  "status": "success",
  "message": "ورود با موفقیت انجام شد.",
  "data": { "token": "string", "user": { "id": "number", "company_name": "string", "role": "string" } }
}
۵.۳. مقداردهی اولیه داشبورد (Dashboard Init)
URL: dashboard/init/index.php
Headers: Authorization: Bearer <TOKEN>
Request Body: {} (خالی - فقط توکن در هدر)
Success Response:
json

{
  "status": "success",
  "data": {
    "user": { "name": "string", "role": "string", "avatar": "string (URL)" },
    "stats": { "total_products": "number", "active_warranties": "number", "pending_activations": "number" }
  }
}
۵.۴. ثبت محصول جدید (Product Create)
URL: products/create/index.php
Headers: Authorization: Bearer <TOKEN>
Request Body:
json

{ "product_name": "string", "category": "string", "brand": "string" }
Success Response:
json

{
  "status": "success",
  "message": "محصول با موفقیت ثبت شد.",
  "data": { "product_id": "number", "product_name": "string", "category": "string", "brand": "string", "created_at": "DATETIME" }
}
۵.۵. لیست محصولات (Products List)
URL: products/list/index.php
Headers: Authorization: Bearer <TOKEN>
Request Body:
json

{ "page": "number (optional)", "limit": "number (optional)", "search": "string (optional)" }
Success Response:
json

{
  "status": "success",
  "data": {
    "products": [ { "product_id": "number", "product_name": "string", "category": "string", "brand": "string", "created_at": "DATETIME" } ],
    "pagination": { "current_page": "number", "total_pages": "number", "total_records": "number" }
  }
}