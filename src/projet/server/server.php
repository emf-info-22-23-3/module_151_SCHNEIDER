<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_start();

$json = file_get_contents(filename: 'php://input');
$receivedParams = json_decode($json, true);

// Identifiants de base
$valid_username = "SchneiderB";
$valid_password = "emf";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($receivedParams['action'])) {
        if ($receivedParams['action'] == "login") { // Corrigé "connect" en "login"
            if (isset($receivedParams['username']) && isset($receivedParams['password'])) {
                if ($receivedParams['username'] === $valid_username && $receivedParams['password'] === $valid_password) {
                    $_SESSION['logged'] = $valid_username;
                    echo json_encode(["result" => true]);
                } else {
                    session_unset();
                    echo json_encode(["result" => false]);
                }
            } else {
                echo json_encode(["result" => false]);
            }
        }

        if ($receivedParams['action'] == "disconnect") {
            session_unset();
            echo json_encode(["result" => true]);
        }
    }
}
?>