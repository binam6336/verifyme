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

  $data = json_decode(file_get_contents("php://input"), true);

  $usermanager = new Usermanager;

  $logger = new Logger('app');

  $logger->pushHandler(
    new StreamHandler(__DIR__ . '/../../../../Logs/Register/Register.log', Logger::DEBUG)
  );


  $register = $usermanager->Register("test", "test", "test", "test", "test", "test", "test", "test");

  $response = $register;


  // logs
  // $logger->debug("input data", [$data]);
  // $logger->debug("response", [
  //   $response
  // ]);
} else {
  $response = [
    "status" => "error",
    "message" => "خطا در انجام عملیات",
    "errors" => [
      "method" => "متد ارسالی صحیح نیست"
    ]
  ];
}
echo json_encode($response);
