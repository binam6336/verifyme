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
            new StreamHandler(__DIR__ . '/../../../Logs/WARNING/htmlpurifier/bad-script.log', Logger::WARNING)
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
        foreach ($data as $key => $value) {
            if (is_null($value) || empty($value) || is_null($password) || empty($password)) {
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
                    "security error" => "don't use bad characters"
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
        if ($this->model->NewUser($data)) {
            return [
                "status" => "status",
                "message" => "ثبت‌نام با موفقیت انجام شد.",
                "data" => [
                    "token" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "user" => [
                        "id" => 102,
                        "first_name" => "علی",
                        "last_name" => "محمدی",
                        "company_name" => "صوتی تصویری پارس",
                        "email" => "info@company.com",
                        "mobile" => "09123456789"
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
    public function ReadUser() {}
    public function GetAllUsers() {}
    public function DeleteUser() {}
}
$a = new Usermanager;
print_r($a->Register("test", "test", "test", "test", "test", "test", "test<>"));
