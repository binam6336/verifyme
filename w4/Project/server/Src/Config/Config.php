<?php

namespace Src\Config;

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require __DIR__ . "/../../vendor/autoload.php";

use Exception;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PDO;

class Config
{
    private $dbname = "crm";
    private $username = "root";
    private $password = "";

    private $logger;

    private PDO $conn;

    public function __construct()
    {

        // logger
        $this->logger  = new Logger('app');

        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/../../Logs/WARNING/databse/error.log', Logger::WARNING)
        );

        try {
            $this->conn = new PDO(
                "mysql:host=localhost;dbname=$this->dbname;charset=utf8mb4",
                "$this->username",
                "$this->password"
            );
        } catch (\Exception $e) {

            $this->logger->warning("database connection error", [
                "db username" => $this->username,
                "db name" => $this->dbname,
                "db password" => $this->password

            ]);

            throw new Exception("DB CONNECT ERROR");
        }
        // $this->conn->setAttribute(
        //     PDO::ATTR_ERRMODE,
        //     PDO::ERRMODE_EXCEPTION
        // );
    }

    public function getConnection(): PDO
    {
        return $this->conn;
    }
}
