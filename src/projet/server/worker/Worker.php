<?php

/*
 * Fonctions de gestion des utilisateurs et des réservations côté serveur
 *
 * @author Schneider Baptiste
 * @version 2.0 / 06-MAI-2025
 */

include_once 'Connexion.php';

/**
 * Authentifie un utilisateur en vérifiant son nom d’utilisateur et son mot de passe.
 *
 * @param string $username Nom d’utilisateur
 * @param string $password Mot de passe saisi
 * @return array Résultat de la tentative de connexion (succès ou message d’erreur)
 */
function connectUser($username, $password) {
    $db = Connexion::getInstance();
    $query = "SELECT NomUtilisateur, password FROM T_Client WHERE NomUtilisateur = :username";
    $params = [":username" => $username];
    $user = $db->selectSingleQuery($query, $params);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            return ["result" => true, "message" => "Connecte"];
        } else {
            return ["result" => false, "error" => "Mot de passe incorrect"];
        }
    } else {
        return ["result" => false, "error" => "Utilisateur non trouve"];
    }
}

/**
 * Permet à un utilisateur de réserver une table si celle-ci n’est pas complète (4 personnes max).
 *
 * @param string $currentTable Identifiant de la table
 * @param string $username Nom d’utilisateur de l’utilisateur qui réserve
 * @return array Résultat de la réservation (succès ou message d’erreur)
 */
function reserveTable($currentTable, $username) {
    $db = Connexion::getInstance();

    $query = "SELECT COUNT(*) as total FROM TR_Client_Table WHERE FK_Table = :currentTable";
    $params = [":currentTable" => $currentTable];
    $result = $db->selectSingleQuery($query, $params);

    if ($result && $result['total'] < 4) {
        $clientQuery = "SELECT PK_Client FROM T_Client WHERE NomUtilisateur = :username";
        $clientParams = [":username" => $username];
        $client = $db->selectSingleQuery($clientQuery, $clientParams);

        if (!$client) {
            return ["result" => false, "error" => "Client introuvable"];
        }

        $clientId = $client['PK_Client'];

        $insertQuery = "INSERT INTO TR_Client_Table (FK_Client, FK_Table) 
                        VALUES (:clientId, (SELECT PK_Table FROM T_Table WHERE Numero = :currentTable))";
        $insertParams = [":clientId" => $clientId, ":currentTable" => $currentTable];

        if ($db->executeQuery($insertQuery, $insertParams)) {
            return ["result" => true, "message" => "Table reservee"];
        } else {
            return ["result" => false, "error" => "Erreur lors de la reservation"];
        }
    } else {
        return ["result" => true, "error" => "Table complète"];
    }
}

/**
 * Récupère la liste des utilisateurs ayant réservé une table donnée.
 *
 * @param string $currentTable Identifiant de la table
 * @return array Liste des noms d’utilisateurs ayant réservé cette table
 */
function getReservation($currentTable) {
    $db = Connexion::getInstance();
    $query = "SELECT NomUtilisateur FROM T_Client 
	          INNER JOIN TR_Client_Table ON fk_client = pk_client 
              INNER JOIN T_Table ON fk_table = pk_table
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

/**
 * Vérifie si une session utilisateur est active.
 *
 * @return array Résultat indiquant si l’utilisateur est connecté ou non
 */
function checkSession() {
    if (isset($_SESSION['loggued']) && $_SESSION['status'] == 'loggued') {
        return ["result" => true];
    } else {
        return ["result" => false];
    }
}

/**
 * Supprime la session utilisateur pour effectuer une déconnexion.
 *
 * @return array Résultat de l’opération de déconnexion
 */
function disconnectUser() {
    session_unset();
    return ["result" => true];
}
?>