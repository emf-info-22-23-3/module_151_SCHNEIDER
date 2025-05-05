<?php
include_once 'Connexion.php';

// Fonction pour se connecter
function connectUser($username, $password) {
    $db = Connexion::getInstance();
    $query = "SELECT NomUtilisateur, password FROM T_Client WHERE NomUtilisateur = :username";
    $params = [":username" => $username];
    $user = $db->selectSingleQuery($query, $params);

    if ($user) {
        // Vérification du mot de passe
        if (password_verify($password, $user['password'])) {
            return ["result" => true, "message" => "Connecté"];
        } else {
            return ["result" => false, "error" => "Mot de passe incorrect"];
        }
    } else {
        return ["result" => false, "error" => "Utilisateur non trouvé"];
    }
}

// Fonction pour réserver une table
function reserveTable($tableNumber, $username) {
    $db = Connexion::getInstance();
    $query = "SELECT COUNT(*) as total FROM TR_Client_Table WHERE FK_Table = :tableNumber";
    $params = [":tableNumber" => $tableNumber];
    $result = $db->selectSingleQuery($query, $params);

    if ($result && $result['total'] < 4) {
        $insertQuery = "INSERT INTO TR_Client_Table (FK_Client, FK_Table) 
                        VALUES ((SELECT PK_Table FROM T_Table WHERE Numero = :tableNumber), :username)";
        $insertParams = [":tableNumber" => $tableNumber, ":username" => $username];

        if ($db->executeQuery($insertQuery, $insertParams)) {
            return ["result" => true, "message" => "Table réservée"];
        } else {
            return ["result" => false, "error" => "Erreur lors de la réservation"];
        }
    } else {
        return ["result" => false, "error" => "Table complète"];
    }
}

// Fonction pour vérifier la session de l'utilisateur
function checkSession() {
    if (isset($_SESSION['loggued']) && $_SESSION['status'] == 'loggued') {
        return ["result" => true];
    } else {
        return ["result" => false];
    }
}

// Fonction pour se déconnecter
function disconnectUser() {
    session_unset();
    return ["result" => true];
}
?>
