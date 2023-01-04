
-- Punto 1
CREATE DATABASE coderhouse;
USE coderhouse;

-- Punto 2

CREATE TABLE productos(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    thumbnail VARCHAR(1024),
    PRIMARY KEY(id)
);

CREATE TABLE mensajes(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(30),
    message VARCHAR(128),
    date VARCHAR(50),
    PRIMARY KEY(id)
);

table.increments('id')
    table.string('email')
    table.string('message')
    table.string('date')