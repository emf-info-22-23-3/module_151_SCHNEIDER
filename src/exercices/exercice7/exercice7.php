<?php

$username = 'root';
$password = 'root';

$bdd = new PDO('mysql:host=localhost;dbname=nomDB', $username, $password);
$statement = $bdd->prepare('SELECT * FROM db');
$statement->execute();
$reponse = $statement->fetchAll();

$compteur = 0;

while (compteur < count($reponse)) {
	echo $reponse[compteur];
	$compteur++;
}
$reponse->closeCursor();

?>