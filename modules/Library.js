import Book from './Book.js';
export default class Library {
  constructor(lib) {
    this.books = JSON.parse(localStorage.getItem('bookCollection')) || [];
    this.createBook(lib, this.books);
  }
  addBook = (bookDetails, lib) => {
    const book = new Book(bookDetails);
    let current;
    if (!this.head) {
      this.head = book;
    } else {
      current = this.head;
      while (current.next_object) {
        current = current.next_object;
      }
      current.next_object = book;
    }
    this.size++;
    this.books.push(book);
    this.createBook(lib, this.books);
    localStorage.setItem('bookCollection', JSON.stringify(this.books));
  };

  createBook = (lib, arr) => {
    lib.innerHTML = '';
    let i = 0;
    const bookListHeader = document.createElement('h2');
    const bookTable = document.createElement('table');
    bookListHeader.textContent = 'All awesome books';
    lib.appendChild(bookListHeader);
    lib.appendChild(bookTable);
    arr.forEach((element) => {
      const bookContainer = document.createElement('tr');
      const bookInfo = document.createElement('h2');
      const removeButton = document.createElement('button');
      removeButton.classList.add('delete-button');
      removeButton.setAttribute('data', i);
      removeButton.addEventListener('click', this.deleteBook.bind(this, lib));
      i++;
      bookTable.appendChild(bookContainer);
      bookContainer.appendChild(bookInfo);
      bookContainer.appendChild(removeButton);

      bookInfo.textContent = `'${element.object.title}' authored by ${element.object.author}`;
      removeButton.innerHTML = 'Remove';
    });
  };
  deleteBook = (lib, evt) => {
    this.books.splice(evt.currentTarget.getAttribute('data'), 1);
    this.createBook(lib, this.books);
    localStorage.setItem('bookCollection', JSON.stringify(this.books));
  };
}
