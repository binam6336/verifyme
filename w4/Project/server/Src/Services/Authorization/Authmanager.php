<?php

//
// @description = این کلاس توکن رو ایجاد میکنه مشخص میکنه برای کدوم کاربره و میفرسته 
// Make and insert token in DB
// methods
// ** MakeToken
// ** InserToken
//

namespace Src\Services\Authorization;

require __DIR__ . '/../../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Src\Config\Config;

class Authmanager
{
    private $logger;

    public function __construct()
    {
        // logger
        $this->logger  = new Logger('app');

        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/../../../Logs/WARNING/', Logger::WARNING)
        );
    }

    public function MakeToken($id) {}
    public function InserToken($token) {}
}
