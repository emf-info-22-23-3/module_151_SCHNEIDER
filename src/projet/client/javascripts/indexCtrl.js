/*
 * Contrôleur de la vue "index.html"
 *
 * @author Schneider Baptiste
 * @version 1.0 / 24-FEB-2025
 */

/**
 * Met à jour le texte affiché pour le numéro de la table actuelle.
 */
function updateTableNumber() {
  const tableTitle = $("h1");
  tableTitle.text(`Table ${tableNumber}/${maxTables}`);
}

/**
 * Gère l'événement de clic sur le bouton "précédent".
 * Décrémente le numéro de la table si possible et met à jour l'URL.
 */
function prevButtonClick() {
  if (tableNumber > 1) {
    tableNumber--; // Décrémentation du numéro de la table
    updateTableNumber(); // Mise à jour du titre
    window.location.href = `index.html?tableNumber=${tableNumber}`; // Mise à jour de l'URL avec le nouveau numéro de table
  }
}

/**
 * Gère l'événement de clic sur le bouton "suivant".
 * Incrémente le numéro de la table si possible et met à jour l'URL.
 */
function nextButtonClick() {
  if (tableNumber < maxTables) {
    tableNumber++; // Incrémentation du numéro de la table
    updateTableNumber(); // Mise à jour du titre
    window.location.href = `index.html?tableNumber=${tableNumber}`; // Mise à jour de l'URL avec le nouveau numéro de table
  }
}

/**
 * Méthode appelée lors du retour avec succès du résultat de la réservation.
 * @param {Object} data - Les données retournées par le serveur.
 * @param {string} text - Le texte de réponse du serveur.
 * @param {Object} jqXHR - L'objet XMLHttpRequest pour le détail de la requête.
 */
function reserveSuccess(data, text, jqXHR) {
  if (data.result === true) {
    // Réservation réussie
    window.location.href = `index.html?tableNumber=1`;
  } else {
    // Erreur lors de la réservation : affiche un message d'erreur
    $("#errorMessage").text("Erreur lors de la réservation de la table").show();
  }
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice.
 * @param {Object} request - L'objet de la requête.
 * @param {string} status - Le statut de la réponse.
 * @param {string} error - Le message d'erreur retourné.
 */
function callbackError(request, status, error) {
  // Affiche une alerte avec les détails de l'erreur
  alert("Erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Gère le succès de la déconnexion et redirige l'utilisateur vers la page de login.
 * @param {Object} data - Les données retournées par le serveur.
 * @param {string} text - Le texte de réponse du serveur.
 * @param {Object} jqXHR - L'objet XMLHttpRequest pour le détail de la requête.
 */
function disconnectSuccess(data, text, jqXHR) {
  if (data.result === true) {
    // Déconnexion réussie : nettoie la session
    sessionStorage.removeItem("loggued");
    loggued = false;
    window.location.href = 'login.html'; // Redirige vers la page de connexion
  } else {
    // Erreur lors de la déconnexion : affiche un message d'erreur 
    $("#errorMessage")
      .text("Erreur lors de la déconnexion")
      .show();
  }
}

/**
 * Gère le succès de la vérification de session.
 * @param {Object} data - Les données retournées par le serveur.
 * @param {string} text - Le texte de réponse du serveur.
 * @param {Object} jqXHR - L'objet XMLHttpRequest pour le détail de la requête.
 */
function checkSessionSuccess(data, text, jqXHR) {
  if (data.result === true) {
    // Session valide : l'utilisateur est connecté
    loggued = true;
    sessionStorage.setItem("loggued", true);
  } else {
    // Session invalide : l'utilisateur est déconnecté
    loggued = false;
    sessionStorage.removeItem("loggued");
  }
  // Appel du callback de succès avec la réponse
  successCallback(data);
}

/**
 * Méthode "start" appelée après le chargement complet de la page.
 */
$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const tableNumber = params.get("tableNumber");

  // Sélectionne les éléments DOM pour les boutons
  var prevButton = $("#prevButton");
  var nextButton = $("#nextButton");
  var reserveButton = $("#reserveButton");
  var connectButton = $("#connectOrDisconnect");

  var loggued = getLoggued();

  // Mise à jour du texte du bouton en fonction de l'état de connexion
  if (loggued === true) {
    connectButton.text("Se déconnecter");
  } else {
    connectButton.text("Se connecter");
  }

  // L'événement de déconnexion
  connectButton.on("click", function (event) {
    event.preventDefault();

    if (getLoggued() === true) {
      // Appelle disconnect avec le callback disconnectSuccess
      disconnect(disconnectSuccess, callbackError);
    } else {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de login
      console.error("Erreur lors de la déconnexion : utilisateur non connecté");
      window.location.href = 'login.html';
    }
  });

  reserveButton.click(function (event) {
    event.preventDefault();

    reserverTable(tableNumber, reserveSuccess, callbackError);
  });

  // Initialisation du titre en fonction du numéro de la table actuel
  updateTableNumber();

  // Attache les événements aux boutons
  prevButton.on("click", function (event) {
    event.preventDefault();
    prevButtonClick();
  });

  nextButton.on("click", function (event) {
    event.preventDefault();
    nextButtonClick();
  });
});
