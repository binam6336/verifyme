<?php
// حل مشکل دسترسی و پیش‌پرواز مرورگر
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $response = [
    "status" => "success",
    "message" => "ثبت‌نام با موفقیت انجام شد55S22.",
    "data" => [
      "token" => "35e9cf057996d8c763495014781f6646af6d4eae29086a6f4358b1721f7ced3e3958e9043ce87e8d1e05feee4a9f934fa78cfd955a88ef0354907aab26bbd9b8b328448c52c0",
      "user" => [
        "id" => 15,
        "first_name" => "test",
        "last_name" => "last_name",
        "company_name" => "test company",
        "email" => "email",
        "mobile" =>  "phone"
      ]
    ]

  ];
} else {
  $response = [
    "status" => "error",
    "message" => "خطا در انجام عملیات",
    "errors" => [
      "method" => "متد ارسالی صحیح نیست",
      "token" => "توکن ارسالی صحیح نیست"
    ]
  ];
}
echo json_encode($response);
