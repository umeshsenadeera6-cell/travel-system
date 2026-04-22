<?php
// php-backend/api/packages.php
require_once '../config/db.php';
require_once '../utils/cors.php';
require_once '../utils/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];

// Helper to encode JSON fields
function prepareData($data) {
    $jsonFields = ['gallery', 'highlights', 'itinerary', 'inclusions', 'exclusions', 'localizations', 'route'];
    foreach ($jsonFields as $field) {
        if (isset($data[$field])) {
            $data[$field] = json_encode($data[$field]);
        }
    }
    return $data;
}

// Helper to decode JSON fields
function formatData($row) {
    $jsonFields = ['gallery', 'highlights', 'itinerary', 'inclusions', 'exclusions', 'localizations', 'route'];
    foreach ($jsonFields as $field) {
        if (isset($row[$field]) && !is_null($row[$field])) {
            $row[$field] = json_decode($row[$field], true);
        } else {
            $row[$field] = [];
        }
    }
    // Mongoose compatibility: _id vs id
    $row['_id'] = $row['id'];
    return $row;
}

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare('SELECT * FROM packages WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        $row = $stmt->fetch();
        if ($row) {
            sendResponse(formatData($row));
        } else {
            sendResponse(['message' => 'Package not found'], 404);
        }
    } else {
        $category = $_GET['category'] ?? null;
        if ($category) {
            $stmt = $pdo->prepare('SELECT * FROM packages WHERE category = ? ORDER BY created_at DESC');
            $stmt->execute([$category]);
        } else {
            $stmt = $pdo->query('SELECT * FROM packages ORDER BY created_at DESC');
        }
        $rows = $stmt->fetchAll();
        $formatted = array_map('formatData', $rows);
        sendResponse($formatted);
    }
} 
elseif ($method === 'POST') {
    requireAdmin();
    $data = getRequestBody();
    $data = prepareData($data);

    $sql = "INSERT INTO packages (title, price, image, gallery, duration, description, highlights, itinerary, inclusions, exclusions, category, type, featured, localizations, route, isLimitedTime, discountPercentage, expiryDate, seoTitle, seoDescription) 
            VALUES (:title, :price, :image, :gallery, :duration, :description, :highlights, :itinerary, :inclusions, :exclusions, :category, :type, :featured, :localizations, :route, :isLimitedTime, :discountPercentage, :expiryDate, :seoTitle, :seoDescription)";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'title' => $data['title'],
            'price' => $data['price'],
            'image' => $data['image'],
            'gallery' => $data['gallery'] ?? '[]',
            'duration' => $data['duration'],
            'description' => $data['description'],
            'highlights' => $data['highlights'] ?? '[]',
            'itinerary' => $data['itinerary'] ?? '[]',
            'inclusions' => $data['inclusions'] ?? '[]',
            'exclusions' => $data['exclusions'] ?? '[]',
            'category' => $data['category'],
            'type' => $data['type'] ?? 'Day',
            'featured' => isset($data['featured']) ? (int)$data['featured'] : 0,
            'localizations' => $data['localizations'] ?? '{}',
            'route' => $data['route'] ?? '{}',
            'isLimitedTime' => isset($data['isLimitedTime']) ? (int)$data['isLimitedTime'] : 0,
            'discountPercentage' => $data['discountPercentage'] ?? 0,
            'expiryDate' => $data['expiryDate'] ?? null,
            'seoTitle' => $data['seoTitle'] ?? '',
            'seoDescription' => $data['seoDescription'] ?? ''
        ]);
        
        $id = $pdo->lastInsertId();
        // Fetch and return the full object for frontend sync
        $stmt = $pdo->prepare('SELECT * FROM packages WHERE id = ?');
        $stmt->execute([$id]);
        $newPackage = formatData($stmt->fetch());
        sendResponse($newPackage, 201);
    } catch (Exception $e) {
        sendResponse(['message' => 'Error: ' . $e->getMessage()], 400);
    }
}
elseif ($method === 'PUT') {
    requireAdmin();
    $data = getRequestBody();
    if (!isset($data['id']) && !isset($_GET['id'])) {
        sendResponse(['message' => 'ID is required'], 400);
    }
    $id = $_GET['id'] ?? $data['id'];
    $data = prepareData($data);

    $sql = "UPDATE packages SET 
            title = :title, price = :price, image = :image, gallery = :gallery, 
            duration = :duration, description = :description, highlights = :highlights, 
            itinerary = :itinerary, inclusions = :inclusions, exclusions = :exclusions, 
            category = :category, type = :type, featured = :featured, 
            localizations = :localizations, route = :route, isLimitedTime = :isLimitedTime, 
            discountPercentage = :discountPercentage, expiryDate = :expiryDate, 
            seoTitle = :seoTitle, seoDescription = :seoDescription 
            WHERE id = :id";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'title' => $data['title'],
            'price' => $data['price'],
            'image' => $data['image'],
            'gallery' => $data['gallery'] ?? '[]',
            'duration' => $data['duration'],
            'description' => $data['description'],
            'highlights' => $data['highlights'] ?? '[]',
            'itinerary' => $data['itinerary'] ?? '[]',
            'inclusions' => $data['inclusions'] ?? '[]',
            'exclusions' => $data['exclusions'] ?? '[]',
            'category' => $data['category'],
            'type' => $data['type'] ?? 'Day',
            'featured' => isset($data['featured']) ? (int)$data['featured'] : 0,
            'localizations' => $data['localizations'] ?? '{}',
            'route' => $data['route'] ?? '{}',
            'isLimitedTime' => isset($data['isLimitedTime']) ? (int)$data['isLimitedTime'] : 0,
            'discountPercentage' => $data['discountPercentage'] ?? 0,
            'expiryDate' => $data['expiryDate'] ?? null,
            'seoTitle' => $data['seoTitle'] ?? '',
            'seoDescription' => $data['seoDescription'] ?? ''
        ]);
        
        // Fetch and return the full object for frontend sync
        $stmt = $pdo->prepare('SELECT * FROM packages WHERE id = ?');
        $stmt->execute([$id]);
        $updatedPackage = formatData($stmt->fetch());
        sendResponse($updatedPackage);
    } catch (Exception $e) {
        sendResponse(['message' => 'Error: ' . $e->getMessage()], 400);
    }
}
elseif ($method === 'DELETE') {
    requireAdmin();
    $id = $_GET['id'] ?? null;
    if (!$id) {
        sendResponse(['message' => 'ID is required'], 400);
    }
    
    $stmt = $pdo->prepare('DELETE FROM packages WHERE id = ?');
    $stmt->execute([$id]);
    sendResponse(['message' => 'Package deleted']);
}
else {
    sendResponse(['message' => 'Method not allowed'], 405);
}
