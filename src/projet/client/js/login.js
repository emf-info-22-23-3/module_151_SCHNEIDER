/*
 * Contrôleur de la vue "login.html"
 *
 * @author Schneider Baptiste
 * @version 1.0 / 17-FEB-2025
 */

/**
 * Méthode appelée lors du retour avec succès du résultat de la connexion
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function connectSuccess(data, text, jqXHR) {
    if ($(data).find("result").text() == 'true') {
        // Connexion réussie
        window.location.href = "index.html";
    } else {
        // Erreur lors de la connexion
        $("#errorMessage").text("Nom d'utilisateur ou mot de passe incorrect").show();
    }
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} request
 * @param {type} status
 * @param {type} error
 */
function CallbackError(request, status, error) {
    alert("Erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function() {
    var butConnect = $("#connect");

    // Lorsque l'utilisateur clique sur le bouton de connexion
    butConnect.click(function(event) {
        event.preventDefault();  // Empêche l'envoi du formulaire par défaut
        var username = $("#username").val();
        var password = $("#password").val();

        if (username && password) {
            // Appel de la fonction connect
            connect(password, connectSuccess, CallbackError);
        } else {
            // Si les champs sont vides, afficher un message d'erreur
            $("#errorMessage").text("Veuillez remplir tous les champs").show();
        }
    });
});
