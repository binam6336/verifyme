<?php
// حل مشکل دسترسی و پیش‌پرواز مرورگر

require __DIR__ . '/../../../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Src\App\Controller\Usermanager;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == "POST") {

  $usermanager = new Usermanager;

  $logger = new Logger('app');

  $logger->pushHandler(
    new StreamHandler(__DIR__ . '/../../../../Logs/Register/Register.log', Logger::DEBUG)
  );
  $register = $usermanager->Register("test", "test", "test", "test", "test", "test", "test", "test");

  $token = $register['data']['token'];

  $id = $register['data']['user']['id'];

  $response = [
    "status" => "success",
    "message" => "ثبت‌نام با موفقیت انجام شد55S22.",
    "data" => [
      "token" => $token,
      "user" => [
        "id" => $id,
        "first_name" => "test",
        "last_name" => "last_name",
        "company_name" => "test company",
        "email" => "email",
        "mobile" =>  "phone"
      ]
    ]

  ];

  $logger->debug("response", [
    $response
  ]);
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
