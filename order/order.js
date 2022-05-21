var expanded = false;
const showCheckboxes = () => {
  var checkboxes = document.getElementById('checkboxes');
  if (!expanded) {
    checkboxes.style.display = 'block';
    expanded = true;
  } else {
    checkboxes.style.display = 'none';
    expanded = false;
  }
};

const setOrderDates = () => {
  // document.getElementById('datePicker').valueAsDate = new Date();
  var today = new Date();
  today = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
  document.getElementById('datePicker').setAttribute('min', today);
};

const handleSubmitBtn = () => {
  let form = document.querySelectorAll('form');

  if (form.length === 1) {
    const name = document.getElementById('name');
    const sirname = document.getElementById('sirname');
    const date = document.getElementById('datePicker');
    const street = document.getElementById('street');
    const house = document.getElementById('house');
    const flat = document.getElementById('flat');
    const Card = document.getElementById('card');
    const Cash = document.getElementById('cash');

    if (
      name.validity.valid &&
      sirname.validity.valid &&
      date.validity.valid &&
      street.validity.valid &&
      house.validity.valid &&
      flat.validity.valid &&
      name.validity.valid &&
      (Card.validity.valid || Cash.validity.valid)
    ) {
      document.getElementById('submit').disabled = false;
    } else {
      document.getElementById('submit').disabled = true;
    }
  }
};

const validateInput = (el) => {
  let error = el.nextElementSibling;
  if (!el.classList.contains('gift')) {
    if (!el.validity.valid) {
      error.style.display = 'block';
      el.classList.add('invalid');
    } else {
      error.style.display = 'none';
      el.classList.remove('invalid');
    }
  }

  if (el.classList.contains('gift')) {
    var checkbox = document.getElementsByClassName('gift');
    if (Array.from(checkbox).filter((box) => box.checked).length > 2) {
      el.checked = false;
    }
  }
};

const getSummary = () => {
  const name = document.getElementById('name').value;
  const sirname = document.getElementById('sirname').value;
  const date = document.getElementById('datePicker').value;
  const street = document.getElementById('street').value;
  const house = document.getElementById('house').value;
  const flat = document.getElementById('flat').value;
  const Card = document.getElementById('card');
  const Cash = document.getElementById('cash');
  const container = document.getElementById('formContainer');
  const summary = document.createElement('div');
  const payment = Card.checked ? 'Card' : 'Cash';

  var gifts = [];
  var checkbox = document.getElementsByClassName('gift');
  for (var i = 0; checkbox[i]; ++i) {
    if (checkbox[i].checked) {
      gifts.push(checkbox[i].value);
    }
  }

  let total = localStorage.getItem('total');

  container.innerHTML = '';
  summary.innerHTML = `
  <h1 class="add-new">ORDER WAS CREATED:</h1>
  <div class="summary-container">
    <p><strong>Total: </strong>$${total}</p>
    <p><strong>First Name: </strong>${name}</p>
    <p><strong>Last Name: </strong>${sirname}</p>
    <p><strong>Date: </strong>${date}</p>
    <p><strong>Street: </strong>${street}</p>
    <p><strong>House: </strong>${house}</p>
    <p><strong>Flat: </strong>${flat}</p>
    <p><strong>Payment method: </strong>${payment}</p>
    <p><strong>Gift: </strong>${gifts.length > 0 ? gifts : 'Not Selected'}</p>
  </div>
  `;
  container.appendChild(summary);
};

// main

let selectBox = document.getElementById('selectBox');
selectBox.addEventListener('click', () => showCheckboxes());
window.addEventListener('mouseup', () => handleSubmitBtn());
window.addEventListener('click', () => handleSubmitBtn());
setOrderDates();

document.getElementById('submit').addEventListener('click', () => getSummary());
