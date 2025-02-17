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
    if (isset($_POST['action'])) {
        if ($_POST['action'] == "connect") {
            if (isset($_POST['username']) && isset($_POST['password'])) {
                // Vérification des identifiants
                if ($_POST['username'] === $valid_username && $_POST['password'] === $valid_password) {
                    // Enregistrer le username dans la session
                    $_SESSION['logged'] = $valid_username;
                    echo '<result>true</result>';
                    print_r($_POST);
                } else {
                    // Effacer la variable de session si les identifiants sont incorrects
                    session_unset();
                    echo '<result>false</result>';
                }
            } else {
                echo 'test faux';
                echo '<result>false</result>';
            }
        }

        if ($_POST['action'] == "disconnect") {
            // Effacer la variable de session 'logged'
            session_unset();
            echo '<result>true</result>';
        }
    }
}
?>