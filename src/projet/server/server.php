<?php

session_start();
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

// Simulation d'une base de données (les mots de passe doivent être hashés en production)
$users = [
    "SchneiderB" => password_hash("Emf123", PASSWORD_DEFAULT)
];

// Vérifier les identifiants
if (isset($users[$username]) && password_verify($password, $users[$username])) {
    $_SESSION["username"] = $username; // Stocker l'utilisateur en session
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
