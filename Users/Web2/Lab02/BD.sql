CREATE DATABASE lab02;
USE lab02;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  correo VARCHAR(50),
  telefono VARCHAR(10)
)ENGINE=InnoDB;

INSERT INTO clientes (nombre, correo, telefono) VALUES
('Vanesa Lugo', 'danylugo@gmail.com', '3106543210'),
('Angie Escobar', 'angie8578@gmail.com', '3209876543');
