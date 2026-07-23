<?php

if($_SERVER['REQUEST_METHOD'] == ' POST'){
    $response = [
  "status"=> "error",
  "message"=> "ثبت‌نام با موفقیت انجام شد222.",
    "errors" => [
        "mobile" => "حطا در پردازش"
    ]
    ];

    echo json_encode($response);
    }