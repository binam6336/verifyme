<?php

use Src\App\Controller\Usermanager;

require __DIR__ . "/../../../../vendor/autoload.php";

// حل مشکل دسترسی و پیش‌پرواز مرورگر
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$usermanager = new Usermanager;

$token = getallheaders()['Authorization'] ?? "NULl";

// $userdata =

$response = [
    "status" => "success",
    "data" => [
        "user" => [
            "name" => "شرکت مهیار نوین",
            "role" => "تولید کننده",
            "avatar" => "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png" // <-- آدرس عکس از سرور      
        ],
        "stats" => [
            "total_products" => 500,
            "active_warranties" => 120,
            "pending_activations" => 380
        ]
    ]
];

echo json_encode($response);
