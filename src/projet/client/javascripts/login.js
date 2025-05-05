/*
 * Contrôleur de la vue "login.html"
 *
 * @author Schneider Baptiste
 * @version 1.0 / 17-FEB-2025
 */

/**
 * Méthode appelée lors du retour avec succès du résultat de la connexion
 * @param {type} data - Les données retournées par le serveur.
 * @param {type} text - Le texte de réponse du serveur.
 * @param {type} jqXHR - L'objet XMLHttpRequest pour le détail de la requête.
 */
function connectSuccess(data, text, jqXHR) {
  if (data.result === true) {
    // Connexion réussie : enregistre l'état de la session et redirige vers la page principale
    sessionStorage.setItem("loggued", true);
    loggued = true;
    window.location.href = `index.html?tableNumber=1`;
  } else {
    // Erreur lors de la connexion : affiche un message d'erreur
    $("#errorMessage")
      .text("Nom d'utilisateur ou mot de passe incorrect")
      .show();
  }
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} request - L'objet de la requête.
 * @param {type} status - Le statut de la réponse.
 * @param {type} error - Le message d'erreur retourné.
 */
function callbackError(request, status, error) {
  // Affiche une alerte avec les détails de l'erreur
  alert("Erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function () {
  var butConnect = $("#connect"); // Sélectionne le bouton de connexion

  // Lorsque l'utilisateur clique sur le bouton de connexion
  butConnect.click(function (event) {
    event.preventDefault(); // Empêche l'action par défaut du bouton

    // Appelle la fonction connect() avec les valeurs des champs utilisateur et mot de passe
    connect(
      document.getElementById("username").value, // Récupère la valeur du champ "username"
      document.getElementById("password").value, // Récupère la valeur du champ "password"
      connectSuccess, // Fonction de callback en cas de succès
      callbackError // Fonction de callback en cas d'erreur
    );
  });
});
