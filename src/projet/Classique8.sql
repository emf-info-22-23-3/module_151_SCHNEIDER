-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : database
-- Généré le : lun. 05 mai 2025 à 14:17
-- Version du serveur : 8.0.41
-- Version de PHP : 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Classique8`
--

-- --------------------------------------------------------

--
-- Structure de la table `TR_Client_Table`
--

CREATE TABLE `TR_Client_Table` (
  `FK_Client` int DEFAULT NULL,
  `FK_Table` int DEFAULT NULL
) ENGINE=InnoDB ;

--
-- Déchargement des données de la table `TR_Client_Table`
--

INSERT INTO `TR_Client_Table` (`FK_Client`, `FK_Table`) VALUES
(1, 6),
(1, 8),
(1, 2),
(1, 2),
(2, 3),
(2, 1),
(2, 2),
(3, 1),
(3, 5),
(3, 3);

-- --------------------------------------------------------

--
-- Structure de la table `T_Client`
--

CREATE TABLE `T_Client` (
  `PK_Client` int NOT NULL,
  `Nom` varchar(50) DEFAULT NULL,
  `Prenom` varchar(50) DEFAULT NULL,
  `NomUtilisateur` varchar(51) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `FK_localite` int DEFAULT NULL
) ENGINE=InnoDB ;

--
-- Déchargement des données de la table `T_Client`
--

INSERT INTO `T_Client` (`PK_Client`, `Nom`, `Prenom`, `NomUtilisateur`, `email`, `password`, `FK_localite`) VALUES
(1, 'Dubois', 'Jean', 'DuboisJ', 'jean.dubois@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 1),
(2, 'Morel', 'Sophie', 'MorelS', 'sophie.morel@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 2),
(3, 'Richard', 'Paul', 'RichardP', 'paul.richard@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 3),
(4, 'Lambert', 'Marie', 'LambertM', 'marie.lambert@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 4),
(5, 'Fontaine', 'Luc', 'FontaineL', 'luc.fontaine@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 5),
(6, 'Roux', 'Julie', 'RouxJ', 'julie.roux@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 6),
(7, 'Girard', 'Nicolas', 'GirardN', 'nicolas.girard@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 7),
(8, 'Garnier', 'Emma', 'GarnierE', 'emma.garnier@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 8),
(9, 'Bertrand', 'Hugo', 'BertrandH', 'hugo.bertrand@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 9),
(10, 'Leclerc', 'Alice', 'LeclercA', 'alice.leclerc@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 10),
(11, 'Vidal', 'Thomas', 'VidalT', 'thomas.vidal@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 11),
(12, 'Lemoine', 'Clara', 'LemoineC', 'clara.lemoine@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 12),
(13, 'Perrin', 'Antoine', 'PerrinA', 'antoine.perrin@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 13),
(14, 'Dumont', 'Elodie', 'DumontE', 'elodie.dumont@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 14),
(15, 'Renard', 'Bastien', 'RenardB', 'bastien.renard@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 15),
(16, 'Benoit', 'Camille', 'BenoitC', 'camille.benoit@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 16),
(17, 'Marchand', 'Alex', 'MarchandA', 'alex.marchand@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 17),
(18, 'Chauvet', 'Laura', 'ChauvetL', 'laura.chauvet@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 18),
(19, 'Giraud', 'Maxime', 'GiraudM', 'maxime.giraud@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 19),
(20, 'Barbier', 'Charlotte', 'BarbierC', 'charlotte.barbier@gmail.com', '$2y$10$EW9ol4Uo6RfiAJcghwJLz./EzPwihzScO1cD1hahicM0CYZQ1JnaO', 20);

-- --------------------------------------------------------

--
-- Structure de la table `T_Localite`
--

CREATE TABLE `T_Localite` (
  `PK_Localite` int NOT NULL,
  `Localite` varchar(50) DEFAULT NULL,
  `NPA` int DEFAULT NULL
) ENGINE=InnoDB ;

--
-- Déchargement des données de la table `T_Localite`
--

INSERT INTO `T_Localite` (`PK_Localite`, `Localite`, `NPA`) VALUES
(1, 'Zurich', 8000),
(2, 'Genève', 1200),
(3, 'Bâle', 4000),
(4, 'Lausanne', 1000),
(5, 'Berne', 3000),
(6, 'Lucerne', 6000),
(7, 'Saint-Gall', 9000),
(8, 'Lugano', 6900),
(9, 'Fribourg', 1700),
(10, 'Neuchâtel', 2000),
(11, 'Sion', 1950),
(12, 'Bienne', 2500),
(13, 'Thoune', 3600),
(14, 'Schaffhouse', 8200),
(15, 'Coire', 7000),
(16, 'Aarau', 5000),
(17, 'Bellinzone', 6500),
(18, 'Olten', 4600),
(19, 'Uster', 8610),
(20, 'Winterthour', 8400);

-- --------------------------------------------------------

--
-- Structure de la table `T_Table`
--

CREATE TABLE `T_Table` (
  `PK_Table` int NOT NULL,
  `Numero` int DEFAULT NULL
) ENGINE=InnoDB ;

--
-- Déchargement des données de la table `T_Table`
--

INSERT INTO `T_Table` (`PK_Table`, `Numero`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `TR_Client_Table`
--
ALTER TABLE `TR_Client_Table`
  ADD KEY `FK_Client` (`FK_Client`),
  ADD KEY `FK_Table` (`FK_Table`);

--
-- Index pour la table `T_Client`
--
ALTER TABLE `T_Client`
  ADD PRIMARY KEY (`PK_Client`),
  ADD KEY `FK_localite` (`FK_localite`);

--
-- Index pour la table `T_Localite`
--
ALTER TABLE `T_Localite`
  ADD PRIMARY KEY (`PK_Localite`);

--
-- Index pour la table `T_Table`
--
ALTER TABLE `T_Table`
  ADD PRIMARY KEY (`PK_Table`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `T_Client`
--
ALTER TABLE `T_Client`
  MODIFY `PK_Client` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `T_Localite`
--
ALTER TABLE `T_Localite`
  MODIFY `PK_Localite` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `T_Table`
--
ALTER TABLE `T_Table`
  MODIFY `PK_Table` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `TR_Client_Table`
--
ALTER TABLE `TR_Client_Table`
  ADD CONSTRAINT `tr_client_table_ibfk_1` FOREIGN KEY (`FK_Client`) REFERENCES `T_Client` (`PK_Client`),
  ADD CONSTRAINT `tr_client_table_ibfk_2` FOREIGN KEY (`FK_Table`) REFERENCES `T_Table` (`PK_Table`);

--
-- Contraintes pour la table `T_Client`
--
ALTER TABLE `T_Client`
  ADD CONSTRAINT `t_client_ibfk_1` FOREIGN KEY (`FK_localite`) REFERENCES `T_Localite` (`PK_Localite`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
