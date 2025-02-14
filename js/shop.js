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

document.addEventListener("DOMContentLoaded", () => {
  const defaultProducts = [
    {
      id: 1,
      brand: "Samsung",
      category: "Smartphones",
      image:
        "https://images.unsplash.com/photo-1706469980834-36cc556c02c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHMyNHxlbnwwfHwwfHx8MA%3D%3D",
      model: "S 24",
      price: "2000",
      rating: "5",
    },
    {
      id: 2,
      brand: "Iphone",
      category: "Smartphones",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqaTQEW07oDjeFyvz6qZ0Ssb49C0jtxJX6A&s",
      model: "13 Pro Max",
      price: "4000",
      rating: "5",
    },
    {
      id: 3,
      brand: "Asus",
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1698512475067-74ed7c956c8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXN1cyUyMHR1ZnxlbnwwfHwwfHx8MA%3D%3D",
      model: "Tuf Gaming F15",
      price: "4500",
      rating: "5",
    },
    {
      id: 4,
      brand: "HP",
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SFAlMjB2aWN0dXN8ZW58MHx8MHx8fDA%3D",
      model: "Victus",
      price: "4500",
      rating: "5",
    },
    {
      id: 5,
      brand: "HP",
      category: "Laptops",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqj4a7g6PF4_v77ZSKD_ioRbUUsYpeHOebCQ&s",
      model: "Omen 16",
      price: "4500",
      rating: "5",
    },
    {
      id: 6,
      brand: "Xbox",
      category: "Gaming",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNh6TmN911dvHIe3etjBGHPMupOQLhVjlr2Q&s",
      model: "Series X",
      price: "1500",
      rating: "4",
    },
    {
      id: 7,
      brand: "P9",
      category: "Audio",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYwYpr-XUUuHY4lE-v30_TRx1Iiqh7gJ4Xuw&s",
      model: "Pro Max",
      price: "500",
      rating: "5",
    },
    {
      id: 8,
      brand: "Casper",
      category: "Laptops",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vAdkkHddhQiGb80X_KkU3nsW8z5xFmFxYA&s",
      model: "Excalibur G900",
      price: "2500",
      rating: "5",
    },
    {
      id: 9,
      brand: "Casper",
      category: "Computers",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNn-wXxUNI6nw6zyVLjBPoWPBinttFqLUv0A&s",
      model: "Nirvana",
      price: "4500",
      rating: "5",
    },
  ];

  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (!products || products.length === 0) {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
    products = defaultProducts;
  }
});
