let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

if (selectedProduct) {
  document.querySelector("#productImage").src = selectedProduct.image;
  document.querySelector(
    "#productTitle"
  ).textContent = `${selectedProduct.brand} ${selectedProduct.model}`;
  document.querySelector(
    "#productPrice"
  ).textContent = `${selectedProduct.price}`;
  document.querySelector(
    "#productRating"
  ).textContent = `${selectedProduct.rating}`;
} else {
  document.body.innerHTML = `<h2>Product Not Found</h2>`;
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

let loggedInUser = getLoggedInUser();

let cart = JSON.parse(localStorage.getItem(`cart_${loggedInUser.username}`));
let productImg = document.querySelector("#productImage");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    let productDetail = e.target.parentNode;

    let product = {
      brand: productDetail.querySelector("h1").textContent.split(" ")[0],
      model: productDetail
        .querySelector("h1")
        .textContent.split(" ")
        .slice(1)
        .join(" "),
      price: productDetail.querySelector(".price").textContent,
      image: productImg.src,
      rating: productDetail.querySelector(".rating").textContent.trim(),
      quantity: 1,
    };

    console.log(product);

    let existingProduct = cart.find(
      (item) => item.brand === product.brand && item.model === product.model
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }

    localStorage.setItem(`cart_${loggedInUser.username}`, JSON.stringify(cart));
    alert("product added to cart!");

    // console.log(product);
    // console.log(productDetail);
  }
});
