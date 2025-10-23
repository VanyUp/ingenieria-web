// Elementos del DOM
const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const yearFilter = document.getElementById('yearFilter');
const loading = document.getElementById('loading');
const bookModal = document.getElementById('bookModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// Variables globales
let booksData = [];
let filteredBooks = [];

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    showLoading();
    await fetchBooks();
    hideLoading();
    populateFilters();
    loadBooks();
    setupEventListeners();
});

// Obtener libros desde el backend
async function fetchBooks() {
    try {
        const response = await fetch('/api/libros');
        const data = await response.json();
        booksData = data;
        filteredBooks = [...booksData];
    } catch (error) {
        console.error('Error al obtener los libros:', error);
    }
}

function loadBooks() {
    booksGrid.innerHTML = '';

    if (filteredBooks.length === 0) {
        booksGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; color: white; padding: 40px;">
                <h3>No se encontraron libros</h3>
                <p>Intenta con otros términos de búsqueda o filtros</p>
            </div>
        `;
        return;
    }

    filteredBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.portada || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop'}" alt="${book.titulo}" class="book-cover">
            <div class="book-info">
                <h3 class="book-title">${book.titulo}</h3>
                <p class="book-author">${book.autor}</p>
                <div class="book-meta">
                    <span class="book-genre">${book.genero}</span>
                    <span class="book-year">${book.anio_publicacion_publicacion}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openBookModal(book));
        booksGrid.appendChild(card);
    });
}

function populateFilters() {
    const genres = [...new Set(booksData.map(book => book.genero))];
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });

    const years = [...new Set(booksData.map(book => book.anio_publicacion))].sort((a, b) => b - a);
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

function setupEventListeners() {
    searchInput.addEventListener('input', filterBooks);
    genreFilter.addEventListener('change', filterBooks);
    yearFilter.addEventListener('change', filterBooks);
    closeModal.addEventListener('click', closeBookModal);
    window.addEventListener('click', (e) => { if (e.target === bookModal) closeBookModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBookModal(); });
}

function filterBooks() {
    const term = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const selectedYear = yearFilter.value;

    filteredBooks = booksData.filter(book => {
        const matchesSearch = book.titulo.toLowerCase().includes(term) ||
            book.autor.toLowerCase().includes(term) ||
            book.genero.toLowerCase().includes(term);

        const matchesGenre = !selectedGenre || book.genero === selectedGenre;
        const matchesYear = !selectedYear || book.anio_publicacion.toString() === selectedYear;

        return matchesSearch && matchesGenre && matchesYear;
    });

    loadBooks();
}

function openBookModal(book) {
    modalBody.innerHTML = `
        <img src="${book.portada || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop'}" alt="${book.titulo}" class="modal-cover">
        <h2 class="modal-title">${book.titulo}</h2>
        <p class="modal-author">${book.autor}</p>
        <p class="modal-description">${book.descripcion || 'Sin descripción disponible'}</p>
        <div class="modal-meta">
            <span class="modal-genre">${book.genero}</span>
            <span class="modal-year">Año: ${book.anio_publicacion}</span>
        </div>
    `;
    bookModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookModal() {
    bookModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showLoading() { loading.style.display = 'block'; }
function hideLoading() { loading.style.display = 'none'; }
