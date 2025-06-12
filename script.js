const myLibrary = [];
const dialog = document.querySelector("dialog");
const addButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".close");
const confirmButton = document.querySelector(".confirm-button");
const form = document.querySelector("dialog form");
const ul = document.querySelector(".library");

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(crypto.randomUUID(), title, author, pages, read);
    myLibrary.push(book);
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
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-book");
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.appendChild(deleteButton);
    

    for (let prop in book) {
        if (prop != "id") {
            const para = document.createElement("p");
            para.textContent = `${prop}: ${book[prop]}`;
            card.appendChild(para);
        } else {
            card.dataset.id = book[prop];
        }
    }

    card.append(buttons);
    ul.appendChild(card);
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
    if (event.target.classList.contains("delete-book")) {
        const card = event.target.closest(".book");
        const cardBookId = card.dataset.id;
        const bookIndex = myLibrary.findIndex(book => book.id === cardBookId);
        myLibrary.splice(bookIndex, 1);
        displayLibrary();
    }
});