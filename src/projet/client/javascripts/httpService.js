/*
 * Couche de services HTTP (worker).
 *
 * @author Schneider Baptiste
 * @version 1.0
 */

var BASE_URL = "http://localhost:8080/projet/server/server.php";
var loggued;

/**
 * Fonction permettant de vérifier si l'utilisateur est connecté.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function checkSession(successCallback, errorCallback) {
  // Envoi de la requête AJAX pour vérifier la session
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
 * Fonction pour se connecter avec un nom d'utilisateur et un mot de passe.
 * @param {string} username - Nom d'utilisateur.
 * @param {string} password - Mot de passe.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function connect(username, password, successCallback, errorCallback) {
  // Envoi de la requête AJAX pour tenter une connexion
  let body = { "action": "connect", "username": username, "password": password };
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify(body),
    success: successCallback,
    /**
     * function (response) {
        sessionStorage.setItem("loggued", true);
        loggued = true;
    }
     */
    error: errorCallback,
  });
}

/**
 * Fonction pour se déconnecter.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function disconnect(successCallback, errorCallback) {
  // Envoi de la requête AJAX pour déconnecter l'utilisateur
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify({ action: "disconnect" }),
    success: successCallback,
/**
 * function (response) {
      if(response.status === "success") {
        sessionStorage.removeItem("loggued")
      }
    },
 */
    error: errorCallback,
  });
}

/**
 * Fonction pour réserver une table.
 * @param {number} tableNumber - Numéro de la table à réserver.
 * @param {function} successCallback - Fonction de callback en cas de succès.
 * @param {function} errorCallback - Fonction de callback en cas d'erreur.
 */
function reserverTable(tableNumber, successCallback, errorCallback) {
  // Envoi de la requête AJAX pour réserver une table spécifique
  let body = { "action": "reserve", "tableNumber": tableNumber };
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
 * Fonction pour 
 * @param {} loggued 
 * @returns 
 */

function getLoggued(loggued) {
  return loggued;
}
