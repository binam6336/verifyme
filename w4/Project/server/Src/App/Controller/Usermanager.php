<?php

//
// @description = این کلاس دیتا رو تمیز میکنه خطا ها رو هندل میکنه و در صورت صحیح بودن همه چیز دیتا رو به مدل میده
// inser and read users
// methods
// ** Register
// ** UpdateUser
// ** ReadUser
// ** GetAllUsers
// ** DeleteUser
//

namespace Src\App\Controller;

require __DIR__ . '/../../../vendor/autoload.php';


use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Src\Services\Cleardata\Emailvalidator\Emailvalidator;
use Src\Services\Cleardata\Mobilevalidator\Mobilevalidator;
use Src\Services\Cleardata\Htmlclear\Htmlclear;
use Src\App\Model\Usermanager as Modelusermanager;

class Usermanager
{

    private $htmlclear;
    private $mobilevalidator;
    private $emailvalidator;
    private $logger;
    private $model;

    public function __construct()
    {

        // Model
        $this->model = new Modelusermanager;

        // validators
        $this->htmlclear = new Htmlclear;
        $this->mobilevalidator = new Mobilevalidator;
        $this->emailvalidator = new Emailvalidator;

        // logger
        $this->logger  = new Logger('app');

        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/../../../Logs/Controller/Usermanager.log', Logger::INFO)
        );
    }

    public function Register($firstName,  $lastName,  $companyname,  $email,  $username,  $phone,  $password)
    {
        // cleaning data
        $data = [
            "firstName" => $firstName,
            "lastName" => $lastName,
            "companyname" => $companyname,
            "email" => $email,
            "username" => $username,
            "phone" => $phone

        ];


        // checking data is not null
        if (is_null($password) || empty($password)) {
            return [
                "status" => "error",
                "message" => "مقادیر ارسال نمیتواند خالی باشد لطفا پارامتر های الزامی را وارد نمایید",
                "error" => [
                    "isnull" => "data is null"
                ]
            ];
        }
        foreach ($data as $key => $value) {
            if (is_null($value) || empty($value)) {
                return [
                    "status" => "error",
                    "message" => "مقادیر ارسال نمیتواند خالی باشد لطفا پارامتر های الزامی را وارد نمایید",
                    "error" => [
                        "isnull" => "data is null"
                    ]
                ];
            }
        }

        // use html purifier method
        $clean = $this->htmlclear->CleanData($data);

        // if it has security error , return error
        if ($clean['isclean'] == false) {
            $this->logger->warning("not clean data is entered", [$data]);
            return [
                "status" => "error",
                "message" => "لطفا از کاراکتر های غیر مجاز ( <>%/ و غیره ) استفاده نکنید",
                "errors" => [
                    "security error" => "لطفا از کاراکتر های غیر مجاز ( <>%/ و غیره ) استفاده نکنید"
                ]
            ];
        }

        // hash password
        $password = password_hash($password, PASSWORD_DEFAULT);

        $data['password'] = $password;

        // chech other data
        if ($this->emailvalidator->isvalid($data['email']) == false) {
            return [
                "status" => "error",
                "message" => "لطفا یک ایمیل معتبر وارد کنید",
                "errors" => [
                    "email" => "email is not valid"
                ]
            ];
        }
        if ($this->mobilevalidator->isvalid($data['phone']) == false) {
            return [
                "status" => "error",
                "message" => "لطفا یک تلفن معتبر وارد کنید",
                "errors" => [
                    "phone" => "mobile is not valid"
                ]
            ];
        }


        // send to Model
        $send = $this->model->NewUser($data);
        if ($send['status']) {
            return [
                "status" => "success",
                "message" => "ثبت‌نام با موفقیت انجام شد.",
                "data" => [
                    "token" => $send['token'],
                    "user" => [
                        "first_name" => $data['firstName'],
                        "last_name" => $data['lastName'],
                        "company_name" => $data['companyname'],
                        "email" => $data['email'],
                        "mobile" => $data['phone'],
                        "id" => $send['id']
                    ]
                ]
            ];
        } else {
            return [
                "status" => "error",
                "message" => "خطا در اتصال به دیتابیس",
                "errors" => [
                    "DatBase" => "error on DB"
                ]
            ];
        }
    }
    public function UpdateUser() {}
    public function ReadUser(string $token)
    {

        // check null or empty
        if ($token == null || empty($token)) {
            return [
                "status" => "error",
                "message" => "خطا ! مقدار توکن صحیح نیست",
                "errors" => [
                    "Token" => "خطا در انجام عملیات ! لطفا خارج و مجدد وارد شوید"
                ]
            ];
        }
        $data = [
            "token" => $token
        ];
        $send = $this->model->GetUser($data);

        // $this->logger->info("model response", [$send]);

        if ($send['status'] == true) {
            return $send;
        } else {
            return [
                "status" => "error",
                "message" => "خطا ! مقدار توکن صحیح نیست",
                "errors" => [
                    "Token" => "خطا در انجام عملیات ! لطفا خارج و مجدد وارد شوید"
                ]
            ];
        }
    }
    public function GetAllUsers() {}
    public function DeleteUser() {}
}
$a = new Usermanager;
var_dump($b = $a->ReadUser("d3d6fb975f0f4963fd4024d8e14491f237678f6697c23807feef797e81e235b6c3c15ffcca357ac6ade23bff62b6c5fbc51fc8228e6b3ee7946fbac969c101543a77a5185436"));
