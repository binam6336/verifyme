# Dashboard API
 url = /api/company/dashboard/init
 
`` Request json body
---------------------
{
  "token": "USER_AUTH_TOKEN_HERE"
}
 

`` Expected Response
---------------------
{
  "status": "success",
  "data": {
    "user": {
      "name": "شرکت ارتباطات نوین x",
      "role": "تولید کننده",
      "avatar": "https://api.dicebear.com/7.x/bottts/svg?seed=company" // <-- آدرس عکس یا لوگوی شرکت از سرور
    },
    "stats": {
      "total_products": 500,
      "active_warranties": 120,
      "pending_activations": 380
    }
  }
}

# Create Product API
url = /server/api/company/products/create/index.php

`` Request json body
{
"token": "USER_AUTH_TOKEN_HERE",
"product_name": "هندزفری بلوتوثی مدل Pro 2",
"category": "لوازم جانبی موبایل",
"brand": "شیائومی"
}

`` Expected Response
{
"status": "success",
"message": "محصول با موفقیت ثبت شد.",
"data": {
"product_id": 104,
"product_name": "هندزفری بلوتوثی مدل Pro 2",
"category": "لوازم جانبی موبایل",
"brand": "شیائومی",
"created_at": "2026-07-22 12:00:00"
}
}

`` Error Response
{
"status": "error",
"message": "ارسال نام محصول، دسته‌بندی و برند الزامی است."
}