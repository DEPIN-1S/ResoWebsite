<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, bool $success, string $message): never
{
    http_response_code($status);
    echo json_encode(
        ['success' => $success, 'message' => $message],
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );
    exit;
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function cleanSingleLine(mixed $value): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = strip_tags($value);
    $value = preg_replace('/[\r\n\t\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    return trim(preg_replace('/\s{2,}/u', ' ', $value) ?? '');
}

function cleanMessage(mixed $value): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = strip_tags($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return trim($value);
}

function isRateLimited(string $clientIp): bool
{
    $limit = 5;
    $windowSeconds = 15 * 60;
    $now = time();
    $file = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'resco-enquiry-' . hash('sha256', $clientIp) . '.json';
    $handle = @fopen($file, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return false;
    }

    $contents = stream_get_contents($handle);
    $attempts = is_string($contents) ? json_decode($contents, true) : [];
    $attempts = is_array($attempts) ? $attempts : [];
    $attempts = array_values(array_filter(
        $attempts,
        static fn ($timestamp): bool => is_int($timestamp) && $timestamp > ($now - $windowSeconds)
    ));

    $limited = count($attempts) >= $limit;
    if (!$limited) {
        $attempts[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($attempts));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed.');
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== 0) {
    respond(415, false, 'The request must contain JSON data.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 16384) {
    respond(413, false, 'The submitted enquiry is too large.');
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || $rawBody === '') {
    respond(400, false, 'Please complete all required fields.');
}

try {
    $input = json_decode($rawBody, true, 16, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, false, 'Invalid request data.');
}

if (!is_array($input)) {
    respond(400, false, 'Invalid request data.');
}

// Honeypot fields are invisible to people but commonly filled by simple bots.
if (cleanSingleLine($input['website'] ?? '') !== '') {
    respond(200, true, 'Your enquiry has been submitted successfully.');
}

$formStartedAt = filter_var($input['formStartedAt'] ?? null, FILTER_VALIDATE_INT);
$nowMilliseconds = (int) round(microtime(true) * 1000);
if ($formStartedAt === false || $formStartedAt <= 0 || ($nowMilliseconds - $formStartedAt) < 2000) {
    respond(422, false, 'Unable to send your enquiry. Please try again.');
}

$name = cleanSingleLine($input['name'] ?? '');
$email = cleanSingleLine($input['email'] ?? '');
$phone = cleanSingleLine($input['phone'] ?? '');
$message = cleanMessage($input['message'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    respond(422, false, 'Please complete all required fields.');
}

if (textLength($name) > 100 || textLength($email) > 254 || textLength($phone) > 30 || textLength($message) > 3000) {
    respond(422, false, 'One or more fields are too long.');
}

if (preg_match('/[\r\n]/', $email) || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, false, 'Please enter a valid email address.');
}

if (preg_match('/^[0-9+().\-\s]{7,30}$/', $phone) !== 1) {
    respond(422, false, 'Please enter a valid phone number.');
}

if (isRateLimited($_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
    respond(429, false, 'Too many enquiries were submitted. Please try again later.');
}

$autoloadPaths = [
    __DIR__ . '/vendor/autoload.php',
    dirname(__DIR__) . '/vendor/autoload.php',
];
$autoloadPath = null;

foreach ($autoloadPaths as $candidate) {
    if (is_file($candidate)) {
        $autoloadPath = $candidate;
        break;
    }
}

if ($autoloadPath === null) {
    error_log('Enquiry endpoint: PHPMailer autoloader was not found.');
    respond(500, false, 'Unable to send your enquiry. Please try again.');
}

require $autoloadPath;

$config = [
    'smtp_username' => getenv('GMAIL_SMTP_USERNAME') ?: '',
    'smtp_app_password' => getenv('GMAIL_SMTP_APP_PASSWORD') ?: '',
    'recipient_email' => getenv('ENQUIRY_RECIPIENT_EMAIL') ?: '',
    'from_name' => getenv('ENQUIRY_FROM_NAME') ?: 'Resco Star Website',
    'timezone' => getenv('ENQUIRY_TIMEZONE') ?: 'Asia/Dubai',
];

// On Hostinger, keep this file beside public_html, never inside it.
$configPath = dirname(__DIR__, 2) . '/resco-mail-config.php';
if (is_file($configPath)) {
    $fileConfig = require $configPath;
    if (is_array($fileConfig)) {
        $config = array_merge($config, $fileConfig);
    }
}

$smtpUsername = trim((string) ($config['smtp_username'] ?? ''));
$smtpPassword = str_replace(' ', '', trim((string) ($config['smtp_app_password'] ?? '')));
$recipientEmail = trim((string) ($config['recipient_email'] ?? ''));
$fromName = cleanSingleLine((string) ($config['from_name'] ?? 'Resco Star Website'));
$timezoneName = (string) ($config['timezone'] ?? 'Asia/Dubai');

if (
    filter_var($smtpUsername, FILTER_VALIDATE_EMAIL) === false
    || $smtpPassword === ''
    || filter_var($recipientEmail, FILTER_VALIDATE_EMAIL) === false
) {
    error_log('Enquiry endpoint: SMTP configuration is missing or invalid.');
    respond(500, false, 'Unable to send your enquiry. Please try again.');
}

try {
    $timezone = new DateTimeZone($timezoneName);
} catch (Throwable) {
    $timezone = new DateTimeZone('Asia/Dubai');
}

$submittedAt = new DateTimeImmutable('now', $timezone);
$body = implode("\n", [
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . $phone,
    '',
    'Message:',
    $message,
    '',
    'Submitted: ' . $submittedAt->format('d M Y, h:i A T'),
]);

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($smtpUsername, $fromName !== '' ? $fromName : 'Website Enquiry');
    $mail->addAddress($recipientEmail);
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'New Website Enquiry';
    $mail->Body = $body;
    $mail->isHTML(false);
    $mail->send();
} catch (Throwable) {
    error_log('Enquiry endpoint: mail delivery failed.');
    respond(500, false, 'Unable to send your enquiry. Please try again.');
}

respond(200, true, 'Your enquiry has been submitted successfully.');
