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
        $sql = "INSERT INTO user ( firstName , lastName , companyname , email , username , phone , password)
            VALUES ( :firstName , :lastName  , :companyname ,  :email , :username  , :phone  , :password )";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":firstName", $data['firstName']);
        $stmt->bindParam(":lastName", $data['lastName']);
        $stmt->bindParam(":companyname", $data['companyname']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":username", $data['username']);
        $stmt->bindParam(":phone", $data['phone']);
        $stmt->bindParam(":password", $data['password']);





        if ($stmt->execute()) {
            $token = $this->auth->CreateToken($this->conn->lastInsertId())['token'];
            $userid = $this->conn->lastInsertId();

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

        // change token to user id
        $token = $data['token'];

        $userid = $this->auth->GetIdWithToken($token);

        $this->logger->info("recived userid / get user", [
            $userid
        ]);

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

            $this->logger->info("fetch result / get user", [
                $result
            ]);
        }
    }
    public function GetAllUsers() {}
    public function DeleteUser() {}
}
