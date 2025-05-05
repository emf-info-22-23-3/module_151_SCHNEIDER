/*
 * Contrôleur de la vue "index.html"
 *
 * @author Schneider Baptiste
 * @version 1.0 / 24-FEB-2025
 */

const maxTable = 10;
var currentTable = getCurrentTable();

/**
 * Met à jour le texte affiché pour le numéro de la table actuelle.
 */
function updateTableNumber() {
  const tableTitle = $("h1");
  tableTitle.text(`Table ${currentTable}/${maxTable}`);
}

/**
 * Gère l'événement de clic sur le bouton "précédent".
 * Décrémente le numéro de la table si possible et met à jour le titre.
 */
function prevButtonClick() {
  if (currentTable > 1) {
    currentTable--; // Décrémentation du numéro de la table
    setCurrentTable(currentTable); // Mise à jour dans sessionStorage
    updateTableNumber(); // Mise à jour du titre
  }
}

/**
 * Gère l'événement de clic sur le bouton "suivant".
 * Incrémente le numéro de la table si possible et met à jour le titre.
 */
function nextButtonClick() {
  if (currentTable < maxTable) {
    currentTable++; // Incrémentation du numéro de la table
    setCurrentTable(currentTable); // Mise à jour dans sessionStorage
    updateTableNumber(); // Mise à jour du titre
  }
}

/**
 * Enregistre le numéro de la table dans sessionStorage.
 * Cette méthode est appelée chaque fois que currentTable est mis à jour.
 *
 * @param {number} tableNumber - Le numéro de la table à enregistrer.
 */
function setCurrentTable(tableNumber) {
  sessionStorage.setItem("currentTable", tableNumber);
}

/**
 * Récupère le numéro de la table depuis sessionStorage.
 * Si aucune valeur n'est stockée ou si la valeur est invalide, retourne la table 1.
 *
 * @returns {number} Le numéro de la table actuelle.
 */
function getCurrentTable() {
  const storedTable = sessionStorage.getItem("currentTable");
  if (storedTable) {
    const tableNumber = parseInt(storedTable);
    if (tableNumber >= 1 && tableNumber <= maxTable) {
      return tableNumber;
    }
  }
  return 1; // Si rien n'est stocké ou si la valeur est invalide, on commence à la table 1
}

/**
 * Méthode appelée lors du retour avec succès du résultat de la réservation.
 * @param {Object} data - Les données retournées par le serveur.
 * @param {string} text - Le texte de réponse du serveur.
 * @param {Object} jqXHR - L'objet XMLHttpRequest pour le détail de la requête.
 */
function reserveSuccess(data, text, jqXHR) {
  if (data.result === true) {
    window.location.href = `index.html`;
  } else {
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
    sessionStorage.removeItem("loggued");
    loggued = false;
    window.location.href = 'login.html'; // Redirige vers la page de connexion
  } else {
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
    loggued = true;
    sessionStorage.setItem("loggued", true);
  } else {
    loggued = false;
    sessionStorage.removeItem("loggued");
  }
  successCallback(data);
}

/**
 * Méthode "start" appelée après le chargement complet de la page.
 * Initialisation des boutons et des événements.
 */
$(document).ready(function () {
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
      disconnect(disconnectSuccess, callbackError);
    } else {
      console.error("Erreur lors de la déconnexion : utilisateur non connecté");
      window.location.href = 'login.html';
    }
  });

  reserveButton.click(function (event) {
    event.preventDefault();

    reserverTable(currentTable, reserveSuccess, callbackError);
  });

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
