# Email and WhatsApp enquiry setup

The existing WhatsApp enquiry remains available. The email form posts JSON to
`/api/send-enquiry.php` on the same domain. No Gmail or SMTP secret is included
in the React build.

## Files involved

- `src/components/ContactSection.jsx` — WhatsApp card, email form, validation,
  loading, success, and error states.
- `src/index.css` — matching contact-form styles.
- `vite.config.js` — local-only proxy from Vite `/api` to PHP on port 8080.
- `public/api/send-enquiry.php` — validated JSON endpoint and Gmail SMTP send.
- `public/api/composer.json` — PHPMailer dependency.
- `server-config/resco-mail-config.example.php` — safe credential template.
- `.gitignore` — excludes installed PHP dependencies and local SMTP secrets.

Vite copies `public/api` into `dist/api`, so the production endpoint ends up at
`public_html/api/send-enquiry.php`.

## 1. Create a Gmail App Password

1. Sign in to the Gmail/Google account that will send the messages.
2. Open **Google Account → Security**.
3. Enable **2-Step Verification**. Google does not show App Passwords until
   2-Step Verification is active.
4. Open **Security → App passwords**. If it is not shown, visit
   `https://myaccount.google.com/apppasswords`.
5. Create an app password named `Resco Star Website`.
6. Copy the generated 16-character password once. Use this App Password, not
   the normal Gmail password.

Google Workspace administrators may need to allow App Passwords. Accounts
enrolled in Advanced Protection may not support them.

## 2. Install PHPMailer

Composer is the recommended installation method.

### Install locally before upload

From the project directory:

```bash
cd public/api
composer install --no-dev --optimize-autoloader
```

This creates `public/api/vendor`. Run the React production build afterward so
Vite copies the API directory into `dist/api`.

### Or install on Hostinger

After uploading the React build, open Hostinger Terminal/SSH and run:

```bash
cd ~/domains/YOUR-DOMAIN/public_html/api
composer install --no-dev --optimize-autoloader
```

Replace `YOUR-DOMAIN` with the real domain. If SSH/Composer is unavailable,
install locally and upload the entire generated `vendor` directory to
`public_html/api/vendor`.

The required production layout is:

```text
public_html/
├── index.html
├── assets/
└── api/
    ├── composer.json
    ├── send-enquiry.php
    └── vendor/
        └── autoload.php
```

## 3. Configure credentials securely

In Hostinger File Manager, locate the directory containing `public_html`.
Create `resco-mail-config.php` **beside** `public_html`, not inside it.

For the common Hostinger domain layout:

```text
domains/
└── example.com/
    ├── public_html/
    └── resco-mail-config.php
```

Use `server-config/resco-mail-config.example.php` as the template:

```php
<?php

return [
    'smtp_username' => 'your-business@gmail.com',
    'smtp_app_password' => 'your-16-character-app-password',
    'recipient_email' => 'where-enquiries-should-arrive@gmail.com',
    'from_name' => 'Resco Star Website',
    'timezone' => 'Asia/Dubai',
];
```

The sending Gmail address should normally match `smtp_username`. The recipient
can be the same Gmail account or another email address. Restrict this file to
owner read/write permissions (`600`) when Hostinger allows it.

The endpoint also supports server environment variables:

- `GMAIL_SMTP_USERNAME`
- `GMAIL_SMTP_APP_PASSWORD`
- `ENQUIRY_RECIPIENT_EMAIL`
- `ENQUIRY_FROM_NAME`
- `ENQUIRY_TIMEZONE`

Environment variables take effect without a config file. A config file, when
present, overrides them.

## 4. Build and upload to Hostinger

1. Use PHP 8.1 or newer in **Hostinger hPanel → PHP Configuration**.
2. Install PHPMailer using one of the methods above.
3. Create the credential file outside `public_html`.
4. Build React:

   ```bash
   npm install
   npm run build
   ```

5. Upload the **contents** of `dist` to `public_html`, not the `dist` folder
   itself.
6. Confirm these URLs exist:
   - `https://YOUR-DOMAIN/`
   - `https://YOUR-DOMAIN/api/send-enquiry.php`

Opening the endpoint in a browser sends GET and should return HTTP 405 JSON:

```json
{"success":false,"message":"Method not allowed."}
```

That response confirms PHP is executing. It does not test SMTP.

## 5. Test locally

Local testing requires PHP, Composer, Node.js, and npm on PATH.

1. Copy the config template to the project root:

   ```bash
   copy server-config\resco-mail-config.example.php resco-mail-config.php
   ```

   Fill in the real App Password. The resulting file is ignored by Git.

2. Install PHPMailer:

   ```bash
   cd public/api
   composer install
   cd ../..
   ```

3. Start PHP from the project root:

   ```bash
   php -S 127.0.0.1:8080 -t public
   ```

4. In a second terminal, start Vite:

   ```bash
   npm run dev
   ```

5. Open the Vite URL, wait at least two seconds, complete the email form, and
   submit it. Vite proxies `/api` to the local PHP server.
6. Verify receipt, the `New Website Enquiry` subject, all form values, the
   timestamp, and that Reply sends to the visitor.

Do not test the PHP endpoint through `file://` or Vite alone. Vite does not
execute PHP.

## 6. Test after deployment

1. Open the real HTTPS domain in a private/incognito window.
2. Submit all empty fields and verify client validation appears.
3. Submit an invalid email and phone number.
4. Submit one valid enquiry.
5. Confirm the success message appears without a page refresh.
6. Check the configured recipient inbox and Spam folder.
7. Reply to the message and confirm the visitor's address is used.
8. Open WhatsApp enquiry and verify the configured phone number and message.
9. In browser developer tools, confirm the request is:
   `POST /api/send-enquiry.php` with a successful `200` JSON response.

## Spam protection

The endpoint includes a hidden honeypot, a minimum form-completion time, a
16 KB request limit, and a per-IP limit of five attempts per 15 minutes.

CAPTCHA is not initially necessary. If spam becomes persistent, add Cloudflare
Turnstile: render its widget in React, send its token with the form, and verify
the token server-side using a secret stored in the same private config file.
Never rely on client-side CAPTCHA validation alone.

## Common errors

- **`405 Method not allowed`** — the endpoint was opened with GET. Submit the
  form or send a POST JSON request.
- **`500 Unable to send...` immediately** — PHPMailer is missing or the private
  config path/values are wrong. Check Hostinger PHP error logs; API responses
  intentionally hide internal details.
- **`Class PHPMailer... not found`** — run Composer in `public_html/api` or
  upload `api/vendor`.
- **Gmail authentication failed / `535-5.7.8`** — use a Gmail App Password,
  remove spaces, verify the Gmail address, and do not use the normal password.
- **App Passwords option missing** — enable 2-Step Verification; ask the Google
  Workspace administrator to permit App Passwords if applicable.
- **SMTP connection timeout** — confirm Hostinger allows outbound TCP port 587
  and that PHP OpenSSL is enabled. Ask Hostinger support if the port is blocked.
- **Endpoint downloads or displays PHP source** — PHP is not enabled for that
  domain. Stop and fix the Hostinger PHP configuration before using the form.
- **`404` for `/api/send-enquiry.php`** — upload the contents of `dist` and
  confirm the `api` folder is directly under `public_html`.
- **Form works locally but not in production** — inspect the Network response,
  verify HTTPS and the API path, then check Hostinger PHP error logs.
- **Message lands in Spam** — use the same Gmail address for SMTP and From,
  keep the visitor only as Reply-To, and avoid changing From to the visitor.
- **`429 Too many enquiries`** — wait 15 minutes; this is the basic rate limit.
