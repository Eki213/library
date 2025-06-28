const dialog = document.querySelector("dialog");
const addButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".close");
const confirmButton = document.querySelector(".confirm-button");
const form = document.querySelector("dialog form");
const ul = document.querySelector(".library");

class Book {
    constructor(id, title, author, pages, read) { 
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    #books = [];

    addBook(book) {
        this.#books.push(book);
    }

    deleteBook(id) {
        this.#books = this.#books.filter(book => book.id !== id);
    }

    findBook(id) {
        return this.#books.find(book => book.id === id);
    }

    *[Symbol.iterator]() {
        yield* this.#books;
    }
}

const myLibrary = new Library();

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(crypto.randomUUID(), title, author, pages, read);
    myLibrary.addBook(book);
}

function getBookData() {
    return {
        title: document.querySelector("#title").value,
        author: document.querySelector("#author").value,
        pages: document.querySelector("#pages").value,
        read: document.querySelector("#read").checked,
    }
}

function createBookCard(book) {
    const card = document.createElement("li");
    card.classList.add("book");
    card.dataset.id = book.id;

    const deleteButton = createDeleteButton();
    const readButton = createReadButton(book.read);
    const buttons = createButtonsContainer(readButton, deleteButton);
    

    for (let prop in book) {
        if (prop === "read" || prop === "id") continue;

        const para = document.createElement("p");
        para.textContent = `${prop}: ${book[prop]}`;
        card.appendChild(para);
    }

    card.append(buttons);
    ul.appendChild(card);
}

function createDeleteButton() {
    const deleteButton = document.createElement("button");   
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-book";

    return deleteButton;
}

function createReadButton(state) {
    const readButton = document.createElement("button");   
    readButton.setAttribute("type", "button");
    readButton.className = "read-button";

    updateReadButton(readButton, state);

    return readButton;
}

function updateReadButton(button, state)  {
    button.classList.toggle("read", state);
    button.classList.toggle("not-read", !state);
    button.textContent = state ? "Read" : "Not Read";
}

function createButtonsContainer(readButton, deleteButton) {
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.appendChild(readButton);
    buttons.appendChild(deleteButton);

    return buttons;
}

function displayLibrary() {
    ul.replaceChildren();
    for (let book of myLibrary) createBookCard(book);
}

addButton.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest(".close")) {
        form.reset();
        dialog.close();
    }
});

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    
    const bookData = getBookData();
    addBookToLibrary(bookData.title, bookData.author, bookData.pages, bookData.read);
    displayLibrary();

    form.reset();
    dialog.close();
});

ul.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;

    const button = event.target;
    const card = button.closest(".book");
    const bookId = card.dataset.id;

    if (button.classList.contains("delete-book")) {
        myLibrary.deleteBook(bookId);
        displayLibrary();
    }

    if (button.classList.contains("read-button")) {
        const book = myLibrary.findBook(bookId);
        book.toggleRead();
        updateReadButton(button, book.read);
    }
});