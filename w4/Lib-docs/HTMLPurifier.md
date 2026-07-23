برای HTMLPurifier هم میشه ساعت‌ها صحبت کرد 😄 ولی این چیت‌شیت برای ۹۰٪ نیازهای پروژه‌های واقعی کافیه.

# HTMLPurifier چیست؟

کتابخانه‌ای برای پاکسازی HTML و جلوگیری از حملات XSS.

نصب:

```bash
composer require ezyang/htmlpurifier
```

استفاده:

```php
use HTMLPurifier;
use HTMLPurifier_Config;

$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);
```

---

# پاکسازی HTML

```php
$clean = $purifier->purify($html);
```

---

# مثال

ورودی:

```html
<script>alert('XSS')</script>
<b>Hello</b>
```

خروجی:

```html
<b>Hello</b>
```

---

# تنظیم تگ‌های مجاز

```php
$config->set(
    'HTML.Allowed',
    'p,b,strong,i,em,a[href],ul,ol,li'
);

$purifier = new HTMLPurifier($config);
```

---

# اجازه تصاویر

```php
$config->set(
    'HTML.Allowed',
    'img[src|alt|width|height]'
);
```

---

# اجازه لینک

```php
$config->set(
    'HTML.Allowed',
    'a[href|title]'
);
```

---

# پاکسازی فرم

```php
$content = $_POST['content'];

$content = $purifier->purify($content);
```

---

# استفاده در پروژه

```php
$data['content'] = $purifier->purify(
    $data['content']
);

$model->create($data);
```

---

# تفاوت با strip_tags

```php
strip_tags($html);
```

همه تگ‌ها حذف می‌شوند.

مثال:

```html
<b>Hello</b>
```

خروجی:

```text
Hello
```

---

# تفاوت با htmlspecialchars

```php
htmlspecialchars($html);
```

HTML را به متن تبدیل می‌کند.

ورودی:

```html
<b>Hello</b>
```

خروجی:

```text
&lt;b&gt;Hello&lt;/b&gt;
```

---

# تفاوت HTMLPurifier

ورودی:

```html
<script>alert(1)</script>
<b>Hello</b>
```

خروجی:

```html
<b>Hello</b>
```

تگ‌های مجاز حفظ می‌شوند و کدهای مخرب حذف می‌شوند.

---

# چه چیزهایی را حذف می‌کند؟

```html
<script>
```

```html
<iframe>
```

```html
onclick=""
```

```html
onerror=""
```

```html
javascript:
```

و بسیاری از Attributeها و تگ‌های خطرناک دیگر.

---

# چه زمانی استفاده کنیم؟

✅ مقاله

✅ کامنت

✅ توضیحات محصول

✅ متن ویرایشگر (CKEditor، TinyMCE)

---

# چه زمانی استفاده نکنیم؟

❌ نام کاربر

❌ ایمیل

❌ شماره موبایل

❌ رمز عبور

برای این موارد از Validation و Sanitization مناسب استفاده کن.

---

# ساخت Service

```php
class HtmlSanitizer
{
    private HTMLPurifier $purifier;

    public function __construct()
    {
        $config = HTMLPurifier_Config::createDefault();

        $this->purifier = new HTMLPurifier($config);
    }

    public function clean(string $html): string
    {
        return $this->purifier->purify($html);
    }
}
```

---

# استفاده از Service

```php
$sanitizer = new HtmlSanitizer();

$content = $sanitizer->clean($html);
```

---

# متدهایی که ۹۰٪ استفاده می‌کنی

```php
HTMLPurifier_Config::createDefault();

$config->set();

new HTMLPurifier($config);

$purifier->purify($html);
```

اگر همین چند مورد را یاد بگیری، تقریباً تمام نیازهای مربوط به پاکسازی HTML در پروژه‌های PHP را پوشش می‌دهی. برای سایر داده‌ها مثل ایمیل، شماره موبایل و نام کاربر، از Validation و Sanitization متناسب با همان نوع داده استفاده کن، نه HTMLPurifier.