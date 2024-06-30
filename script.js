// Temporary library storage method
const myLibrary = [];
let idCounter = 4;

class Book {
    constructor(id, title, bookCover, author, isread, pages, liked) {
        this.id = id;
        this.title = title;
        this.bookCover = bookCover;
        this.author = author;
        this.isread = isread;
        this.pages = pages;
        this.liked = liked;
    }
}

function addBookToLibrary() {
    console.log('add book');
    // Assign unique ID
    let id = idCounter++;

    // Retrieve values from form
    let title = document.getElementById('form-booktitle').value;
    let bookCover = document.getElementById('imageUpload').value;
    let author = document.getElementById('form-author').value;
    let isread = document.getElementById('is-read').checked;
    let pages = document.getElementById('form-pages').value;
    let liked = false;

    // Check title not already exists
    myLibrary.push(new Book(id, title, bookCover, author, isread, pages, liked));
    createBook(id, title, bookCover, author, pages, isread);
    toggleModal();
}

function createBook(id, title, cover, author, pages, isread) {
    const books = document.querySelector('.books');
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.classList.add(`id${id}`)
        
    const bookCoverImg = document.createElement('img');
    (cover.startsWith('img/cover')) ? bookCoverImg.src = cover : bookCoverImg.src = 'img/cover1.jpg'; 
    // Replace line above when learn npm module
    bookCoverImg.classList.add('bookcover');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.innerHTML = title;

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.innerHTML = author;

    const pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');
    pagesDiv.innerHTML = `${pages} pages`;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const statusDiv = document.createElement('div');
    statusDiv.classList.add('status');
    const statusButton = document.createElement('button');
    (isread) ? statusButton.innerHTML = 'Read' : statusButton.innerHTML = 'Unread'
    statusDiv.appendChild(statusButton);

    const heartSpan = document.createElement('span');
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('icon-heart-empty');
    heartSpan.appendChild(heartIcon);

    const deleteSpan = document.createElement('span');
    deleteSpan.classList.add('delete');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('icon-trash-empty');
    deleteIcon.addEventListener('click', removeBookFromLibrary);
    deleteSpan.appendChild(deleteIcon);

    bookDiv.appendChild(bookCoverImg);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    infoDiv.appendChild(statusDiv);
    infoDiv.appendChild(heartSpan);
    infoDiv.appendChild(deleteSpan);
    bookDiv.appendChild(infoDiv);
    books.appendChild(bookDiv);
}


function removeBookFromLibrary(bookId) {
    // Find book by ID
    console.log('remove book');
}

function toggleModal() {
    let modal = document.querySelector('.modal');
    if (modal.style.display == "" || modal.style.display == "none") {
        resetModal();
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

function resetModal() {
    const previewImage = document.getElementById('previewImage');
    const preview = document.getElementById('imagePreview');
    const title = document.getElementById('form-booktitle');
    const isread = document.getElementById('is-read');
    const author = document.getElementById('form-author');
    const pages = document.getElementById('form-pages');

    preview.style.display = 'none';
    previewImage.src = '#';
    title.value = '';
    author.value = '';
    pages.value = '';
    isread.checked = false;
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

function likeBook() {
}

function displayBooks(filter) {
    myLibrary.forEach(book => {
        const selectedBook = document.querySelector(`.id${book.id}`);
        if (selectedBook) {
            switch (filter) {
                case 'all':
                    selectedBook.style.display = 'block';
                    break;
                case 'liked':
                    if (!book.liked) {
                        selectedBook.style.display = 'none';
                    } else {
                        selectedBook.style.display = 'block';
                    }
                    break;
                case 'unread':
                    if (book.isread) {
                        selectedBook.style.display = 'none';
                    } else {
                        selectedBook.style.display = 'block';
                    }
                    break;
                case 'read':
                    if (!book.isread) {
                        selectedBook.style.display = 'none';
                    } else {
                        selectedBook.style.display = 'block';
                    }
                    break;
                default:
                    selectedBook.style.display = 'block';
                    break;
            }
        }
    });
}

function addPlaceholderBooks() {
    myLibrary.push(new Book(0, 'To Kill a Mockingbird', "img/cover3.jpg", 'Harper Lee', true, 376, true));
    myLibrary.push(new Book(1, 'Invisible Man', "img/cover1.jpg", 'Ralph Ellison', false, 581, true));
    myLibrary.push(new Book(2, 'The Great Gatsby', "img/cover4.jpg", 'F. Scott Fitzgerald', false, 180, false));
    myLibrary.push(new Book(3, 'A Passage to India', "img/cover2.jpg", 'E.M. Forster', true, 368, false));

    myLibrary.forEach(book => {
        createBook(book.id, book.title, book.bookCover, book.author, book.pages, book.isread);
    })
}

addEventListeners();
addPlaceholderBooks();