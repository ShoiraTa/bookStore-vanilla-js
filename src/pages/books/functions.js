let fragment = new DocumentFragment();

let booksInCart = JSON.parse(localStorage.getItem('addedBooks'));
if (!booksInCart) {
  booksInCart = [];
}

const toggleShowMore = () => {
  var x = document.getElementById('more-info');
  if (x.style.display === 'none') {
    x.style.display = 'flex';
  } else {
    x.style.display = 'none';
    location.reload();
    window.history.back();
  }
};

const getTotal = (books) => {
  return books.reduce((total, book) => {
    total += book.price;
    localStorage.setItem('total', total);
    return total;
  }, 0);
};

export const createPage = () => {
  let container = document.getElementById('container');
  let booksContainer = document.createElement('main');
  let modal = document.createElement('div');
  let header = document.createElement('header');
  let catalog = document.createElement('div');
  let cartWrapper = document.createElement('div');
  let cart = document.createElement('div');
  let cartFooter = document.createElement('div');
  let cartTotalContainer = document.createElement('div');
  let cartTotal = document.createElement('p');
  let orderBtn = document.createElement('a');

  booksContainer.classList.add('booksContainer');
  modal.classList.add('modal');
  cart.classList.add('cart');
  cartTotal.innerHTML = 'Total: 0';
  orderBtn.innerHTML = 'Order';

  catalog.classList.add('catalog');
  cartFooter.classList.add('cart-footer');
  cartTotalContainer.classList.add('cart-total-container');
  cartTotal.classList.add('cart-total');
  cartWrapper.classList.add('cart-wrapper');
  orderBtn.classList.add('add-btn');

  cartTotalContainer.appendChild(cartTotal);
  cartTotalContainer.appendChild(orderBtn);
  cartFooter.appendChild(cartTotalContainer);

  cartWrapper.setAttribute('id', 'cart-wrapper');

  cart.appendChild(cartWrapper);
  cart.appendChild(cartFooter);

  orderBtn.setAttribute('href', '../order/order.html');
  catalog.setAttribute('id', 'catalog');
  modal.setAttribute('id', 'more-info');
  cartTotal.setAttribute('id', 'cart-total');
  cart.setAttribute('id', 'cart');
  orderBtn.setAttribute('id', 'order-btn');

  // navbar
  const nav = document.createElement('nav');
  const logo = document.createElement('a');
  const bag = document.createElement('i');

  logo.classList.add('logo');
  bag.classList.add('fa-solid');
  bag.classList.add('fa-cart-shopping');
  nav.appendChild(logo);
  nav.appendChild(bag);
  header.appendChild(nav);

  modal.style.display = 'none';

  logo.setAttribute('href', './index.html');
  logo.innerHTML = 'Bookstore';
  fragment.appendChild(modal);
  fragment.appendChild(header);
  fragment.appendChild(booksContainer);

  booksContainer.appendChild(catalog);
  booksContainer.appendChild(cart);

  container.appendChild(fragment);
};

export const showMore = (books) => {
  const showMoreBtns = document.getElementsByClassName('right-section__show-more');
  Array.from(showMoreBtns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data');
      let moreInfo = document.getElementById('more-info');

      let infoWrapper = document.createElement('div');
      let infoBookTitle = document.createElement('h4');
      let infoWrapperInner = document.createElement('div');
      let infoLeft = document.createElement('div');
      let infoImg = document.createElement('img');
      let infoRight = document.createElement('div');
      let inforCloseCross = document.createElement('i');
      let infoPrice = document.createElement('p');
      let infoCategory = document.createElement('p');
      let infoAuthor = document.createElement('p');
      let infoDescription = document.createElement('p');
      let closeBtnContainer = document.createElement('div');
      let closeBtnButton = document.createElement('button');
      let br = document.createElement('br');

      infoWrapper.classList.add('info-wrapper');
      infoWrapperInner.classList.add('info-wrapper-inner');
      infoLeft.classList.add('info-left');
      infoRight.classList.add('info-right');
      closeBtnContainer.classList.add('close-btn-container');
      closeBtnButton.classList.add('add-btn');
      closeBtnButton.classList.add('close-modal');
      inforCloseCross.classList.add('fa-solid');
      inforCloseCross.classList.add('fa-xmark');

      infoImg.setAttribute('src', books[index].imageLink);
      inforCloseCross.setAttribute('id', 'closeMocalCross');
      closeBtnButton.setAttribute('id', 'close-modal');

      infoPrice.innerHTML = `Price: ${books[index].price}`;
      infoCategory.innerHTML = `Category: ${books[index].category}`;
      infoAuthor.innerHTML = `Written by: ${books[index].author}`;
      infoDescription.innerHTML = `Description: ${books[index].description}`;
      closeBtnButton.innerHTML = 'Close';
      infoBookTitle.innerHTML = books[index].title;

      infoLeft.appendChild(infoImg);

      infoRight.appendChild(inforCloseCross);
      infoRight.appendChild(infoPrice);
      infoRight.appendChild(infoCategory);
      infoRight.appendChild(infoAuthor);
      infoRight.appendChild(infoDescription);

      closeBtnContainer.appendChild(closeBtnButton);

      infoWrapperInner.appendChild(infoLeft);
      infoWrapperInner.appendChild(infoRight);

      infoWrapper.appendChild(infoBookTitle);
      infoWrapper.appendChild(infoWrapperInner);
      infoWrapper.appendChild(closeBtnContainer);

      moreInfo.appendChild(infoWrapper);
      toggleShowMore();
      closeOnClick();
    });
  });
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
  let cartTotal = document.getElementById('cart-total');
  page.innerHTML = parentEl.classList.contains('cart-wrapper') ? 'CART' : 'CATALOG';
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

      container.setAttribute('data', book.id);
      container.setAttribute('draggable', 'true');

      xmark.setAttribute('data', Object.keys(book)[7]);

      price.innerHTML = `Price: $${book.price}`;

      author.innerHTML = book.author;
      title.innerHTML = book.title;
      category.innerHTML = book.category;

      bookInfo.appendChild(category);
      bookInfo.appendChild(title);
      bookInfo.appendChild(author);
      bookInfo.appendChild(price);
      if (parentEl.classList.contains('cart-wrapper')) {
        bookInfo.appendChild(xmark);
        cartTotal.innerHTML = `Total: $` + getTotal(books);
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

      if (!parentEl.classList.contains('cart-wrapper')) {
        infoSection.appendChild(actions);
      }
      container.appendChild(mainSection);
      container.appendChild(infoSection);
      parentEl.appendChild(container);
    });
  }

  deleteBookFromCart();
};

export const deleteBookFromCart = () => {
  const addedBooks = JSON.parse(localStorage.getItem('addedBooks'));
  const deleteBtns = document.getElementsByClassName('fa-xmark');
  Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data');
      console.log(id);
      const booksInCart = addedBooks.filter((book) => {
        return Object.keys(book)[7] !== id;
      });
      localStorage.setItem('addedBooks', JSON.stringify(booksInCart));
      location.reload();
      window.history.back();
      displayRaws(booksInCart, cartWrapper);
    });
  });
};

export const addBookToCart = (books) => {
  let cartWrapper = document.getElementById('cart-wrapper');
  const addBtns = document.getElementsByClassName('add-btn');
  Array.from(addBtns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data');
      let length = JSON.parse(localStorage.getItem('addedBooks'));
      length = length ? length.length : (length = 0);
      const uniqId = length + books[index].author.substring(0, 4);

      booksInCart = [...booksInCart, { ...books[index], [uniqId]: length + books[index].author }];
      localStorage.setItem('addedBooks', JSON.stringify(booksInCart));
      const addedBooksLS = JSON.parse(localStorage.getItem('addedBooks'));

      displayRaws(addedBooksLS, cartWrapper);
      deleteBookFromCart();
    });
  });
};

// Drag and drop
export const drag = () => {
  let bookRows = document.getElementsByClassName('bookRow');
  Array.from(bookRows).forEach((row) => {
    row.addEventListener('dragstart', dragstart);
    row.addEventListener('dragend', dragend);
  });
};

const dragstart = () => {
  console.log('srated');
};

const dragend = (e) => {
  let x = e.pageX;
  let y = e.pageY;

  const index = e.target.getAttribute('data');
  const books = JSON.parse(localStorage.getItem('allBooks'));

  if (parseInt(x, 10) > 886 && parseInt(y, 10) > 232) {
    let length = JSON.parse(localStorage.getItem('addedBooks'));
    const uniqId = length + books[index].author.substring(0, 4);
    booksInCart = [...booksInCart, { ...books[index], [uniqId]: length + books[index].author }];
    localStorage.setItem('addedBooks', JSON.stringify(booksInCart));

    const addedBooksLS = JSON.parse(localStorage.getItem('addedBooks'));
    let cartWrapper = document.getElementById('cart-wrapper');
    displayRaws(addedBooksLS, cartWrapper);
    deleteBookFromCart();
  }

  console.log('ended');
};
