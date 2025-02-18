/*
 * Couche de services HTTP (worker).
 *
 * @author Schneider Baptiste
 * @version 1.0
 */

var BASE_URL = "http://localhost:8080/projet/server/server.php";

/**
 * Fonction permettant de vérifier si l'utilisateur est connecté.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function checkSession(successCallback, errorCallback) {
  let body = { "action": "check_session" };
  
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Fonction pour se connecter.
 * @param {string} username - Nom d'utilisateur.
 * @param {string} password - Mot de passe.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function connect(username, password, successCallback, errorCallback) {
  let body = { "action": "connect", "username": username, "password": password };
  
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Fonction pour se déconnecter.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function disconnect(successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify({ action: "disconnect" }),
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Fonction pour récupérer les données d'une table.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function getTableData(successCallback, errorCallback) {
  let body = { "action": "get_table_data" };
  
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Fonction pour réserver une table avec les joueurs.
 * @param {array} players - Tableau des noms des joueurs.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function reserveTable(players, successCallback, errorCallback) {
  let body = { "action": "reserve", "players": players };
  
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
  });
}
