<!doctype html>
<html>

<head>
  <link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
  <title>Équipes de National League</title>
</head>

<body>
  <div id="conteneur">
    <h1>Les équipes de National League</h1>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Club</th>
      </tr>
      <?php

      require_once('ctrl.php');

      $ctrl = new Ctrl();
      $equipes = $ctrl->getEquipes();

      for ($i = 0; $i < count($equipes); $i++) {
        ajouteCelluleHtml($equipes[$i], $i + 1);
      }

      function ajouteCelluleHtml($contenu, $id)
      {
        echo "<tr><td>{$id}</td><td>{$contenu}</td></tr>";
      }

      ?>
    </table>
  </div>
</body>

</html>