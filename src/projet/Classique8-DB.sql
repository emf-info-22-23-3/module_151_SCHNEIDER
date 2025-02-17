CREATE DATABASE IF NOT EXISTS Classique8;
USE Classique8;

-- Création des tables
CREATE TABLE IF NOT EXISTS T_Localite (
    PK_Localite INT PRIMARY KEY AUTO_INCREMENT,
    Localite VARCHAR(50),
    NPA INT
);

CREATE TABLE IF NOT EXISTS T_Client (
    PK_Client INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50),
    Prenom VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(100),
    FK_localite INT,
    FOREIGN KEY (FK_localite) REFERENCES T_Localite(PK_Localite)
);

CREATE TABLE IF NOT EXISTS T_Table (
    PK_Table INT PRIMARY KEY AUTO_INCREMENT,
    Numero INT
);

CREATE TABLE IF NOT EXISTS TR_Client_Table (
    FK_Client INT,
    FK_Table INT,
    FOREIGN KEY (FK_Client) REFERENCES T_Client(PK_Client),
    FOREIGN KEY (FK_Table) REFERENCES T_Table(PK_Table)
);

-- Insertion des localités suisses
INSERT INTO T_Localite (Localite, NPA) VALUES 
('Zurich', 8000),
('Genève', 1200),
('Bâle', 4000),
('Lausanne', 1000),
('Berne', 3000),
('Lucerne', 6000),
('Saint-Gall', 9000),
('Lugano', 6900),
('Fribourg', 1700),
('Neuchâtel', 2000),
('Sion', 1950),
('Bienne', 2500),
('Thoune', 3600),
('Schaffhouse', 8200),
('Coire', 7000),
('Aarau', 5000),
('Bellinzone', 6500),
('Olten', 4600),
('Uster', 8610),
('Winterthour', 8400);

-- Insertion de 20 clients avec emails prenom.nom@gmail.com
INSERT INTO T_Client (Nom, Prenom, email, password, FK_localite) VALUES 
('Dubois', 'Jean', 'jean.dubois@gmail.com', 'password123', 1),
('Morel', 'Sophie', 'sophie.morel@gmail.com', 'password123', 2),
('Richard', 'Paul', 'paul.richard@gmail.com', 'password123', 3),
('Lambert', 'Marie', 'marie.lambert@gmail.com', 'password123', 4),
('Fontaine', 'Luc', 'luc.fontaine@gmail.com', 'password123', 5),
('Roux', 'Julie', 'julie.roux@gmail.com', 'password123', 6),
('Girard', 'Nicolas', 'nicolas.girard@gmail.com', 'password123', 7),
('Garnier', 'Emma', 'emma.garnier@gmail.com', 'password123', 8),
('Bertrand', 'Hugo', 'hugo.bertrand@gmail.com', 'password123', 9),
('Leclerc', 'Alice', 'alice.leclerc@gmail.com', 'password123', 10),
('Vidal', 'Thomas', 'thomas.vidal@gmail.com', 'password123', 11),
('Lemoine', 'Clara', 'clara.lemoine@gmail.com', 'password123', 12),
('Perrin', 'Antoine', 'antoine.perrin@gmail.com', 'password123', 13),
('Dumont', 'Elodie', 'elodie.dumont@gmail.com', 'password123', 14),
('Renard', 'Bastien', 'bastien.renard@gmail.com', 'password123', 15),
('Benoit', 'Camille', 'camille.benoit@gmail.com', 'password123', 16),
('Marchand', 'Alex', 'alex.marchand@gmail.com', 'password123', 17),
('Chauvet', 'Laura', 'laura.chauvet@gmail.com', 'password123', 18),
('Giraud', 'Maxime', 'maxime.giraud@gmail.com', 'password123', 19),
('Barbier', 'Charlotte', 'charlotte.barbier@gmail.com', 'password123', 20);

-- Insertion de 10 tables
INSERT INTO T_Table (Numero) VALUES 
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- La table de relation TR_Client_Table reste vide
