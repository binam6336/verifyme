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
 url = /api/company/dashboard/
 
`` Request json body
---------------------
{
  "token": "USER_AUTH_TOKEN_HERE",
  "product_name": "پاوربانک ۱۰۰۰۰ شیائومی",
  "brand": "شیائومی",
  "quantity": 150
}
 
 `` Expected Response
---------------------
{
  "status": "success",
  "message": "محصول جدید با موفقیت ثبت شد و ۵۰۰ کد گارانتی برای آن صادر گردید."
}

`` Error Response
---------------------
{
  "status": "error",
  "message": "موجودی انبار شما یا سقف مجاز ثبت محصول در این ماه به پایان رسیده است."
}