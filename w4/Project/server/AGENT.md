backend agent mode
1. Project Overview & Architecture
This project is a custom PHP-based backend system for a Warranty & Product Management Panel. It provides API endpoints for frontend interactions (Registration, Authentication, Dashboard Metrics, Product Management).

Backend Stack: PHP 8.x (Native / Custom Architecture), MySQL.

Key Dependencies:

ezyang/htmlpurifier: Input sanitization and XSS protection.

monolog/monolog: Centralized logging.

guzzlehttp/guzzle: HTTP client for external service integration.

phpunit/phpunit: Automated unit and integration testing.

phpstan/phpstan: Static code analysis.

Architecture Pattern: Custom MVC / Service-Oriented (Controllers, Models, and Dedicated Services for Auth and Data Cleaning).

2. Directory Structure & Key Components
Plaintext
/
├── assets/                       # Static UI assets (CSS, Icons, GIF loaders)
├── config/
│   ├── api-config.js             # Frontend API integration & Base URL configuration
│   ├── API-CONTRACT.md           # API specification and contract guidelines
│   └── database-sql/             # Database schemas
│       ├── DB.sql                # Core database schema
│       └── companyTables.sql     # Multi-tenant / Company tables schema
├── server/                       # Core PHP Backend
│   ├── api/                      # Public/Private API Route Endpoints
│   │   └── company/
│   │       ├── auth/register/    # User/Company registration endpoint (index.php)
│   │       ├── dashboard/init/   # Initial dashboard data endpoint
│   │       └── products/create/  # Product creation endpoint
│   ├── Logs/                     # Application & Security Logs (WARNING/databse, htmlpurifier)
│   ├── Src/                      # Main Source Code (PSR-4 compliant)
│   │   ├── App/
│   │   │   ├── Controller/       # Controllers (Productmanager.php, Usermanager.php)
│   │   │   └── Model/            # Data Layer (Productmanager.php, Usermanager.php)
│   │   ├── Config/               # System & DB Configurations (Config.php)
│   │   └── Services/             # Cross-cutting Services
│   │       ├── Authorization/    # Auth & Security (Authorization.php, Ipchecker.php)
│   │       └── Cleardata/        # Input Validation & Sanitization
│   │           ├── Emailvalidator/
│   │           ├── Htmlclear/
│   │           └── Mobilevalidator/
│   ├── vendor/                   # Composer dependencies
│   ├── composer.json             # PHP dependencies and autoloading config
│   └── composer.lock
└── index2.html / dashboard / ... # Frontend Interface Modules
3. Strict Development & Coding Guidelines
When writing or modifying backend code in this repository, strictly adhere to the following rules:

A. Code Style & PHP Standards
PSR Compliance: Follow PSR-1, PSR-4 (Autoloading via Src/), and PSR-12 coding style conventions.

Type Safety: Always declare strict types at the top of PHP files: declare(strict_types=1);.

No Raw Queries: Never execute unsanitized string SQL queries. Always use PDO prepared statements within Model classes.

B. Security & Input Handling
Input Sanitization: Every payload received from API endpoints must pass through the Cleardata services:

HTML inputs must be sanitized using Htmlclear (HTMLPurifier wrapper).

Emails and Mobile numbers must be strictly validated using Emailvalidator and Mobilevalidator.

Authorization & IP Checks: Verify active user sessions and IP integrity using Authorization and Ipchecker before serving protected endpoints.

Password Security: Use password_hash() with PASSWORD_BCRYPT or PASSWORD_ARGON2I for password hashing.

C. API Response Contract
Content-Type: All API responses must strictly return JSON with header: header('Content-Type: application/json; charset=utf-8');.

Response Payload Standard:

Success: {"status": "success", "data": { ... }, "message": "..."}

Error: {"status": "error", "message": "...", "code": HTTP_STATUS_CODE}

4. Key Workflows & Commands
Composer & Package Management
Install dependencies:

Bash
composer install
Dump Autoloader after adding new classes in Src/:

Bash
composer dump-autoload
Code Quality & Static Analysis
Run static analysis with PHPStan before submitting changes:

Bash
./vendor/bin/phpstan analyse Src --level=5
Running Tests
Execute unit and integration tests using PHPUnit:

Bash
./vendor/bin/phpunit
5. Important AI Agent Instructions
Database Rules: Always refer to config/database-sql/ for schema definitions before drafting new queries or Model methods.

Base URL & Ports: Do not hardcode ports or base URLs inside PHP scripts. Utilize Src/Config/Config.php and respect settings in config/api-config.js.

Logging: Write system errors to appropriate log files using Monolog (server/Logs/WARNING/). Never display raw PHP errors or stack traces in API JSON responses.