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

// const passwordField = document.getElementById("password");
// const validationList = document.getElementById("validation-list");
// const lowercase = document.getElementById("lowercase");
// const uppercase = document.getElementById("uppercase");
// const number = document.getElementById("number");
// const special = document.getElementById("special");
// const passLength = document.getElementById("length");

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

// passwordField.addEventListener("focus", () => {
//   validationList.style.display = "block";
// });

// // Hide the validation list when the password field loses focus
// passwordField.addEventListener("blur", () => {
//   validationList.style.display = "none";
// });

// const validationsChecklist = [
//   /[a-z]/,
//   /[A-Z]/,
//   /\d/,
//   /[\W_]/,
//   /^[a-zA-Z\d\W_]{8,16}$/,
// ];
// const validationFeilds = [lowercase, uppercase, number, special, passLength];

// passwordField.addEventListener("input", function () {
//   const value = passwordField.value;

//   validationsChecklist.forEach((ele, index) => {
//     if (ele.test(value)) {
//       validationFeilds[index].classList.add("valid");
//       validationFeilds[index].classList.remove("invalid");
//       validationFeilds[index]
//         .querySelector("i")
//         .classList.replace("fa-times", "fa-check");
//       buttonDisabled = false;
//     } else {
//       validationFeilds[index].classList.add("invalid");
//       validationFeilds[index].classList.remove("valid");
//       validationFeilds[index]
//         .querySelector("i")
//         .classList.replace("fa-check", "fa-times");
//       buttonDisabled = true;
//     }
//   });
//   document.querySelector(".login-btn").disabled = buttonDisabled;
// });

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
      }, 4000);
    }

    document.getElementById("message").innerText = result;
  });
