<?php

$bdd = new PDO('mysql:host=database;dbname=jeuxVideo151Ex7', 'root', 'root');
$statement = $bdd->prepare('SELECT * FROM t_games');
$statement->execute();
$reponse = $statement->fetchAll();

$compteur = 0;

while (compteur < count($reponse)) {
	echo $reponse[compteur];
	$compteur++;
}
$reponse->closeCursor();

?>