<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include_once 'worker/connexion.php';

$json = file_get_contents('php://input');
$receivedParams = json_decode($json, true);

// Vérifier si la requête est un POST et contient une action
if (isset($_SERVER['REQUEST_METHOD'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($receivedParams['action'])) {
            $db = Connexion::getInstance();

            // Action pour se connecter
            if ($receivedParams['action'] == "connect") {
                if (isset($receivedParams['username']) && isset($receivedParams['password'])) {
                    $username = $receivedParams['username'];
                    $password = $receivedParams['password'];
                    // Requête pour récupérer l'utilisateur en base de données
                    $query = "SELECT NomUtilisateur, password FROM T_Client WHERE NomUtilisateur = :username";
                    $params = [":username" => $username];
                    $user = $db->selectSingleQuery($query, $params);

                    if ($user) {
                        // Vérification du mot de passe (assume que le mot de passe est stocké haché)
                        if (password_verify($password, $user['password'])) {
                            // Connexion réussie, on stocke les informations dans la session
                            $_SESSION['logged'] = $username;   // Le nom d'utilisateur dans la session
                            $_SESSION['status'] = 'logged';    // Le statut de la session (connecté)
                            echo json_encode(["result" => true]);
                        } else {
                            echo json_encode(["result" => false, "error" => "Mot de passe incorrect"]);
                        }
                    } else {
                        echo json_encode(["result" => false, "error" => "Utilisateur non trouvé"]);
                    }
                } else {
                    echo json_encode(["result" => false, "error" => "Paramètres manquants"]);
                }
            }

            // Action pour vérifier si l'utilisateur est déjà connecté
            if ($receivedParams['action'] == "check_session") {
                if (isset($_SESSION['logged']) && $_SESSION['status'] == 'logged') {
                    echo json_encode(["result" => true]);  // La session est active, donc l'utilisateur est connecté
                } else {
                    echo json_encode(["result" => false]); // Pas de session active
                }
            }

            // Action pour se déconnecter
            if ($receivedParams['action'] == "disconnect") {
                session_unset();
                echo json_encode(["result" => true]);
            }
        }
    }
}
?>
