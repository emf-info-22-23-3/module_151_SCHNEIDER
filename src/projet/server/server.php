<?php
session_start();

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
                } else {
                    // Effacer la variable de session si les identifiants sont incorrects
                    session_unset();
                    echo '<result>false</result>';
                }
            } else {
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
