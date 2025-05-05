<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include_once 'worker/worker.php';

$json = file_get_contents('php://input');
$receivedParams = json_decode($json, true);

// Vérifier si la requête est un POST et contient une action
if (isset($_SERVER['REQUEST_METHOD'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($receivedParams['action'])) {

            // Action pour se connecter
            if ($receivedParams['action'] == "connect") {
                if (isset($receivedParams['username']) && isset($receivedParams['password'])) {
                    $username = $receivedParams['username'];
                    $password = $receivedParams['password'];

                    $response = connectUser($username, $password);

                    if ($response['result'] === true) {
                        $_SESSION['loggued'] = $username;
                        $_SESSION['status'] = 'loggued';
                        http_response_code(200);
                    } else {
                        http_response_code(400);
                    }

                    echo json_encode($response);
                } else {
                    http_response_code(400);
                    echo json_encode(["result" => false, "error" => "Paramètres manquants"]);
                }
            }

            // Action pour réserver une table
            if ($receivedParams["action"] == "reserve") {
                if (isset($receivedParams['tableNumber'])) {
                    $tableNumber = $receivedParams['tableNumber'];
                    if (isset($_SESSION['loggued'])) {
                        $username = $_SESSION['loggued'];
                        $response = reserveTable($tableNumber, $username);
                        echo json_encode($response);
                        http_response_code($response['result'] === true ? 200 : 400);
                    } else {
                        http_response_code(401);
                        echo json_encode(["result" => false, "error" => "Utilisateur non connecté"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["result" => false, "error" => "Paramètres manquants"]);
                }
            }

            // Action pour vérifier si l'utilisateur est déjà connecté
            if ($receivedParams['action'] == "check_session") {
                $response = checkSession();
                http_response_code($response['result'] === true ? 200 : 401);
                echo json_encode($response);
            }

            // Action pour se déconnecter
            if ($receivedParams['action'] == "disconnect") {
                $response = disconnectUser();
                http_response_code(200);
                echo json_encode($response);
            }
        }
    }
}
?>
