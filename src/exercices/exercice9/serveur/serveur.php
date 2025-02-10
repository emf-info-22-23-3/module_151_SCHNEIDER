<?php

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if ($_POST['action'] == "connect") {
		// Contrôler que le mot de passe est bien 'emf'
		if ($_POST['password'] == 'emf') {
			// Enregistrer 'emf' dans la session 'logged'
			$_SESSION['logged'] = 'emf';
			echo '<result>true</result>';
		} else {
			// Effacer la variable de session si le mot de passe est incorrect
			session_unset();
			echo '<result>false</result>';
		}
	}

	if ($_POST['action'] == "disconnect") {
		// Effacer la variable de session 'logged'
		session_unset();
		echo '<result>true</result>';
	}
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	if ($_GET['action'] == "getInfos") {
		// Contrôler que l'utilisateur est bien connecté (session['logged'] == 'emf')
		if (isset($_SESSION['logged']) && $_SESSION['logged'] == 'emf') {
			// Retourner les informations des employés
			echo '<users>';
			echo '<user><name>Victor Legros</name><salaire>9876</salaire></user>';
			echo '<user><name>Marinette Lachance</name><salaire>7540</salaire></user>';
			echo '<user><name>Gustave Latuile</name><salaire>4369</salaire></user>';
			echo '<user><name>Basile Ledisciple</name><salaire>2384</salaire></user>';
			echo '</users>';
		} else {
			// Si l'utilisateur n'est pas connecté, renvoyer un message d'erreur
			echo '<message>DROITS INSUFFISANTS</message>';
		}
	}
}
?>