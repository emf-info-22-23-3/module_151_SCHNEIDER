/*
 * Fonction pour récupérer la table suivante via AJAX
 */
function fetchNextTable(currentTable) {
    $.ajax({
      type: "POST",
      url: "server.php",
      dataType: "json",
      data: JSON.stringify({
        action: "getNextTable",
        currentTable: currentTable
      }),
      success: function(response) {
        if (response.result) {
          // Mettre à jour la table affichée
          $("h1").text("Table " + response.table.num_table + "/10");
        }
      },
      error: function() {
        alert("Erreur lors du chargement de la table suivante.");
      }
    });
  }
  
  /*
   * Fonction pour récupérer la table précédente via AJAX
   */
  function fetchPreviousTable(currentTable) {
    $.ajax({
      type: "POST",
      url: "server.php",
      dataType: "json",
      data: JSON.stringify({
        action: "getPreviousTable",
        currentTable: currentTable
      }),
      success: function(response) {
        if (response.result) {
          // Mettre à jour la table affichée
          $("h1").text("Table " + response.table.num_table + "/10");
        }
      },
      error: function() {
        alert("Erreur lors du chargement de la table précédente.");
      }
    });
  }
  
  /*
   * Fonction pour réserver une table
   */
  function reserveTable(tableNumber, playerNames) {
    $.ajax({
      type: "POST",
      url: "server.php",
      dataType: "json",
      data: JSON.stringify({
        action: "reserve",
        tableNumber: tableNumber,
        playerNames: playerNames
      }),
      success: function(response) {
        if (response.result) {
          alert("Table réservée avec succès !");
        } else {
          alert("Erreur lors de la réservation de la table.");
        }
      },
      error: function() {
        alert("Erreur lors de la réservation.");
      }
    });
  }
  