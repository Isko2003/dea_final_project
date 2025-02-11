function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

let loggedInUser = getLoggedInUser();

let cart = JSON.parse(localStorage.getItem(`cart_${loggedInUser.username}`));

let totalPrice = document.querySelector("#subTotal");
let total = document.querySelector("#totalPrice");

let price = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

totalPrice.innerHTML = `
    ${price}$
`;

total.innerHTML = `
    ${price}$
`;

let inputs = document.querySelectorAll("input");

let select = document.querySelector("select");

let placeOrder = document.querySelector("#place-order");

let checkbox = document.querySelector("#terms");

document.addEventListener("DOMContentLoaded", function () {
  let expMonthInput = document.querySelector("#expMonth");
  let expYearInput = document.querySelector("#expYear");
  let cvvInput = document.querySelector("#cvv");

  function createErrorMessage(inputField, message) {
    let errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "12px";
    errorMessage.textContent = message;

    let existingError =
      inputField.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    errorMessage.classList.add("error-message");
    inputField.parentElement.appendChild(errorMessage);
  }

  function validateExpiration() {
    let month = parseInt(expMonthInput.value, 10);
    let year = parseInt(expYearInput.value);

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;

    if (isNaN(month) || month < 1 || month > 12) {
      createErrorMessage(expMonthInput, "Ay 1-12 arasında olmalıdır");
    } else {
      removeErrorMessage(expMonthInput);
    }

    if (isNaN(year) || year < currentYear) {
      createErrorMessage(expYearInput, "İl cari ildən az ola bilməz");
    } else {
      removeErrorMessage(expYearInput);
    }

    if (year === currentYear && month < currentMonth) {
      createErrorMessage(expYearInput, "Kart müddəti bitib");
    }
  }

  function validateCVV() {
    let cvv = cvvInput.value.trim();
    if (!/^\d{3,4}$/.test(cvv)) {
      createErrorMessage(cvvInput, "CVV 3 və ya 4 rəqəm olmalıdır");
    } else {
      removeErrorMessage(cvvInput);
    }
  }

  function removeErrorMessage(inputField) {
    let error = inputField.parentElement.querySelector(".error-message");
    if (error) {
      error.remove();
    }
  }

  expMonthInput.addEventListener("input", validateExpiration);
  expYearInput.addEventListener("input", validateExpiration);
  cvvInput.addEventListener("input", validateCVV);
});

document.addEventListener("DOMContentLoaded", function () {
  const placeOrderBtn = document.getElementById("place-order");

  placeOrderBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (validateForm()) {
      alert(
        "Sifarişiniz uğurla tamamlandı! Ana səhifəyə yönləndirilirsiniz..."
      );
      window.location.href = "index.html";
    }
  });

  function validateForm() {
    const fields = [
      { id: "firstName", regex: /.+/ },
      { id: "lastName", regex: /.+/ },
      { id: "city", regex: /.+/ },
      { id: "address", regex: /.+/ },
      { id: "zip", regex: /^\d+$/ },
      { id: "tel", regex: /^\d{10,15}$/ },
      { id: "email", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      { id: "cardNumber", regex: /^\d{4} \d{4} \d{4} \d{4}$/ },
      { id: "expMonth", regex: /^(0[1-9]|1[0-2])$/ },
      { id: "expYear", regex: /^(20\d{2}|\d{2})$/ },
      { id: "cvv", regex: /^\d{3,4}$/ },
    ];

    let isValid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (field.regex.test(input.value.trim())) {
        input.style.border = "1px solid green";
      } else {
        input.style.border = "1px solid red";
        isValid = false;
      }
    });

    const terms = document.getElementById("terms");
    if (!terms.checked) {
      terms.nextElementSibling.style.color = "red";
      isValid = false;
    } else {
      terms.nextElementSibling.style.color = "black";
    }

    const state = document.getElementById("state");
    if (state.value === "Choose...") {
      state.style.border = "1px solid red";
      isValid = false;
    } else {
      state.style.border = "1px solid green";
    }

    return isValid;
  }
});
