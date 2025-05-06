<?php

/*
 * Contrôleur principal gérant les requêtes AJAX pour les actions utilisateur
 *
 * @author Schneider Baptiste
 * @version 2.0 / 06-MAI-2025
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include_once 'worker/Worker.php';

$json = file_get_contents('php://input');
$receivedParams = json_decode($json, true);

// Vérifier si la requête est un POST et contient une action
if (isset($_SERVER['REQUEST_METHOD'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($receivedParams['action'])) {

            /**
             * Action : "connect"
             * Permet à un utilisateur de se connecter en fournissant un nom d'utilisateur et un mot de passe.
             * Initialise une session utilisateur si les identifiants sont valides.
             * Retourne un objet JSON contenant le résultat de la tentative de connexion.
             */

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

            /**
             * Action : "reserve"
             * Permet à un utilisateur authentifié de réserver une table spécifique.
             * L'utilisateur doit être connecté et l'identifiant de la table doit être fourni.
             */

            if ($receivedParams["action"] == "reserve") {
                if (isset($receivedParams['currentTable'])) {
                    $currentTable = $receivedParams['currentTable'];
                    if (isset($_SESSION['loggued'])) {
                        $username = $_SESSION['loggued'];
                        $response = reserveTable($currentTable, $username);

                        if ($response['result'] === true) {
                            http_response_code(200);
                        } else {
                            http_response_code(400);
                        }

                        echo json_encode($response);

                    } else {
                        http_response_code(401);
                        echo json_encode(["result" => false, "error" => "Utilisateur non connecté"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["result" => false, "error" => "Paramètres manquants"]);
                }
            }

            /**
             * Action : "check_session"
             * Vérifie si une session utilisateur est actuellement active.
             * Utile pour maintenir l'état de connexion côté client.
             */

            if ($receivedParams['action'] == "check_session") {
                $response = checkSession();
                if($response['result'] === true){
                    http_response_code(200);
                } else {
                    http_response_code(400);
                }
                
                echo json_encode($response);
            }

            /**
             * Action : "disconnect"
             * Déconnecte l'utilisateur en supprimant les données de session.
             */

            if ($receivedParams['action'] == "disconnect") {
                $response = disconnectUser();
                http_response_code(200);
                echo json_encode($response);
            }
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        /**
         * Action : "get_reservation"
         * Récupère l’état de réservation d’une table à partir de son identifiant.
         * L’action est transmise via les paramètres de l’URL.
         */

        if (isset($_GET['action']) && $_GET['action'] === 'get_reservation') {
            if (isset($_GET['currentTable'])) {
                $currentTable = $_GET['currentTable'];
                $response = getReservation($currentTable);
    
                if ($response['result'] === true) {
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
    }
    
}
?>