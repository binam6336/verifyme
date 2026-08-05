<?php

//
// @description = این کلاس توکن رو ایجاد میکنه مشخص میکنه برای کدوم کاربره و میفرسته 
// Make and insert token in DB
// methods
// ** SaveToken
// ** CreateToken
// ** GetIdWithToken
//

namespace Src\Services\Authorization;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/../../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Src\Config\Config;
use PDO;

class Authorization
{
    private $logger;
    private $config;
    private $conn;

    public function __construct()
    {

        // Config
        $this->config = new Config;
        $this->conn = $this->config->getConnection();

        // logger
        $this->logger  = new Logger('app');

        $this->logger->pushHandler(
            new StreamHandler(__DIR__ . '/../../../Logs/WARNING/TokenError.log', Logger::INFO)
        );
    }

    public function SaveToken($token, $userid)
    {

        $expire = time() + 60 * 60 * 24 * 20;

        // if ip was 127.0.0.1 this part will save 127.0 and match with currect user ip
        $userip = $_SERVER['REMOTE_ADDR'];
        $parts = explode(".", $userip);
        $ip = $parts[0] . "." .  $parts[1];

        $sql = " INSERT INTO authorization ( token , expire , ip , userid )
            VALUES (:token , :expire, :ip , :userid)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":token", $token);
        $stmt->bindParam(":expire", $expire);
        $stmt->bindParam(":ip", $ip);
        $stmt->bindParam(":userid", $userid);

        if ($stmt->execute()) {
            return true;
        } else return false;
    }
    public function CreateToken($id)
    {
        $token = bin2hex(random_bytes(70));

        $save = $this->SaveToken($token, $id);
        if ($save == true) {
            return [
                "status" => true,
                "token" => $token
            ];
        } else {
            $this->logger->warning("Error for insert token in database");
            return [
                "status" => false
            ];
        }
    }

    public function GetIdWithToken($token)
    {
        $sql = "
        SELECT userid
        FROM authorization
        WHERE token = :token
        ";
        $stmt =  $this->conn->prepare($sql);

        $stmt->bindParam(":token", $token);

        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $this->logger->info("fetch result", [$result]);
        }
    }
}
$a = new Authorization;
$b = $a->GetIdWithToken("82a1bdad64da235f5594ff620ac8cb498b86aff983eb88ef3508bcc517e1eb64b257126594b4f74558dd431a945d942210eb7f3305e14553c0a3184ee590ababebfde0f029eb");
