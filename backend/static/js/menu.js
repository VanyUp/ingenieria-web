/**
 * menu.js - Controla el comportamiento del menú hamburguesa en dispositivos móviles
 * 
 * Funcionalidades:
 * - Abrir/cerrar el menú al hacer clic en el botón hamburguesa
 * - Cerrar el menú al hacer clic en un enlace del menú
 * - Cerrar el menú al hacer clic fuera del mismo
 * - Cambiar el estilo del header al hacer scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    
    // Función para alternar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Bloquear el scroll del body cuando el menú está abierto
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Evento para el botón del menú
    menuToggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace (para móviles)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Aplicar animaciones a las secciones al hacer scroll
    const sections = document.querySelectorAll('.section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('fade-in');
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
});