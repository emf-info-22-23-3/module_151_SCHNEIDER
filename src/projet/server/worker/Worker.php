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
function reserveTable($currentTable, $username) {
    $db = Connexion::getInstance();

    //Vérifier si la table est pleine
    $query = "SELECT COUNT(*) as total FROM TR_Client_Table WHERE FK_Table = :currentTable";
    $params = [":currentTable" => $currentTable];
    $result = $db->selectSingleQuery($query, $params);

    if ($result && $result['total'] < 4) {
        //Récupérer l'ID du client à partir du nom d'utilisateur
        $clientQuery = "SELECT PK_Client FROM T_Client WHERE NomUtilisateur = :username";
        $clientParams = [":username" => $username];
        $client = $db->selectSingleQuery($clientQuery, $clientParams);

        if (!$client) {
            return ["result" => false, "error" => "Client introuvable"];
        }

        $clientId = $client['PK_Client'];

        //Faire l'INSERT avec l'ID client
        $insertQuery = "INSERT INTO TR_Client_Table (FK_Client, FK_Table) 
                        VALUES (:clientId, (SELECT PK_Table FROM T_Table WHERE Numero = :currentTable))";
        $insertParams = [":clientId" => $clientId, ":currentTable" => $currentTable];

        if ($db->executeQuery($insertQuery, $insertParams)) {
            return ["result" => true, "message" => "Table réservée"];
        } else {
            return ["result" => false, "error" => "Erreur lors de la réservation"];
        }

    } else {
        return ["result" => false, "error" => "Table complète"];
    }
}

function getReservation($currentTable) {
    $db = Connexion::getInstance();
    $query = "SELECT NomUtilisateur FROM t_client 
	          INNER JOIN tr_client_table ON fk_client = pk_client 
              INNER JOIN t_table ON fk_table = pk_table
              WHERE NUMERO = :table;";
    $params = [":table" => $currentTable];
    $rows = $db->selectQuery($query, $params);
    
    if ($rows) {
        $players = array_map(function($row) {
            return $row['NomUtilisateur'];
        }, $rows);

        return [
            "result" => true,
            "players" => $players
        ];
    } else {
        return [
            "result" => true,
            "players" => []
        ];
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
