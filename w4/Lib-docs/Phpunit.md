باشه، اینم یک **چیت‌شیت جمع‌وجور ولی کاربردی PHPUnit** مثل همون Monolog و Guzzle 👇

---

# PHPUnit (چیت‌شیت سریع)

## نصب

```bash id="p1q2w3"
composer require --dev phpunit/phpunit
```

---

## ساخت اولین تست

```php id="a1b2c3"
use PHPUnit\Framework\TestCase;

class MathTest extends TestCase
{
    public function testSum()
    {
        $this->assertEquals(5, 2 + 3);
    }
}
```

---

## اجرای تست

```bash id="d4e5f6"
vendor/bin/phpunit
```

یا فایل خاص:

```bash id="g7h8i9"
vendor/bin/phpunit tests/MathTest.php
```

---

# مهم‌ترین assert ها

## برابری

```php id="j1k2l3"
$this->assertEquals(10, 5 + 5);
```

---

## true / false

```php id="m4n5o6"
$this->assertTrue(true);

$this->assertFalse(false);
```

---

## null / not null

```php id="p7q8r9"
$this->assertNull($value);

$this->assertNotNull($value);
```

---

## آرایه

### تعداد

```php id="s1t2u3"
$this->assertCount(3, ['a','b','c']);
```

### وجود مقدار

```php id="v4w5x6"
$this->assertContains('a', ['a','b','c']);
```

---

# تست تابع واقعی

```php id="y7z8a9"
function sum($a, $b)
{
    return $a + $b;
}

class MathTest extends TestCase
{
    public function testSum()
    {
        $this->assertEquals(5, sum(2, 3));
    }
}
```

---

# قانون مهم

```text id="b1c2d3"
هر متد تست باید با test شروع شود
```

مثال:

```php id="e4f5g6"
public function testLogin()
```

---

# پیام تست موفق

```text id="h7i8j9"
OK (1 test, 1 assertion)
```

---

# پیام تست خراب

```text id="k1l2m3"
Failed asserting that 4 matches expected 5
```

---

# ایده اصلی PHPUnit (خیلی مهم)

```text id="n4o5p6"
تو می‌گی: این باید 5 بده
PHPUnit چک می‌کنه: واقعاً 5 داده یا نه
```

---

# کاربرد واقعی در PHP

```text id="q7r8s9"
✔ توابع کمکی (math, validation)
✔ لاگین و auth
✔ API response
✔ پردازش JSON
✔ منطق بیزینسی
```

---

# خلاصه خیلی فشرده

اینارو اگر بلد باشی یعنی 80٪ PHPUnit رو بلدی:

```php id="t1u2v3"
$this->assertEquals()
$this->assertTrue()
$this->assertFalse()
$this->assertNull()
$this->assertCount()
$this->assertNotNull()
```

---

اگر بخوای قدم بعدی رو خیلی حرفه‌ای‌ترش کنم، می‌تونم برات توضیح بدم:

👉 Mock یعنی چی (برای API و Guzzle و لاگ)
👉 تست API واقعی
👉 ساخت تست برای پروژه باسلام

اونجا دیگه وارد سطح واقعی کار شرکتی میشی.
