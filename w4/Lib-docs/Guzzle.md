برای Guzzle میشه یک کتاب نوشت 😄 ولی سعی می‌کنم یه چیت‌شیت جامع و کاربردی بنویسم که بعداً هم بتونی نگهش داری.

# Guzzle چیست؟

کتابخانه‌ای برای ارسال درخواست‌های HTTP در PHP.

نصب:

```bash
composer require guzzlehttp/guzzle
```

استفاده:

```php
use GuzzleHttp\Client;

$client = new Client();
```

---

# ساخت Client

ساده:

```php
$client = new Client();
```

با تنظیمات:

```php
$client = new Client([
    'base_uri' => 'https://api.example.com',
    'timeout' => 30,
]);
```

حالا:

```php
$client->get('/users');
```

درواقع می‌شود:

```text
https://api.example.com/users
```

---

# درخواست GET

```php
$response = $client->get('/users');
```

---

# دریافت بدنه پاسخ

```php
$body = $response->getBody();

echo $body;
```

---

# تبدیل JSON به آرایه

این خیلی رایج است:

```php
$data = json_decode(
    $response->getBody(),
    true
);

print_r($data);
```

---

# دریافت Status Code

```php
$status = $response->getStatusCode();

echo $status;
```

مثال:

```text
200
201
400
401
404
500
```

---

# دریافت Header

```php
$contentType = $response->getHeaderLine(
    'Content-Type'
);
```

---

# Query Parameters

مثلاً:

```text
/users?page=1&limit=10
```

در Guzzle:

```php
$response = $client->get('/users', [
    'query' => [
        'page' => 1,
        'limit' => 10
    ]
]);
```

---

# ارسال POST

```php
$response = $client->post('/login', [
    'json' => [
        'username' => 'admin',
        'password' => '123'
    ]
]);
```

خودش:

```php
json_encode()
```

و:

```http
Content-Type: application/json
```

را اضافه می‌کند.

---

# ارسال PUT

```php
$response = $client->put('/user/1', [
    'json' => [
        'name' => 'Mahyar'
    ]
]);
```

---

# ارسال PATCH

```php
$response = $client->patch('/user/1', [
    'json' => [
        'name' => 'Mahyar'
    ]
]);
```

---

# ارسال DELETE

```php
$response = $client->delete('/user/1');
```

---

# ارسال Header

مثلاً Bearer Token:

```php
$response = $client->get('/orders', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
```

---

# چند Header

```php
'headers' => [
    'Authorization' => 'Bearer xxx',
    'Accept' => 'application/json'
]
```

---

# ارسال Form Data

بعضی API ها JSON نمی‌خواهند:

```php
$response = $client->post('/login', [
    'form_params' => [
        'username' => 'admin',
        'password' => '123'
    ]
]);
```

---

# تفاوت json و form_params

JSON:

```json
{
  "username":"admin"
}
```

Form:

```text
username=admin
```

---

# Timeout

```php
$client = new Client([
    'timeout' => 10
]);
```

بعد از 10 ثانیه خطا می‌دهد.

---

# مدیریت خطا

```php
try {

    $response = $client->get('/users');

} catch (\Exception $e) {

    echo $e->getMessage();

}
```

---

# گرفتن متن خطا

```php
catch (\Exception $e) {

    echo $e->getMessage();

}
```

---

# خطاهای اختصاصی Guzzle

```php
use GuzzleHttp\Exception\RequestException;
```

مثال:

```php
try {

} catch (RequestException $e) {

    echo $e->getMessage();

}
```

---

# جلوگیری از Exception روی 404

به طور پیشفرض:

```php
404
500
```

خطا پرتاب می‌کنند.

اگر نمی‌خواهی:

```php
$response = $client->get('/users', [
    'http_errors' => false
]);
```

---

# بررسی وضعیت

```php
if ($response->getStatusCode() == 200) {

}
```

---

# آپلود فایل

```php
$response = $client->post('/upload', [
    'multipart' => [
        [
            'name' => 'file',
            'contents' => fopen(
                'image.jpg',
                'r'
            )
        ]
    ]
]);
```

---

# دانلود فایل

```php
$response = $client->get('/file.pdf');

file_put_contents(
    'file.pdf',
    $response->getBody()
);
```

---

# Basic Auth

```php
$response = $client->get('/users', [
    'auth' => [
        'username',
        'password'
    ]
]);
```

---

# ساخت API Service

کاری که در پروژه‌های واقعی می‌بینی:

```php
class Api
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.example.com'
        ]);
    }

    public function getUsers()
    {
        return $this->client->get('/users');
    }
}
```

استفاده:

```php
$api = new Api();

$response = $api->getUsers();
```

---

# الگوی رایج OAuth2

چیزی شبیه پروژه باسلام:

```php
$client = new Client([
    'base_uri' => 'https://openapi.basalam.com'
]);

$response = $client->get(
    '/v1/chats',
    [
        'headers' => [
            'Authorization' =>
                'Bearer ' . $accessToken
        ]
    ]
);

$data = json_decode(
    $response->getBody(),
    true
);
```

---

# متدهایی که ۹۰٪ استفاده می‌کنی

```php
$client = new Client();

$client->get();
$client->post();

$response->getBody();
$response->getStatusCode();

json_decode();

headers
query
json
form_params

try/catch
```

اگر همین‌ها را خوب یاد بگیری، عملاً می‌توانی اکثر APIهای REST از جمله باسلام، زرین‌پال، درگاه‌های پیامک و سرویس‌های مشابه را بدون نیاز به cURL خام مدیریت کنی.
