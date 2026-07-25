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

namespace Src\App\Controller\Usermanager;

require __DIR__ . '/../../../vendor/autoload.php';

// use App\Model\Usermanager\Usermanager as ModelUsermanager;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Src\Services\Cleardata\Emailvalidator\Emailvalidator;
use Src\Services\Cleardata\Mobilevalidator\Mobilevalidator;
use Src\Services\Cleardata\Htmlclear\Htmlclear;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;

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
        // $this->model = new ModelUsermanager;

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
            if (!isNull($value) || !isEmpty($value) || !isNull($password) || !isEmpty($password)) {
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
        $data['email'] = $this->emailvalidator->ClearData([$data['email']]);

        $data['phone'] = $this->mobilevalidator->ClearData([$data['phone']]);

        return $data;

        // send to Model

    }
    public function UpdateUser() {}
    public function ReadUser() {}
    public function GetAllUsers() {}
    public function DeleteUser() {}
}
$a = new Usermanager;
print_r($a->Register("test<a>", "test", "test", "test", "test", "test", "test"));
