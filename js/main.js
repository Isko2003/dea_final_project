document.addEventListener("DOMContentLoaded", () => {
  loadComponent("../components/header.html", "header", () => {
    initHeaderFunctions();
  });
  loadComponent("../components/footer.html", "footer");
});

function loadComponent(url, targetElement, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(targetElement).innerHTML = data;
      if (callback) callback();
    })
    .catch((err) => console.error(`Error loading ${url}`, err));
}

function initHeaderFunctions() {
  updateUsername();
  setupLogout();
}

function updateUsername() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let userNameText = document.querySelector("#usernameText");
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser && userNameText) {
    userNameText.textContent = loggedInUser.username;
  } else {
    userNameText.textContent = "username";
  }
}

function setupLogout() {
  const logoutButton = document.querySelector("#logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      let isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn !== "true") return;

      const logoutModal = new bootstrap.Modal(
        document.getElementById("logoutModal")
      );
      logoutModal.show();
    });
  }

  document.querySelector("#confirmLogout")?.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("loggedInUser");
    updateUsername();
    window.location.reload();
    window.location.href = "../login.html";
  });
}

document.addEventListener("click", function (event) {
  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (
    !navbar.contains(event.target) &&
    navbarCollapse.classList.contains("show")
  ) {
    const navbarToggler = document.querySelector(".navbar-toggler");
    navbarToggler.click();
  }
});
