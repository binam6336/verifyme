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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
  $post = file_get_contents("php://input");
  $data = json_decode($post, true);

  // check json val
  if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
  }

  $usermanager = new Usermanager;

  $logger = new Logger('app');

  $logger->pushHandler(
    new StreamHandler(__DIR__ . '/../../../../Logs/Register/Register.log', Logger::DEBUG)
  );


  $register = $usermanager->Register($data['first_name'], $data['last_name'], $data['company_name'], $data['email'], $data['mobile'], $data['mobile'], $data['password']);

  $response = $register;


  // logs

  // $logger->warning("register response", [
  //   $register
  // ]);

  // $logger->debug("input data", [$data]);
  // $logger->debug("response", [
  //   $response
  // ]);
} else {
  http_response_code(400);
  $response = [
    "status" => "error",
    "message" => "خطا در انجام عملیات",
    "errors" => [
      "method" => "متد ارسالی صحیح نیست"
    ]
  ];
}
echo json_encode($response);
