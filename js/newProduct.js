let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");

document.getElementById("image").addEventListener("input", function () {
  const url = this.value.trim();
  const previewDiv = document.getElementById("image-preview");

  if (url) {
    previewDiv.innerHTML = `<img src="${url}" class="img-fluid mt-2" style="max-width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 5px;" alt="Preview">`;
  } else {
    previewDiv.innerHTML = "";
  }
});

const products = JSON.parse(localStorage.getItem("products")) || [];
let editProduct = JSON.parse(localStorage.getItem("editProduct"));

const errorMessage = document.createElement("p");
errorMessage.style.color = "red";
errorMessage.style.marginTop = "10px";
form.appendChild(errorMessage);

if (editProduct) {
  inputs.forEach((input) => {
    input.value = editProduct[input.name] || "";
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newProduct = {};
  let isEmpty = false;

  inputs.forEach((input) => {
    if (input.value === "") {
      errorMessage.style.border = "1px solid red";
      isEmpty = true;
    } else {
      newProduct[input.name] = input.value.trim();
    }
  });

  if (isEmpty) {
    errorMessage.textContent = "Butun saheleri doldurun";
    return;
  } else {
    errorMessage.textContent = "";
  }

  if (editProduct) {
    newProduct.id = editProduct.id;
    let updatedProducts = products.map((product) =>
      product.id === editProduct.id ? newProduct : product
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.removeItem("editProduct");
    alert("mehsul ugurla yenilendi!");
  } else {
    newProduct.id =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    alert("mehsul ugurla yaradildi");
  }

  inputs.forEach((input) => {
    input.value = "";
    input.style.border = "1px solid #ced4da";
  });

  window.location.href = "../products.html";
});
