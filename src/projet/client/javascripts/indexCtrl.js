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
    tableNumber--;  // Décrémentation du numéro de la table
    updateTableNumber();  // Mise à jour du titre
    window.location.href = `index.html?tableNumber=${tableNumber}`;  // Mise à jour de l'URL avec le nouveau numéro de table
  }
}

/**
 * Gère l'événement de clic sur le bouton "suivant".
 * Incrémente le numéro de la table si possible et met à jour l'URL.
 */
function nextButtonClick() {
  if (tableNumber < maxTables) {
    tableNumber++;  // Incrémentation du numéro de la table
    updateTableNumber();  // Mise à jour du titre
    window.location.href = `index.html?tableNumber=${tableNumber}`;  // Mise à jour de l'URL avec le nouveau numéro de table
  }
}

/**
 * Gère l'événement de clic sur le bouton de réservation.
 * Redirige vers le script de réservation avec le numéro de table via GET.
 */
function reserveButtonClick() {
  // Redirection vers server.php en envoyant le numéro de la table via GET pour réserver
  window.location.href = `server.php?tableNumber=${tableNumber}&action=reserve`;
}

/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function () {
  let urlParams = new URLSearchParams(window.location.search);
  let tableNumber = parseInt(urlParams.get('tableNumber')) || 1;  // Valeur par défaut à 1 si non spécifiée
  const maxTables = 10;  // Définition du nombre maximum de tables

  // Sélectionne les éléments DOM pour les boutons
  const prevButton = $("button[name='prev']");
  const nextButton = $("button[name='next']");
  const reserveButton = $("button[name='reserve']");

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

  reserveButton.on("click", function (event) {
    event.preventDefault();
    reserveButtonClick();
  });
});
