const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const form = document.querySelector("form");
const successModal = new bootstrap.Modal(
  document.getElementById("successModal")
);
const failedModal = new bootstrap.Modal(document.getElementById("failedModal"));
const okButton = document.querySelector("#successModal .btn-primary");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userExist = users.find(
    (user) =>
      user.username === userNameInput.value &&
      user.password === passwordInput.value
  );

  if (userExist) {
    successModal.show();
    localStorage.setItem("loggedInUser", JSON.stringify(userExist));
  } else {
    failedModal.show();
  }

  localStorage.setItem("isLoggedIn", "true");

  userNameInput.value = "";
  passwordInput.value = "";
});

okButton.addEventListener("click", () => {
  window.location.href = "/index.html";
});
