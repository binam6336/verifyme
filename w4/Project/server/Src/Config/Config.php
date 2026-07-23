<?php

namespace Src\Config;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . "/../../vendor/autoload.php";


use PDO;

class Config
{
    private $dbname = "crm";
    private $username = "root";
    private $password = "";

    private PDO $conn;

    public function __construct()
    {
        $this->conn = new PDO(
            "mysql:host=localhost;dbname=$this->dbname;charset=utf8mb4",
            "$this->username",
            "$this->password"
        );

        $this->conn->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );
    }

    public function getConnection(): PDO
    {
        return $this->conn;
    }
}
