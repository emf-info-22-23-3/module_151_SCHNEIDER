/*
 * Couche de services HTTP (worker).
 *
 * Fournit les fonctions de communication avec le serveur :
 * connexion, déconnexion, réservation et consultation.
 *
 * @author Schneider Baptiste
 * @version 1.0
 */

var BASE_URL = "http://localhost:8080/projet/server/server.php";
var loggued = false;

// Restaure l'état de connexion depuis sessionStorage
if (sessionStorage.getItem("loggued") === "true") {
  loggued = true;
}

/**
 * Vérifie si la session de l'utilisateur est encore active.
 *
 * @param {function} successCallback - Fonction appelée si la session est valide.
 * @param {function} errorCallback - Fonction appelée en cas d'erreur de requête.
 */
function checkSession(successCallback, errorCallback) {
  let body = { "action": "check_session" };
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Tente de connecter l'utilisateur avec les identifiants fournis.
 *
 * @param {string} username - Nom d'utilisateur.
 * @param {string} password - Mot de passe.
 * @param {function} successCallback - Fonction appelée en cas de succès.
 * @param {function} errorCallback - Fonction appelée en cas d'échec.
 */
function connect(username, password, successCallback, errorCallback) {
  let body = { "action": "connect", "username": username, "password": password };
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Déconnecte l'utilisateur de la session en cours.
 *
 * @param {function} successCallback - Fonction appelée en cas de succès.
 * @param {function} errorCallback - Fonction appelée en cas d'échec.
 */
function disconnect(successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ action: "disconnect" }),
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Réserve une table donnée pour l'utilisateur connecté.
 *
 * @param {number} currentTable - Numéro de la table à réserver.
 * @param {function} successCallback - Fonction appelée en cas de succès.
 * @param {function} errorCallback - Fonction appelée en cas d'échec.
 */
function reserverTable(currentTable, successCallback, errorCallback) {
  let body = { "action": "reserve", "currentTable": currentTable };
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
    xhrFields: { withCredentials: true },
  });
}

/**
 * Récupère la liste des réservations pour une table donnée.
 *
 * @param {number} currentTable - Numéro de la table à consulter.
 * @param {function} successCallback - Fonction appelée avec les données.
 * @param {function} errorCallback - Fonction appelée en cas d'erreur.
 */
function getReservation(currentTable, successCallback, errorCallback) {
  let url = BASE_URL + "?action=get_reservation&currentTable=" + encodeURIComponent(currentTable);

  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    contentType: "application/json",
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Renvoie l'état de connexion actuel de l'utilisateur.
 *
 * @returns {boolean} - true si connecté, false sinon.
 */
function getLoggued() {
  return loggued;
}
