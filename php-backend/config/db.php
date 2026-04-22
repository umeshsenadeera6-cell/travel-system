<?php
// php-backend/config/db.php

$host = 'localhost';
$db   = 'travel_system';
$user = 'root';
$pass = ''; // Default for many local setups, adjust as needed
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     // In production, don't reveal connection details
     header('Content-Type: application/json', true, 500);
     echo json_encode(['error' => 'Database connection failed']);
     exit;
}

// Global settings/secrets
define('JWT_SECRET', 'your_jwt_secret_here'); // Change this!
define('ADMIN_SECRET', 'admin123'); // Change this!
