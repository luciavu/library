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