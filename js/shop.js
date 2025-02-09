let productsWrapper = document.querySelector(".products-wrapper");
let products = JSON.parse(localStorage.getItem("products")) || [];
let categoryLists = document.querySelectorAll("#categoryFilterLists li");
let allProductsBtn = document.querySelector("#allProducts");
let rateDivs = document.querySelectorAll("#rateFilter div");
let sortSelect = document.querySelector("#sort");
let searchInput = document.querySelector("#search");

function displayProducts(filteredProducts) {
  productsWrapper.innerHTML = "";
  filteredProducts.forEach((product) => {
    let stars = "⭐".repeat(product.rating);
    productsWrapper.innerHTML += `
       <div class="product-item">
          <div>
              <img src="${product.image}" alt="image" width="150px" height="150px" class="product-img"/>
          </div>
          <h4>${product.brand} ${product.model}</h4>
          <p class="text-danger">${product.price}</p>
          <p>${stars} ${product.rating} </p>
          <button class="btn btn-dark add-to-cart">Add to cart</button>
       </div>   
      `;
  });
}

displayProducts(products);

allProductsBtn.addEventListener("click", () => {
  displayProducts(products);
});

categoryLists.forEach((list) => {
  list.addEventListener("click", () => {
    let selectedCategory = list.textContent.trim();
    let filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
    displayProducts(filteredProducts);
  });
});

rateDivs.forEach((div) => {
  div.addEventListener("click", () => {
    let selectedRate = parseInt(div.getAttribute("data-rate"));
    let filteredProducts = products.filter(
      (product) => parseInt(product.rating) === selectedRate
    );
    displayProducts(filteredProducts);
  });
});

sortSelect.addEventListener("change", () => {
  let selectedSort = sortSelect.value;

  let sortedProducts = [...products];

  if (selectedSort === "highToLow") {
    sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else {
    sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }
  displayProducts(sortedProducts);
});

searchInput.addEventListener("input", (e) => {
  let searchText = e.target.value.toLowerCase();
  let filteredProducts = products.filter((product) => {
    let fullName = `${product.brand} ${product.model}`.toLowerCase();
    return fullName.includes(searchText);
  });
  displayProducts(filteredProducts);
});

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

let loggedInUser = getLoggedInUser();

if (!loggedInUser) {
  window.location.href = "login.html";
}

let cart =
  JSON.parse(localStorage.getItem(`cart_${loggedInUser.username}`)) || [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    let productDiv = e.target.closest("div");

    console.log(productDiv);

    let product = {
      brand: productDiv.querySelector("h4").textContent.split(" ")[0],
      model: productDiv
        .querySelector("h4")
        .textContent.split(" ")
        .slice(1)
        .join(" "),
      price: productDiv.querySelector(".text-danger").textContent,
      image: productDiv.querySelector("img").src,
      rating: productDiv.querySelector("p:nth-of-type(2)").textContent.trim(),
      quantity: 1,
    };

    let existingProduct = cart.find(
      (item) => item.brand === product.brand && item.model === product.model
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }
    localStorage.setItem(`cart_${loggedInUser.username}`, JSON.stringify(cart));
    alert("Product added to cart!");
  }
});

document.addEventListener("click", (e) => {
  let productItem = e.target.closest(".product-item");

  if (productItem && !e.target.closest(".add-to-cart")) {
    let product = {
      brand: productItem.querySelector("h4").textContent.split(" ")[0],
      model: productItem
        .querySelector("h4")
        .textContent.split(" ")
        .slice(1)
        .join(" "),
      price: productItem.querySelector(".text-danger").textContent,
      image: productItem.querySelector("img").src,
      rating: productItem.querySelector("p:nth-of-type(2)").textContent.trim(),
    };
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "productDetail.html";
  }
});
