/**
 * customer registartion form data for error check
 */
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("customer-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("submit called");
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      console.log(data);
      try {
        const response = await fetch("/api/addcustomer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            const messageDiv = document.getElementById('success-messages');
            messageDiv.innerHTML = `<div class="alert alert-success">${result.message}</div>`;
            setTimeout(() => {
                window.location.href = '/thank-you?source=registration';
            }, 1000);
        } else {
          const messageDiv = document.getElementById("error-messages");
          messageDiv.innerHTML = "";

          result.errors.forEach((error) => {
            const errorElement = document.createElement("div");
            errorElement.textContent = `${error.msg}`;
            messageDiv.appendChild(errorElement);
          });
        }
      } catch (error) {
        console.error("Error submitting the registration:", error);
        const messageDiv = document.getElementById("error-messages");
        messageDiv.innerHTML = `<div class="alert alert-danger">Error submitting registration</div>`;
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.getElementById("password");
  const cnfrmPasswordField = document.getElementById("confirmPassword");
  const validationList = document.getElementById("validation-list");
  const lowercase = document.getElementById("lowercase");
  const uppercase = document.getElementById("uppercase");
  const number = document.getElementById("number");
  const special = document.getElementById("special");
  const passLength = document.getElementById("length");

  passwordField.addEventListener("focus", () => {
    validationList.style.display = "block";
  });

  // Hide the validation list when the password field loses focus
  passwordField.addEventListener("blur", () => {
    validationList.style.display = "none";
  });

  const validationsChecklist = [
    /[a-z]/,
    /[A-Z]/,
    /\d/,
    /[\W_]/,
    /^[a-zA-Z\d\W_]{8,16}$/,
  ];
  const validationFeilds = [lowercase, uppercase, number, special, passLength];

  passwordField.addEventListener("input", function () {
    const value = passwordField.value;

    validationsChecklist.forEach((ele, index) => {
      if (ele.test(value)) {
        validationFeilds[index].classList.add("valid");
        validationFeilds[index].classList.remove("invalid");
        validationFeilds[index]
          .querySelector("i")
          .classList.replace("fa-times", "fa-check");
        buttonDisabled = false;
      } else {
        validationFeilds[index].classList.add("invalid");
        validationFeilds[index].classList.remove("valid");
        validationFeilds[index]
          .querySelector("i")
          .classList.replace("fa-check", "fa-times");
        buttonDisabled = true;
      }
    });
    document.querySelector(".submit-btn").disabled = buttonDisabled;
    console.log(passwordField.value, cnfrmPasswordField.value);
    if (passwordField.value === cnfrmPasswordField.value) {
      const messageDiv = document.getElementById("success-messages");
      messageDiv.innerHTML = `<div class="alert alert-success">Password Matches</div>`;
    } else {
      const messageDiv = document.getElementById("success-messages");
      messageDiv.innerHTML = `<div class="alert alert-danger">Passwords Don't Match</div>`;
    }
    if (
      passwordField.value.length === 0 &&
      cnfrmPasswordField.value.length === 0
    ) {
      const messageDiv = document.getElementById("success-messages");
      messageDiv.style.display = "none";
    }
  });

  cnfrmPasswordField.addEventListener("input", () => {
    if (passwordField.value === cnfrmPasswordField.value) {
      const messageDiv = document.getElementById("success-messages");
      messageDiv.innerHTML = `<div class="alert alert-success">Password Matches</div>`;
    } else {
      const messageDiv = document.getElementById("success-messages");
      messageDiv.innerHTML = `<div class="alert alert-danger">Passwords Don't Match</div>`;
    }
    if (
      passwordField.value.length === 0 &&
      cnfrmPasswordField.value.length === 0
    ) {
      const messageDiv = document.getElementById("success-messages");
      messageDiv.style.display = "none";
    }
  });
});
