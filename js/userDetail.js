document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let productForSaleBtn = document.getElementById("productForSale");
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    let userDetailSection = document.querySelector(".user-detail div");

    if (userDetailSection) {
      userDetailSection.innerHTML = `
          <h3 class="text-danger">User Details</h3>
          <p><strong>Name:</strong> ${loggedInUser.name || "Not Found"}</p>
          <p><strong>Surname:</strong> ${
            loggedInUser.surname || "Not Found"
          }</p>
          <p><strong>Email:</strong> ${loggedInUser.email}</p>
          <p><strong>Username:</strong>${loggedInUser.username}</p>
        `;
    }
  } else {
    productForSaleBtn.disabled = "true";
  }
});
