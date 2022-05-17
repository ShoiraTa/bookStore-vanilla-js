let booksInCart = JSON.parse(localStorage.getItem('addedBooks'));
if (!booksInCart) {
  booksInCart = [];
}

export const createNav = () => {
  let container = document.getElementById('container');
  let booksContainer = document.createElement('main');
  let modal = document.createElement('div');
  let header = document.createElement('header');
  let catalog = document.createElement('div');
  let cart = document.createElement('div');

  booksContainer.classList.add('booksContainer');
  modal.classList.add('modal');
  catalog.classList.add('catalog');

  cart.classList.add('cart');

  catalog.setAttribute('id', 'catalog');
  modal.setAttribute('id', 'more-info');
  cart.setAttribute('id', 'cart');

  const nav = document.createElement('nav');
  const logo = document.createElement('a');
  const bag = document.createElement('i');
  logo.setAttribute('href', './index.html');
  logo.innerHTML = 'Bookstore';

  logo.classList.add('logo');
  bag.classList.add('fa-solid');
  bag.classList.add('fa-cart-shopping');
  nav.appendChild(logo);
  nav.appendChild(bag);
  header.appendChild(nav);

  modal.style.display = 'none';

  container.appendChild(modal);
  container.appendChild(header);
  container.appendChild(booksContainer);

  booksContainer.appendChild(catalog);
  booksContainer.appendChild(cart);
};

const toggleShowMore = () => {
  var x = document.getElementById('more-info');
  if (x.style.display === 'none') {
    x.style.display = 'flex';
    console.log('open');
  } else {
    x.style.display = 'none';
    console.log('closed');
  }
};

export const fetchBooks = async () => {
  const response = await fetch('./books.json');
  const books = response.json();
  return books;
};

const closeOnClick = () => {
  const closeModal = document.getElementById('close-modal');
  const closeMocalCross = document.getElementById('closeMocalCross');

  closeModal.addEventListener('click', () => {
    toggleShowMore();
  });
  closeMocalCross.addEventListener('click', () => {
    toggleShowMore();
  });
};

export const displayRaws = (books, parentEl) => {
  parentEl.innerHTML = '';
  let page = document.createElement('h1');
  page.innerHTML = parentEl.classList.contains('cart') ? 'CART' : 'CATALOG';
  parentEl.appendChild(page);

  if (books) {
    books.map((book) => {
      let container = document.createElement('div');
      let actions = document.createElement('div');
      let mainSection = document.createElement('div');
      let infoSection = document.createElement('div');

      actions.classList.add('actions');
      mainSection.classList.add('main-section');
      mainSection.classList.add('border');
      container.classList.add('bookRow');
      infoSection.classList.add('infoSection');
      // image
      let imgDiv = document.createElement('div');
      let img = document.createElement('img');
      imgDiv.classList.add('img-div');
      img.setAttribute('src', book.imageLink);
      imgDiv.appendChild(img);
      mainSection.appendChild(imgDiv);

      // Book info
      let leftSection = document.createElement('div');
      let bookInfo = document.createElement('div');
      let category = document.createElement('p');
      let title = document.createElement('h2');
      let author = document.createElement('p');
      let price = document.createElement('p');
      let xmark = document.createElement('i');

      leftSection.classList.add('left-section');
      bookInfo.classList.add('bookInfo');
      category.classList.add('category');
      title.classList.add('title');
      author.classList.add('author');
      price.classList.add('price');
      xmark.classList.add('fa-solid');
      xmark.classList.add('fa-xmark');

      xmark.setAttribute('data', Object.keys(book)[7]);

      price.innerHTML = `Price: $${book.price}`;
      author.innerHTML = book.author;
      title.innerHTML = book.title;
      category.innerHTML = book.category;

      bookInfo.appendChild(category);
      bookInfo.appendChild(title);
      bookInfo.appendChild(author);
      bookInfo.appendChild(price);
      if (parentEl.classList.contains('cart')) {
        bookInfo.appendChild(xmark);
      }
      leftSection.appendChild(bookInfo);
      infoSection.appendChild(leftSection);

      // add and show buttons
      let ul = document.createElement('ul');
      let liShow = document.createElement('li');
      let liAdd = document.createElement('li');
      let buttonShow = document.createElement('button');
      let buttonAdd = document.createElement('button');

      buttonShow.classList.add('right-section__show-more');
      buttonAdd.classList.add('add-btn');

      buttonShow.innerHTML = 'Show more';
      buttonAdd.innerHTML = 'Add to bag';

      buttonShow.setAttribute('data', book.id);
      buttonAdd.setAttribute('data', book.id);
      liShow.appendChild(buttonShow);
      liAdd.appendChild(buttonAdd);

      ul.appendChild(liShow);
      ul.appendChild(liAdd);
      actions.appendChild(ul);

      if (!parentEl.classList.contains('cart')) {
        infoSection.appendChild(actions);
      }
      container.appendChild(mainSection);
      container.appendChild(infoSection);
      parentEl.appendChild(container);
    });
  }

  deleteBookFromCart();
};

export const showMore = (books) => {
  const showMoreBtns = document.getElementsByClassName('right-section__show-more');
  Array.from(showMoreBtns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data');
      let moreInfo = document.getElementById('more-info');
      moreInfo.innerHTML = `
      <div class="info-wrapper"> 
      <h4>${books[index].title}</h4>
        <div class="info-wrapper-inner">
          <div class ='info-left'>
            <img src=${books[index].imageLink} />
          </div>
          <div class ='info-right'>
            <i class="fa-solid fa-xmark" id="closeMocalCross"></i>
            <p><strong>Price:</strong> ${books[index].price}</p>
            <p><strong>Category:</strong> ${books[index].category}</p>
            <p><strong>Written by:</strong> ${books[index].author}</p>
            <p><strong>Description:</strong> <br /> <p>${books[index].description}</p></p> 
          </div>
        </div>
        <div class="close-btn-container">
          <button type="button" class="add-btn close-modal" id="close-modal">Close</button>
        <div>
       
      </div>`;
      toggleShowMore();
      closeOnClick();
    });
  });
};

export const deleteBookFromCart = () => {
  const addedBooks = JSON.parse(localStorage.getItem('addedBooks'));
  const deleteBtns = document.getElementsByClassName('fa-xmark');
  Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data');
      const booksInCart = addedBooks.filter((book) => {
        return Object.keys(book)[7] !== id;
      });
      localStorage.setItem('addedBooks', JSON.stringify(booksInCart));
      location.reload();
      displayRaws(booksInCart, cart);
    });
  });
};

export const addBookToCart = (books) => {
  let cart = document.getElementById('cart');
  const addBtns = document.getElementsByClassName('add-btn');
  Array.from(addBtns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data');
      let length = JSON.parse(localStorage.getItem('addedBooks'));
      length = length ? length.length : (length = 0);

      console.log(booksInCart);
      const uniqId = length + books[index].author.substring(0, 4);

      booksInCart = [...booksInCart, { ...books[index], [uniqId]: length + books[index].author }];
      console.log(booksInCart);
      localStorage.setItem('addedBooks', JSON.stringify(booksInCart));
      const addedBooksLS = JSON.parse(localStorage.getItem('addedBooks'));

      displayRaws(addedBooksLS, cart);
      deleteBookFromCart();
    });
  });
};
