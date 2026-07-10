<?php
// gallery-images.php
// Returns JSON array of image URLs found in assets/images.
// Place this file in your project root and call /gallery-images.php from the frontend.

header('Content-Type: application/json; charset=utf-8');

$imagesDir = __DIR__ . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images';

if (!is_dir($imagesDir)) {
  echo json_encode([]);
  exit;
}

$allowedExt = ['jpg','jpeg','png','gif','webp','bmp','svg','avif'];

$urls = [];
$items = scandir($imagesDir);
foreach ($items as $item) {
  if ($item === '.' || $item === '..') continue;
  $full = $imagesDir . DIRECTORY_SEPARATOR . $item;
  if (!is_file($full)) continue;

  $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
  if (!in_array($ext, $allowedExt, true)) continue;

  // Build URL relative to site root
  $urls[] = 'assets/images/' . rawurlencode($item);
}

// Natural sort for consistent ordering
natsort($urls);

echo json_encode(array_values($urls));

