import { fetchBooks, displayRaws, showMore, addBookToCart, deleteBookFromCart, createPage } from './functions.js';

createPage();

const catalog = document.getElementById('catalog');
const cartWrapper = document.getElementById('cart-wrapper');
fetchBooks().then((books) => {
  displayRaws(books, catalog);
  showMore(books);
  addBookToCart(books);

  const addedBooks = JSON.parse(localStorage.getItem('addedBooks'));
  if (addedBooks) {
    displayRaws(addedBooks, cartWrapper);
  }

  deleteBookFromCart();
});
