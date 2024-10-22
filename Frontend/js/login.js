document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const icon = this.querySelector("i");
    // Toggle the type attribute
    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });

let passswordValid = false;
let emailValid = false;

document.getElementById("email").addEventListener("input", (event) => {
  if (
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value)
  ) {
    emailValid = true;
  } else {
    emailValid = false;
  }
  document.querySelector(".login-btn").disabled = !(
    passswordValid && emailValid
  );
});

document.getElementById("password").addEventListener("input", (event) => {
  if (/^\S{8,16}$/.test(event.target.value)) {
    passswordValid = true;
  } else {
    passswordValid = false;
  }
  document.querySelector(".login-btn").disabled = !(
    passswordValid && emailValid
  );
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".login-btn")
    .setAttribute("disabled", !(passswordValid && !emailValid));
});

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.text();
    const status = response.status;

    if (status == "200") {
      setTimeout(() => {
        window.location.href = "/user/dashboard";
      }, 2000);
    }

    document.getElementById("message").innerText = result;
  });
