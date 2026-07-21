<?php


$count = 1;

$serials = [];

$i = 0;

for ($i; $i < $count; $i++) {
    $random = bin2hex(random_bytes(3));
    $random2 = bin2hex(random_bytes(3));
    $random3 = bin2hex(random_bytes(3));
    $random4 = bin2hex(random_bytes(3));

    $serial = $random4 . '-' . $random3 . '-' . $random2 . '-' . $random;
    $serials[] = [
        "serial" => $serial
    ];
}
print_r($serials);
