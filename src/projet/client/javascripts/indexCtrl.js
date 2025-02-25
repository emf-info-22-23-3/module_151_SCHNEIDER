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
 * Méthode appelée lors du retour avec succès du résultat de la réservatiob
 * @param {type} data - Les données retournées par le serveur.
 * @param {type} text - Le texte de réponse du serveur.
 * @param {type} jqXHR - L'objet XMLHttpRequest pour le détail de la requête.
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
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} request - L'objet de la requête.
 * @param {type} status - Le statut de la réponse.
 * @param {type} error - Le message d'erreur retourné.
 */
function CallbackError(request, status, error) {
  // Affiche une alerte avec les détails de l'erreur
  alert("Erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const tableNumber = params.get("tableNumber");

  // Sélectionne les éléments DOM pour les boutons
  var prevButton = $("#prevButton");
  var nextButton = $("#prevButton");
  var reserveButton = $("#reserveButton");
  var connecxtButton = $("#connectOrDisconnect")

  var loggued = getLoggued();

  if(loggued === true) {
    connectButton.text("Se déconnecter");
  } else {
    connectButton.text("Se connecter")
  }

  reserveButton.click(function (event) {
    event.preventDefault();

    reserverTable(tableNumber, reserveSuccess, CallbackError);
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
