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

class Usermanager
{

    private $logger;

    public function __construct()
    {
        // logger
        $this->logger  = new Logger('app');

        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/app.log', Logger::DEBUG)
        );
    }

    public function NewUser(array $data)
    {
        return $data;
    }
    public function UpdateUser() {}
    public function GetUser() {}
    public function GetAllUsers() {}
    public function DeleteUser() {}
}
