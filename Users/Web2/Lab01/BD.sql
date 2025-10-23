CREATE DATABASE libreria;
USE libreria;
CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    portada VARCHAR(255),
    descripcion VARCHAR(500),
    genero VARCHAR(100),
    anio_publicacion YEAR
)ENGINE=InnoDB;

INSERT INTO libros (titulo, autor, portada, descripcion, genero, anio_publicacion) VALUES
('Cien Años de Soledad', 'Gabriel García Márquez', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cien_a%C3%B1os_de_soledad.png/330px-Cien_a%C3%B1os_de_soledad.png', 'Una novela que narra la historia de la familia Buendía en el pueblo ficticio de Macondo.', 'Realismo Mágico', 1967),
('El niño con el pijama de rayas', 'John Boyne', 'https://images.cdn1.buscalibre.com/fit-in/360x360/d4/29/d429a412ab19eae39e66e5ddcb49bcc6.jpg', 'Una conmovedora historia sobre la amistad entre dos niños durante el Holocausto.', 'Ficción Histórica', 2006),
('La virgen de los sicarios', 'Fernando Vallejo', 'https://libreriafrancesa.com.co/cdn/shop/files/9786287659872_300x300.jpg', 'Una novela que retrata la violencia en Medellín a través de los ojos de un escritor envejecido.', 'Realismo Contemporáneo', 1994),
('Érase una vez un corazón roto', 'Stephanie Garber', 'https://www.edicionesurano.com/media/cache/58/19/5819130b88bfe9dd73fc80b9cedc2881.jpg', 'Una novela juvenil que mezcla romance y fantasía en un mundo lleno de magia y misterio.', 'Fantasía Juvenil', 2021),
('La balada de nunca jamás', 'Stephanie Garber', 'https://images.cdn1.buscalibre.com/fit-in/360x360/5b/d2/5bd23d496ccc4335aa536d6d136789f8.jpg', 'Una secuela de "Érase una vez un corazón roto" que continúa la historia de los personajes en un mundo mágico.', 'Fantasía Juvenil', 2022),
('La maldición del amor verdadero', 'Stephanie Garber', 'https://images.cdn1.buscalibre.com/fit-in/360x360/f1/5c/f15c9e5e79060fcfc55aded4ceafb1c2.jpg', 'La tercera entrega de la serie que explora nuevas aventuras y desafíos para los protagonistas.', 'Fantasía Juvenil', 2023);