<?php

namespace Services\Cleardata;

use HTMLPurifier;
use HTMLPurifier_Config;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

require __DIR__ . '/../../../vendor/autoload.php';

class Cleardata
{
    private $logger;
    private $purifierconf;
    private $purifier;



    public function __construct()
    {
        // logger
        $this->logger = new Logger('app');
        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/app.log', Logger::DEBUG)
        );

        // HTML purifier
        $this->purifierconf = HTMLPurifier_Config::createDefault();
        $this->purifier = new HTMLPurifier($this->purifierconf);
    }
}
