<?php

namespace Src\Services\Cleardata\Htmlclear;

use HTMLPurifier;
use HTMLPurifier_Config;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

require __DIR__ . '/../../../../vendor/autoload.php';

class Htmlclear
{
    private $logger;
    private $purifierconf;
    private $purifier;



    public function __construct()
    {
        // logger
        $this->logger = new Logger('app');
        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/../../../../', Logger::DEBUG)
        );

        // HTML purifier
        $this->purifierconf = HTMLPurifier_Config::createDefault();
        $this->purifier = new HTMLPurifier($this->purifierconf);
    }

    public function CleanData(array $data)
    {
        foreach ($data as $key => $value) {
            $clean = $this->purifier->purify($value);
            if ($clean !== $value) {
                return [
                    "isclean" => false,
                    "message" => "data s not clear",
                    "field" => $key,
                    "clean" => $data
                ];
            }
        }
        return [
            "isclean" => true,
            "message" => "is clen data",
            "clean" => $data
        ];
    }
}
