// Temporary library storage method
const myLibrary = [];

class Book {
    constructor(id, title, bookCover, author, isread, pages, liked) {
        this.id = id; // Based on its index, updated upon add or remove
        this.title = title;
        this.bookCover = bookCover;
        this.author = author;
        this.isread = isread;
        this.pages = pages;
        this.liked = liked;
    }
}

function updateIndexes() {
    myLibrary.forEach((book, index) => {
        const oldBookDiv = document.querySelector(`.id${book.id}`);
        if (oldBookDiv) {
            oldBookDiv.classList.remove(`id${book.id}`);
            oldBookDiv.classList.add(`id${index}`); // Update class/id to new id
        }
    });

    myLibrary.forEach((book, index) => {
        book.id = index;
    });
}

function addBookToLibrary() {
    // Assign unique ID
    const id = myLibrary.length;

    // Retrieve values from form
    let title = document.getElementById('form-booktitle').value;
    let bookCover = document.getElementById('imageUpload').value;
    let author = document.getElementById('form-author').value;
    let isread = document.getElementById('is-read').checked;
    let pages = document.getElementById('form-pages').value;
    let liked = false;

    myLibrary.push(new Book(id, title, bookCover, author, isread, pages, liked));
    createBook(id, title, bookCover, author, pages, isread);
    updateIndexes();
    toggleModal();
}

function createBook(id, title, cover, author, pages, isread) {
    const books = document.querySelector('.books');
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.classList.add(`id${id}`)
        
    const bookCoverImg = document.createElement('img');
    (cover.startsWith('img/cover')) ? bookCoverImg.src = cover : bookCoverImg.src = 'img/default.png'; 
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
    (isread) ? statusButton.innerHTML = 'Read' : statusButton.innerHTML = 'Unread';
    statusButton.classList.add('statusButton')
    statusDiv.appendChild(statusButton);

    const heartSpan = document.createElement('span');
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('icon-heart-empty');
    heartIcon.classList.add('liked');
    heartSpan.appendChild(heartIcon);

    const deleteSpan = document.createElement('span');
    deleteSpan.classList.add('delete');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('icon-trash-empty');
    deleteIcon.classList.add('deleteButton');
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

function removeBookFromLibrary(book) {
    const idx = getBookId(book);
    const bookDiv = book.closest('.book');
    // Visually remove
    bookDiv.remove();
    // Remove from myLibrary storage
    myLibrary.splice(idx, 1);
    // Update indexes
    updateIndexes();
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

function getBookId(element) {
    const bookDiv = element.closest('.book');
    const bookIdx = bookDiv.classList[1];
    return bookIdx.substring(2); // Get '1' from id1

}

function toggleLike(icon) {
    const idx = getBookId(icon);

    if (icon.classList.contains('icon-heart-empty')) {
        icon.classList.remove('icon-heart-empty');
        icon.classList.add('icon-heart');
        myLibrary[idx].liked = true;
    } else {
        icon.classList.remove('icon-heart');
        icon.classList.add('icon-heart-empty');
        myLibrary[idx].liked = false;
    }
}

function toggleRead(readStatus) {
    const idx = getBookId(readStatus);

    if (readStatus.innerHTML == 'Read') {
        readStatus.innerHTML = 'Unread'
        myLibrary[idx].isread = false;
    } else {
        readStatus.innerHTML = 'Read'
        myLibrary[idx].isread = true;
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
    title.placeholder = 'Title';
    author.placeholder = 'Author';
    pages.placeholder = 'Pages';
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

    // Toggling like
    document.querySelector('.books').addEventListener('click', function(event) {
        if (event.target.classList.contains('liked')) {
            toggleLike(event.target);
        }
    });

    // Toggling read
    document.querySelector('.books').addEventListener('click', function(event) {
        if (event.target.classList.contains('statusButton')) {
            toggleRead(event.target);
        }
    });

    // Removing book
    document.querySelector('.books').addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteButton')) {
            removeBookFromLibrary(event.target)
        }
    });

    // Searching for book
    const searchBar = document.getElementById('searchbar')
    searchBar.addEventListener('input', function() {
        searchForBook(searchBar.value);
    });
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

function searchForBook(searchInput) {
    const lowerCaseInput = searchInput.toLowerCase();
    myLibrary.forEach((book) => {
        const selectedBook = document.querySelector(`.id${book.id}`);
        if (book.title.toLowerCase().includes(lowerCaseInput) 
            || book.author.toLowerCase().includes(lowerCaseInput)) {
            selectedBook.style.display = 'block';
        } else {
            selectedBook.style.display = 'none';
        }
    });
}

function checkInputNotEmpty() {
    const title = document.getElementById('form-booktitle');
    const author = document.getElementById('form-author');
    const pages = document.getElementById('form-pages');

    if (!(title.value.length && author.value.length && pages.value.length)) {
        title.placeholder = 'Title*';
        author.placeholder = 'Author*';
        pages.placeholder = 'Pages*';
        return;
    } else {
        title.placeholder = 'Title';
        author.placeholder = 'Author';
        pages.placeholder = 'Pages';
        addBookToLibrary();
    }
}

function addPlaceholderBooks() {
    myLibrary.push(new Book(0, 'To Kill a Mockingbird', "img/cover3.jpg", 'Harper Lee', true, 376, false));
    myLibrary.push(new Book(1, 'Invisible Man', "img/cover1.jpg", 'Ralph Ellison', false, 581, false));
    myLibrary.push(new Book(2, 'The Great Gatsby', "img/cover4.jpg", 'F. Scott Fitzgerald', false, 180, false));
    myLibrary.push(new Book(3, 'A Passage to India', "img/cover2.jpg", 'E.M. Forster', true, 368, false));

    myLibrary.forEach(book => {
        createBook(book.id, book.title, book.bookCover, book.author, book.pages, book.isread);
    })
}

addPlaceholderBooks();
addEventListeners();
