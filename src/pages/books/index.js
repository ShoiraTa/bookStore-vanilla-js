const toggleShowMore = () => {
  var x = document.getElementById('more-info');
  const body = document.getElementsByTagName('body')[0];
  if (x.style.display === 'none') {
    x.style.display = 'flex';
    console.log('open');
  } else {
    x.style.display = 'none';
    console.log('closed');
  }
};

const fetchBooks = async () => {
  const response = await fetch('./books.json');
  const books = response.json();
  return books;
};

const closeOnClick = () => {
  const closeModal = document.getElementById('close-modal');
  console.log(closeModal);
  closeModal.addEventListener('click', () => {
    toggleShowMore();
  });
};

fetchBooks().then((books) => {
  books.map((book) => {
    let booksContainer = document.getElementById('booksContainer');
    let container = document.createElement('div');
    container.classList.add('bookRow');

    let leftSection = `
    <div class="middle-section border">
          <div class="img-div">
            <img src=${book.imageLink} />
          </div>
      </div>
      <div class="left-section">
        <div class="bookInfo ">
          <p class="category">${book.category}</p>
          <h1 class="title">${book.title}</h1>
          <p class="author">${book.author}</p>
          <p class='price'> Price: $${book.price}</p>
        </div>
        <div class="actions">
        <ul>
          <li> 
          <button type="button" class="right-section__show-more" data="${book.id}"> 
             Show more
          </button>
          </li>
          <li> 
          <button class="update-btn" type="button">Add to bag</button>
          </li>
        </ul>
        </div>
      </div>
        `;
    container.innerHTML = leftSection;
    booksContainer.appendChild(container);
  });
});

fetchBooks().then((books) => {
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
          <div class ='infor-right'>
            <p><strong>Price:</strong> ${books[index].price}</p>
            <p><strong>Category:</strong> ${books[index].category}</p>
            <p><strong>Written by:</strong> ${books[index].author}</p>
            <p><strong>Description:</strong> <br /> <p>${books[index].description}</p></p> 
          </div>
        </div>
        <div class="close-btn-container">
          <button type="button" class="update-btn close-modal" id="close-modal">Close</button>
        <div>
      </div>`;
      toggleShowMore();
      closeOnClick();
    });
  });
});
