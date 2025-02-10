<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"] ?? "";
$password = $data["password"] ?? "";


$users = [
    "SchneiderB" => "Emf123"
];

if (isset($users[$username]) && $users[$username] === $password) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>