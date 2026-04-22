<?php
// php-backend/utils/auth.php

function base64UrlEncode($data) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}

function generateJWT($payload, $secret) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode(json_encode($payload));
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = base64UrlEncode($signature);
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function validateJWT($token, $secret) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;

    list($header, $payload, $signature) = $parts;
    $validSignature = base64UrlEncode(hash_hmac('sha256', $header . "." . $payload, $secret, true));

    if ($signature !== $validSignature) return false;

    $data = json_decode(base64_decode($payload), true);
    if (isset($data['exp']) && $data['exp'] < time()) return false;

    return $data;
}

function getBearerToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}

function isAdmin() {
    $token = getBearerToken();
    if (!$token) return false;
    $decoded = validateJWT($token, JWT_SECRET);
    return $decoded && isset($decoded['role']) && $decoded['role'] === 'admin';
}

function requireAdmin() {
    if (!isAdmin()) {
        header('Content-Type: application/json', true, 401);
        echo json_encode(['message' => 'Unauthorized']);
        exit;
    }
}
