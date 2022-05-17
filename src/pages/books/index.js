import { fetchBooks, displayRaws, showMore, addBookToCart, deleteBookFromCart, createNav } from './functions.js';

createNav();

const catalog = document.getElementById('catalog');
fetchBooks().then((books) => {
  displayRaws(books, catalog);
  showMore(books);
  addBookToCart(books);

  const addedBooks = JSON.parse(localStorage.getItem('addedBooks'));
  if (addedBooks) {
    displayRaws(addedBooks, cart);
  }

  deleteBookFromCart();
});
