<?php

//
// @description = این کلاس دیتای تمیز و پاکسازی شده رو از کنترلر میگیره و به دیتابیس منتقل میکنه
// inser and read users
// methods
// ** NewUser
// ** UpdateUser
// ** GetUser
// ** GetAllUsers
// ** DeleteUser
//

namespace Src\App\Model;

require __DIR__ . '/../../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Src\Config\Config;
use Src\Services\Authorization\Authorization;
use PDO;

class Usermanager
{

    private $config;

    private $conn;

    private $logger;

    private $auth;
    public function __construct()
    {

        // config
        $this->config = new Config;
        $this->conn = $this->config->getConnection();

        // authorization
        $this->auth = new Authorization;

        // logger
        $this->logger  = new Logger('app');

        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/../../../Logs/Model/Usermanager.log', Logger::INFO)
        );
    }

    public function NewUser(array $data)
    {
        $sql = "INSERT INTO user ( firstName , lastName , companyname , email , username , phone , password , company_status)
            VALUES ( :firstName , :lastName  , :companyname ,  :email , :username  , :phone  , :password , 0 )";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":firstName", $data['firstName']);
        $stmt->bindParam(":lastName", $data['lastName']);
        $stmt->bindParam(":companyname", $data['companyname']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":username", $data['username']);
        $stmt->bindParam(":phone", $data['phone']);
        $stmt->bindParam(":password", $data['password']);





        if ($stmt->execute()) {
            $userid = $this->conn->lastInsertId();

            $token = $this->auth->CreateToken($userid)['token'];

            return [
                "status" => true,
                "id" => $userid,
                "token" => $token
            ];
        } else {
            return [
                "status" => false
            ];
        }
    }
    public function UpdateUser() {}
    public function GetUser(array $data)
    {

        if (count($data) != 1 || !isset($data['token']) && !isset($data['phone'])) {

            // log error
            $this->logger->warning("در متد دریافت کاربر دیتا ورودی اشتباهه یا ناقصه یا کانفلیکت داره ؛ دیتای ورودی : ", [$data]);

            return [
                "status" => false
            ];
        }

        if (isset($data['token'])) {
            // change token to user id
            $token = $data['token'];

            $userid = $this->auth->GetIdWithToken($token)[0] ?? false;

            if ($userid == false) {
                return [
                    "status" => false
                ];
            }

            // $this->logger->info("recived userid / get user", [
            //     $userid
            // ]);

            // sql
            $sql = "
        SELECT * FROM
        user
        WHERE id = :id
        ";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":id", $userid);

            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // $this->logger->info("fetch result / get user", [
                //     $result
                // ]);

                if ($result == null || empty($result)) {
                    return [
                        "status" => false
                    ];
                }

                $firstname = $result[0]["firstName"] ?? "NULL";
                $lastName = $result[0]["lastName"] ?? "NULL";
                $companyname = $result[0]["companyname"] ?? "NULL";
                $email = $result[0]["email"] ?? "NULL";
                $username = $result[0]["username"] ?? "NULL";
                $phone = $result[0]["phone"] ?? "NULL";
                $company_status = $result[0]["company_status"] ?? "NULL";
                $id =  $result[0]["id"] ?? "NULL";

                $userdata = [
                    "status" => true,
                    "firstname" => $firstname,
                    "lastName" => $lastName,
                    "companyname" => $companyname,
                    "email" => $email,
                    "username" => $username,
                    "phone" => $phone,
                    "company_status" => $company_status,
                    "id" => $id

                ];

                // $this->logger->info(" user data to return / get user", [
                //     $userdata
                // ]);

                return $userdata;
            } else {
                return [
                    "status" => false
                ];
            }
        } elseif (isset($data['phone'])) {
        }
    }
    public function GetAllUsers() {}
    public function DeleteUser() {}
}
