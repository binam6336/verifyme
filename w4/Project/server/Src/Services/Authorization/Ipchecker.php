<?php

//
// @description = این کلاس 2 رقم اول آیپی ای که توکن رو ایجاد کرده با 2 رقم آیپی یوزری که از توکن استفاده میکنه رو تطبیق میده
// Match user ip 
// methods
// ** SaveToken
// ** CreateToken
//

namespace Src\Services\Authorization;

class Ipchecker
{
    public function IsMachIp($ip)
    {
        $userip = $_SERVER['REMOTE_ADDR'];
        $parts = explode(".", $userip);
        $currectip = $parts[0] . "." .  $parts[1];

        if ($currectip !== $ip) {
            return false;
        } elseif ($currectip === $ip) {
            return true;
        }
    }
}
