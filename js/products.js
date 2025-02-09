const productData = document.querySelector("#product-data");

let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  productData.innerHTML = "";
  products.forEach((product, index) => {
    productData.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${product.brand}</td>
        <td>${product.model}</td>
        <td>${product.category}</td>
        <td><img src="${
          product.image
        }" alt="image" width="120px" height="80px" style="border-radius: 5px;"/></td>
        <td>${product.price}</td>
        <td>${product.rating}</td>
        <td class="d-flex gap-3">
          <button class="btn btn-primary" onclick="updateProduct(${
            product.id
          })">Update</button>
          <button class="btn btn-danger" onclick="deleteProduct(${
            product.id
          })">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);

  products = products.map((product, index) => ({
    ...product,
    id: index + 1,
  }));

  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();
}

function updateProduct(id) {
  let selectedProduct = products.find((product) => product.id === id);
  if (selectedProduct) {
    localStorage.setItem("editProduct", JSON.stringify(selectedProduct));
    window.location.href = "../pages/createProduct.html";
  }
}

renderProducts();
