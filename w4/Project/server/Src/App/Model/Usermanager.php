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

class Usermanager
{

    private $config;

    private $conn;

    private $logger;

    public function __construct()
    {

        // config
        $this->config = new Config;
        $this->conn = $this->config->getConnection();


        // logger
        $this->logger  = new Logger('app');

        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/app.log', Logger::DEBUG)
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

        $token = "token";

        if ($stmt->execute()) {
            return [
                "status" => true,
                "id" => $this->conn->lastInsertId(),
                "token" => $token
            ];
        } else {
            return false;
        }
    }
    public function UpdateUser() {}
    public function GetUser() {}
    public function GetAllUsers() {}
    public function DeleteUser() {}
}
