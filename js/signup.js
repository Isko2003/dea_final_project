const inputs = document.querySelectorAll("input");
const okButton = document.querySelector("#okButton");
const form = document.querySelector("form");
const successModal = new bootstrap.Modal(
  document.getElementById("successModal")
);

const errorMessage = document.createElement("p");
errorMessage.style.color = "red";
errorMessage.style.marginTop = "10px";
form.appendChild(errorMessage);

const users = JSON.parse(localStorage.getItem("users")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmpty = false;

  const newUser = {};
  inputs.forEach((input) => {
    if (input.value === "") {
      input.style.border = "1px solid red";
      isEmpty = true;
    } else {
      input.style.border = "1px solid green";
      newUser[input.name] = input.value.trim();
    }
  });

  if (isEmpty) {
    errorMessage.textContent = "Butun Saheleri Doldurun.";
    return;
  } else {
    errorMessage.textContent = "";
  }

  const emailExists = users.some((user) => user.email === newUser.email);

  if (emailExists) {
    errorMessage.textContent = "Bu email artıq istifadə olunub!";
    return;
  } else {
    errorMessage.textContent = "";
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  inputs.forEach((input) => {
    input.value = "";
    input.style.border = "1px solid #ced4da";
  });

  successModal.show();
});

window.onload = function () {
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (isLoggedIn) {
    alert(
      "Siz artıq qeydiyyatdan keçib login olmusuz signup səhifəsinə keçid edə bilməzsiniz!"
    );
    window.location.href = "index.html";
  }
};

okButton.addEventListener("click", () => {
  window.location.href = "login.html";
});
