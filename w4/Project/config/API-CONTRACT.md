┌──────────────────────────────────────────────────────────────────┐
│  API CONTRACT : ثبت‌نام شرکت (Register)                          │
├──────────────────────────────────────────────────────────────────┤
│  ENDPOINT  : auth/register/                                     │
│  METHOD    : POST                                                │
│  CONTENT   : application/json                                    │
│                                                                  │
│  ── HEADERS ────────────────────────────────────────────────── │
│  Content-Type: application/json                                  │
│  (چون کاربر هنوز توکن نداره، هدر Authorization ارسال نمیشه)      │
│                                                                  │
│  ── REQUEST BODY ───────────────────────────────────────────── │
│  {                                                               │
│    "first_name":   "string (required) — نام مسئول",              │
│    "last_name":    "string (required) — نام خانوادگی",           │
│    "company_name": "string (required) — نام شرکت",               │
│    "email":        "string (required) — ایمیل رسمی",             │
│    "mobile":       "string (required) — شماره همراه",            │
│    "password":     "string (required) — رمز عبور"                │
│  }                                                               │
│                                                                  │
│  ── RESPONSE (Success) ────────────────────────────────────── │
│  {                                                               │
│    "status":  "success",                                         │
│    "message": "ثبت‌نام با موفقیت انجام شد.",                      │
│    "data": {                                                     │
│      "token": "string — توکن احراز هویت",                        │
│      "user": {                                                   │
│        "id":           "number — شناسه کاربر",                   │
│        "first_name":   "string",                                 │
│        "last_name":    "string",                                 │
│        "company_name": "string",                                 │
│        "email":        "string",                                 │
│        "mobile":       "string"                                  │
│      }                                                          │
│    }                                                            │
│  }                                                              │
│                                                                 │
│  ── RESPONSE (Error) ──────────────────────────────────────── │
│  {                                                              │
│    "status":  "error",                                          │
│    "message": "شماره موبایل یا ایمیل وارد شده قبلاً ثبت شده.",   │
│    "errors": {                                                  │
│      "mobile": "این شماره موبایل تکراری است."                   │
│    }                                                            │
│  }                                                              │
└──────────────────────────────────────────────────────────────────┘










┌──────────────────────────────────────────────────────────────────┐
│  API CONTRACT : دریافت اطلاعات داشبورد (Dashboard Init)         │
├──────────────────────────────────────────────────────────────────┤
│  ENDPOINT  : dashboard/init/                                    │
│  METHOD    : POST                                                │
│                                                                  │
│  ── HEADERS ────────────────────────────────────────────────── │
│  Authorization: Bearer <TOKEN>                                   │
│  Content-Type: application/json                                  │
│                                                                  │
│  ── REQUEST BODY ───────────────────────────────────────────── │
│  {}  (خالی — فقط توکن در هدر ارسال می‌شود)                      │
│                                                                  │
│  ── SUCCESS RESPONSE ──────────────────────────────────────── │
│  {                                                               │
│    "status": "success",                                          │
│    "data": {                                                     │
│      "user": {                                                   │
│        "name": "string",                                         │
│        "role": "string",                                         │
│        "avatar": "string (URL)"                                  │
│      },                                                          │
│      "stats": {                                                  │
│        "total_products": "number",                               │
│        "active_warranties": "number",                            │
│        "pending_activations": "number"                           │
│      }                                                           │
│    }                                                             │
│  }                                                               │
│                                                                  │
│  ── ERROR RESPONSE ────────────────────────────────────────── │
│  {                                                               │
│    "status": "error",                                            │
│    "message": "توکن نامعتبر است."                                │
│  }                                                               │
└──────────────────────────────────────────────────────────────────┘










┌──────────────────────────────────────────────────────────────────┐
│  API CONTRACT : ثبت محصول جدید (Product Create)                 │
├──────────────────────────────────────────────────────────────────┤
│  ENDPOINT  : products/create/                                   │
│  METHOD    : POST                                                │
│                                                                  │
│  ── HEADERS ────────────────────────────────────────────────── │
│  Authorization: Bearer <TOKEN>                                   │
│  Content-Type: application/json                                  │
│                                                                  │
│  ── REQUEST BODY ───────────────────────────────────────────── │
│  {                                                               │
│    "product_name": "string (required)",                          │
│    "category": "string (required)",                              │
│    "brand": "string (required)"                                  │
│  }                                                               │
│                                                                  │
│  ── SUCCESS RESPONSE ──────────────────────────────────────── │
│  {                                                               │
│    "status": "success",                                          │
│    "message": "محصول با موفقیت ثبت شد.",                         │
│    "data": {                                                     │
│      "product_id": "number",                                    │
│      "product_name": "string",                                  │
│      "category": "string",                                      │
│      "brand": "string",                                         │
│      "created_at": "string (DATETIME)"                           │
│    }                                                             │
│  }                                                               │
│                                                                  │
│  ── ERROR RESPONSE ────────────────────────────────────────── │
│  {                                                               │
│    "status": "error",                                            │
│    "message": "ارسال نام محصول، دسته‌بندی و برند الزامی است."    │
│  }                                                               │
└──────────────────────────────────────────────────────────────────┘