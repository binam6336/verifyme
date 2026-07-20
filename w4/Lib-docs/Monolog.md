باشه، اینم یک **چیت‌شیت جامع و کاربردی Monolog** مثل همون Guzzle که سریع بتونی استفاده کنی 👇

---

# Monolog در PHP (چیت‌شیت کاربردی)

## نصب

```bash id="m0x9a1"
composer require monolog/monolog
```

---

## ساخت Logger

```php id="k2v8pq"
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('app');

$log->pushHandler(
    new StreamHandler(__DIR__ . '/app.log', Logger::DEBUG)
);
```

---

# نوشتن لاگ

## INFO (اتفاقات عادی)

```php id="a1b2c3"
$log->info('کاربر وارد شد');
```

---

## WARNING (هشدار)

```php id="d4e5f6"
$log->warning('موجودی کم است');
```

---

## ERROR (خطا)

```php id="g7h8i9"
$log->error('اتصال به دیتابیس قطع شد');
```

---

## DEBUG (برای تست و دیباگ)

```php id="j1k2l3"
$log->debug('مقدار متغیر', ['x' => 10]);
```

---

# لاگ با دیتا (خیلی مهم)

```php id="m4n5o6"
$log->info('سفارش ثبت شد', [
    'order_id' => 123,
    'user_id' => 5
]);
```

---

# انواع سطح لاگ (خلاصه)

```text id="p7q8r9"
DEBUG
INFO
NOTICE
WARNING
ERROR
CRITICAL
ALERT
EMERGENCY
```

(عملاً تو پروژه‌ها فقط INFO / WARNING / ERROR زیاد استفاده میشه)

---

# ذخیره در فایل جدا

```php id="s1t2u3"
$appLog = new Logger('app');
$appLog->pushHandler(new StreamHandler(__DIR__.'/app.log'));

$errorLog = new Logger('error');
$errorLog->pushHandler(new StreamHandler(__DIR__.'/error.log', Logger::ERROR));
```

---

# لاگ گرفتن داخل try/catch

```php id="v4w5x6"
try {

    throw new Exception('خطا');

} catch (Exception $e) {

    $log->error('Exception رخ داد', [
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);

}
```

---

# بررسی اینکه لاگ کجا میره

```php id="y7z8a9"
$log = new Logger('app');

$log->pushHandler(
    new StreamHandler('logs/app.log', Logger::DEBUG)
);
```

👉 هرچی از DEBUG به بالا باشه ذخیره میشه

---

# مفهوم خیلی مهم (فیلتر سطح)

```php id="b1c2d3"
new StreamHandler('app.log', Logger::WARNING)
```

یعنی:

```text id="e4f5g6"
DEBUG ❌
INFO ❌
WARNING ✔
ERROR ✔
```

---

# استفاده واقعی در پروژه (خیلی مهم)

```php id="h7i8j9"
class OrderService
{
    private $log;

    public function __construct(Logger $log)
    {
        $this->log = $log;
    }

    public function create()
    {
        $this->log->info('سفارش ساخته شد');
    }
}
```

---

# جمع‌بندی خیلی کوتاه

تو Monolog فقط اینارو باید بلد باشی:

```php id="k1l2m3"
new Logger()
pushHandler()
info()
warning()
error()
debug()
```

---

اگر بخوای قدم بعدی خیلی مهمش رو هم بهت بگم:

👉 چطور لاگ‌ها رو حرفه‌ای کنی (daily log + فایل روزانه + ساختار CRM واقعی + لاگ API باسلام)

اون دیگه سطح “پروژه واقعی شرکت” حساب میشه.
