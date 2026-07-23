<?php
// حل مشکل دسترسی و پیش‌پرواز مرورگر
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $response = [
  "status"=> "error",
  "message"=> "ثبت‌نام با موفقیت انجام شد55S22.",
    "errors" => [
        "mobile" => "حطا در پردازش"
    ]
    ];

  }
  else{
    $response = [
  "status"=> "error",
  "message"=> "خطا در انجام عملیات",
    "errors" => [
        "method" => "متد ارسالی صحیح نیست"
    ]
    ];
  }
echo json_encode($response);
