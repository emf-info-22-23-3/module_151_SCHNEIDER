/*
 * Couche de services HTTP (worker).
 *
 * @author Schneider Baptiste
 * @version 1.0
 */

var BASE_URL = "http://localhost:8080/projet/server/server.php";

/**
 * Fonction permettant de charger les données d'équipe.
 * @param {type} username, nom d'utilisateur
 * @param {type} password, mot de passe
 * @param {type} Fonction de callback lors du retour avec succès de l'appel.
 * @param {type} Fonction de callback en cas d'erreur.
 */
function connect(username, password, successCallback, errorCallback) {
  let body ={"action": "login","username": username,"password": password};  
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
 * Fonction permettant de charger les données d'équipe.
 * @param {type} teamid, id de l'équipe dans laquelle trouver les joueurs
 * @param {type} Fonction de callback lors du retour avec succès de l'appel.
 * @param {type} Fonction de callback en cas d'erreur.
 */
function disconnect(successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: BASE_URL,
    dataType: "json",
    data: JSON.stringify(body),
    success: successCallback,
    error: errorCallback,
  });
}
