<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include_once 'worker/Connexion.php';

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
                        // Vérification du mot de passe
                        if (password_verify($password, $user['password'])) {
                            // Connexion réussie
                            $_SESSION['loggued'] = $username;
                            $_SESSION['status'] = 'loggued';
                            http_response_code(200);
                            echo json_encode(["result" => true, "message" => "Connecté"]);
                        } else {
                            http_response_code(400);
                            echo json_encode(["result" => false, "error" => "Mot de passe incorrect"]);
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(["result" => false, "error" => "Utilisateur non trouvé"]);
                    }
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
                        $query = "SELECT COUNT(*) as total FROM TR_Client_Table WHERE FK_Table = :tableNumber";
                        $params = [":tableNumber" => $tableNumber];
                        $result = $db->selectSingleQuery($query, $params);

                        if ($result && $result['total'] < 4) {
                            $insertQuery = "INSERT INTO TR_Client_Table (FK_Client, FK_Table) 
                                            VALUES ((SELECT PK_Table FROM T_Table WHERE Numero = :tableNumber), :username)";
                            $insertParams = [":tableNumber" => $tableNumber, ":username" => $username];

                            if ($db->executeQuery($insertQuery, $insertParams)) {
                                http_response_code(200);
                                echo json_encode(["result" => true, "message" => "Table réservée"]);
                            } else {
                                http_response_code(500);
                                echo json_encode(["result" => false, "error" => "Erreur lors de la réservation"]);
                            }
                        } else {
                            http_response_code(409);
                            echo json_encode(["result" => false, "error" => "Table complète"]);
                        }
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
                if (isset($_SESSION['loggued']) && $_SESSION['status'] == 'loggued') {
                    http_response_code(200);
                    echo json_encode(["result" => true]);
                } else {
                    http_response_code(401);
                    echo json_encode(["result" => false]);
                }
            }

            // Action pour se déconnecter
            if ($receivedParams['action'] == "disconnect") {
                session_unset();
                http_response_code(200);
                echo json_encode(["result" => true]);
            }
        }
    }
}
?>