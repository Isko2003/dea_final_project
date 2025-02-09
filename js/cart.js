function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}
let loggedInUser = getLoggedInUser();

if (!loggedInUser) {
  window.location.href = "login.html";
}

let cartWrapper = document.querySelector(".cart-wrapper");
let cart =
  JSON.parse(localStorage.getItem(`cart_${loggedInUser.username}`)) || [];

function displayCartProducts() {
  cartWrapper.innerHTML = "";

  let totalPriceContainer = document.querySelector("#total-price-container");

  if (!totalPriceContainer) {
    totalPriceContainer = document.createElement("div");
    totalPriceContainer.id = "total-price-container";
    totalPriceContainer.classList.add("cart-total");
    cartWrapper.after(totalPriceContainer);
  }

  if (cart.length === 0) {
    cartWrapper.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceContainer.innerHTML = "";
    return;
  }

  cart.forEach((product, index) => {
    cartWrapper.innerHTML += `
      <div class="cart-item">
          <img src="${product.image}" alt="${product.brand}" width="100"/>
          <h4>${product.brand} ${product.model}</h4>
          <p class="text-danger">Price: ${product.price}$</p>
          <p>⭐ ${product.rating}</p>
          <p>Quantity: ${product.quantity}</p>
          <button class="btn btn-danger remove-from-cart" data-index="${index}">Remove</button>
      </div>
    `;
  });

  console.log(cart);

  let subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  totalPriceContainer.innerHTML = `
    <h3>Cart total</h3>
    <div class="total-item">
        <span>Subtotal</span>
        <span id="subtotal">$${subtotal.toFixed(2)}</span>
    </div>
    <div class="total-item">
        <span>Shipping</span>
        <span>free</span>
    </div>
    <hr />
    <div class="total-item total">
        <span>Total</span>
        <span id="total">$${subtotal.toFixed(2)}</span>
    </div>
    <button class="checkout-btn">Proceed to checkout</button>
  `;
}

document.querySelector(".cart-wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart")) {
    let index = parseInt(e.target.getAttribute("data-index"));
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem(`cart_${loggedInUser.username}`, JSON.stringify(cart));
    displayCartProducts();
  }
});

displayCartProducts();
