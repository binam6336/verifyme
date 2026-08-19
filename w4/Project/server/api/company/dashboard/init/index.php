<?php

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Src\App\Controller\Usermanager;

require __DIR__ . "/../../../../vendor/autoload.php";

// حل مشکل دسترسی و پیش‌پرواز مرورگر
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


$logger = new Logger('app');

$logger->pushHandler(
    new StreamHandler(__DIR__ . '/app.log', Logger::INFO)
);


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$usermanager = new Usermanager;

$token = getallheaders()['Authorization'] ?? "NULl";

$userdata = $usermanager->ReadUser($token);

// userdata
$firstname = $userdata['firstname'];
$lastName = $userdata['lastName'];
$companyname = $userdata['companyname'];

// company status
if ($userdata['company_status'] == 1) {
    $company_status = "active";
} else $company_status = "deactive";


$response = [
    "status" => "success",
    "data" => [
        "user" => [
            "name" => $firstname . " " . $lastName,
            "role" => "تولید کننده",
            "company_name" => $companyname,
            "company_status" => $company_status,
            "avatar" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTtsmPeViVO3WNJ84YBB5uqYSyk_HTq0l4vDUm-facA&s=10",
            "stats" => [
                "total_products" => 500,
                "active_warranties" => 120,
                "pending_activations" => 380
            ]
        ]
    ]
];

echo json_encode($response);
