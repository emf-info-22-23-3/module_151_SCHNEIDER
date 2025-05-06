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
  loadReservation(currentTable);
}

/**
 * Gère l'événement de clic sur le bouton "précédent".
 * Décrémente le numéro de la table si possible et met à jour le titre.
 */
function prevButtonClick() {
  if (currentTable > 1) {
    currentTable--;
    setCurrentTable(currentTable);
    updateTableNumber();
  }
}

/**
 * Gère l'événement de clic sur le bouton "suivant".
 * Incrémente le numéro de la table si possible et met à jour le titre.
 */
function nextButtonClick() {
  if (currentTable < maxTable) {
    currentTable++;
    setCurrentTable(currentTable);
    updateTableNumber();
  }
}

/**
 * Enregistre le numéro de la table dans sessionStorage.
 * 
 * @param {number} tableNumber - Le numéro de la table à enregistrer.
 */
function setCurrentTable(tableNumber) {
  sessionStorage.setItem("currentTable", tableNumber);
}

/**
 * Récupère le numéro de la table depuis sessionStorage.
 * 
 * @returns {number} Le numéro de la table actuelle (1 si non défini ou invalide).
 */
function getCurrentTable() {
  const storedTable = sessionStorage.getItem("currentTable");
  if (storedTable) {
    const tableNumber = parseInt(storedTable);
    if (tableNumber >= 1 && tableNumber <= maxTable) {
      return tableNumber;
    }
  }
  return 1;
}

/**
 * Appelée lorsque la réservation est réussie ou échoue.
 * 
 * @param {Object} data - Réponse du serveur.
 * @param {string} text - Statut de la réponse.
 * @param {Object} jqXHR - Objet de la requête.
 */
function reserveSuccess(data, text, jqXHR) {
  if (data.result === true) {
    loadReservation(currentTable);
  } else {
    if (data.error === "Table complète") {
      alert("La table est pleine. Veuillez en choisir une autre.");
    } else {
      $("#errorMessage").text("Erreur lors de la réservation de la table").show();
    }
  }
}

/**
 * Appelée en cas d’échec de la requête.
 * 
 * @param {Object} request - Requête envoyée.
 * @param {string} status - Statut de la requête.
 * @param {string} error - Message d'erreur.
 */
function callbackError(request, status, error) {
  alert("Erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Gère le succès de la déconnexion.
 * 
 * @param {Object} data - Réponse du serveur.
 * @param {string} text - Statut de la réponse.
 * @param {Object} jqXHR - Objet de la requête.
 */
function disconnectSuccess(data, text, jqXHR) {
  if (data.result === true) {
    sessionStorage.removeItem("loggued");
    loggued = false;
    window.location.href = 'login.html';
  } else {
    $("#errorMessage").text("Erreur lors de la déconnexion").show();
  }
}

/**
 * Gère la réponse à la vérification de session.
 * 
 * @param {Object} data - Réponse du serveur.
 * @param {string} text - Statut de la réponse.
 * @param {Object} jqXHR - Objet de la requête.
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
 * Met à jour les champs de saisie des noms de joueurs avec ceux récupérés.
 * 
 * @param {string[]} players - Tableau contenant les noms d’utilisateurs.
 */
function updatePlayerFields(players) {
  $("#player1").val(players[0] || "");
  $("#player2").val(players[1] || "");
  $("#player3").val(players[2] || "");
  $("#player4").val(players[3] || "");
}

/**
 * Charge les réservations pour une table donnée.
 * 
 * @param {number} tableNumber - Numéro de la table à charger.
 */
function loadReservation(tableNumber) {
  getReservation(tableNumber, function (response) {
    if (response.result === true && Array.isArray(response.players)) {
      updatePlayerFields(response.players);
    } else {
      updatePlayerFields([]);
    }
  }, callbackError);
}

/**
 * Initialise les événements une fois la page entièrement chargée.
 */
$(document).ready(function () {
  var prevButton = $("#prevButton");
  var nextButton = $("#nextButton");
  var reserveButton = $("#reserveButton");
  var connectButton = $("#connectOrDisconnect");
  var loggued = getLoggued();

  if (loggued === true) {
    connectButton.text("Se deconnecter");
  } else {
    connectButton.text("Se connecter");
  }

  connectButton.on("click", function (event) {
    event.preventDefault();
    if (getLoggued() === true) {
      disconnect(disconnectSuccess, callbackError);
    } else {
      console.error("Erreur lors de la deconnexion : utilisateur non connecté");
      window.location.href = 'login.html';
    }
  });

  reserveButton.click(function (event) {
    event.preventDefault();
    reserverTable(currentTable, reserveSuccess, callbackError);
  });

  updateTableNumber();

  prevButton.on("click", function (event) {
    event.preventDefault();
    prevButtonClick();
  });

  nextButton.on("click", function (event) {
    event.preventDefault();
    nextButtonClick();
  });
});
