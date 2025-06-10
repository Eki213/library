const myLibrary = [];

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

function createBookCard(book) {
    const card = document.createElement("li");
    card.classList.add("book");

    for (let prop in book) {
        if (prop != "id") {
            const para = document.createElement("p");
            para.textContent = `${prop}: ${book[prop]}`;
            card.appendChild(para);
        }
    }
    
    return card;
}

function displayLibrary() {
    const ul = document.querySelector(".library");
    for (let book of myLibrary) {
       const card = createBookCard(book);
       ul.appendChild(card);
    }
}