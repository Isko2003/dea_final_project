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

function startCountDown(endTime) {
  function updateCountDown() {
    let now = new Date().getTime();
    let timeLeft = endTime - now;

    if (timeLeft < 0) {
      document.querySelector(".counter").innerHTML = "<h4>Offer Expired!</h4>";
      clearInterval(interval);
      return;
    }

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountDown();
  let interval = setInterval(updateCountDown, 1000);
}

let countdownDate = new Date("Feb 20, 2025 23:59:59").getTime();
startCountDown(countdownDate);
