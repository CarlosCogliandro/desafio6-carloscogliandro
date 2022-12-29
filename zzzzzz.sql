
-- Punto 1
CREATE DATABASE coderhouse;
USE coderhouse;

-- Punto 2

CREATE TABLE mensajes(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    message VARCHAR(50) NOT NULL,
    date VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

table.increments('id')
    table.string('email')
    table.string('message')
    table.string('date')