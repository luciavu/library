// Temporary library storage method
const myLibrary = [];
let idCounter = 0;

class Book {
    constructor(id, title, bookCover, author, status, pages, liked) {
        this.id = id;
        this.title = title;
        this.bookCover = bookCover;
        this.author = author;
        this.status = status;
        this.pages = pages;
        this.liked = liked;
    }
}

function addBookToLibrary(title, bookCover, author, status, pages, liked) {
    console.log('add book');
    // Assign unique ID
    let id = idCounter++;

    // Check title not already exists
    myLibrary.push(new Book(id, title, bookCover, author, status, pages, liked));
}

function removeBookFromLibrary(bookId) {
    // Find book by ID
    console.log('remove book');
}

function toggleModal() {
    let modal = document.querySelector('.modal');
    if (modal.style.display == "" || modal.style.display == "none") {
        resetImagePreview();
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    } 
}

function updateLibrary() {
    for (let book in myLibrary) {
        console.log(book);
    }
}

function toggleActive(button) {
    let target = document.getElementById(button);
    if (target.classList.contains("active")) {
        return;
    } else {
        let currentActive = document.querySelector('.active');
        currentActive.classList.remove('active');
        target.classList.add('active');
    }
}
function resetImagePreview() {
    const previewImage = document.getElementById('previewImage');
    const preview = document.getElementById('imagePreview');
    preview.style.display = 'none';
    previewImage.src = '#';
}

function addEventListeners() {
    // Image selection + preview
    const input = document.getElementById('imageUpload');
    const preview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');

    input.addEventListener('change', function() {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function() {
                preview.style.display = 'block';
                previewImage.src = reader.result;
            };

            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
            previewImage.src = '#';
        }
    });
}

addEventListeners();