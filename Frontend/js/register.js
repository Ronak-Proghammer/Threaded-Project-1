// const tooltip = {
//   name: "Enter your full legal name as it appears on your ID.",
//   address:
//     "Enter your complete mailing address, including street number, city, and unit number (if applicable).",
//   province:
//     "Enter your current province of residence in abbrevation.(e.g. ON, AB)",
//   code: "Enter your postal code in the correct format (e.g. A1A 1A1).",
//   gender:
//     "Select your gender identity. If you prefer not to disclose, choose 'Prefer Not To Say'.",
//   email: "Enter a valid email address where we can reach you (e.g. example@anydomain.com ).",
//   phone: "Enter your phone number, including area code (e.g., 123-456-7890).",
//   destination:
//     "Enter your preferred travel destination. Be specific (e.g., Paris, France).",
//   travel_date:
//     "Select your preferred travel date. Use the calendar picker for accuracy.",
//   requests:
//     "Enter any special requests or comments you would like us to consider. For example, dietary needs or room preferences.",
// };

// const setTooltip = () => {
//   document.querySelectorAll("input").forEach((value) => {
//     value.style.position = "relative";
//     const span = document.createElement("span");
//     span.className = "tooltiptext";
//     span.innerHTML = tooltip[value.id]
//     value.parentElement.appendChild(span);

//     value.addEventListener('focus',()=>{
//         value.parentElement.querySelector('.tooltiptext').style.visibility = "visible";
//     });

//     value.addEventListener('focusout',()=>{
//         value.parentElement.querySelector('.tooltiptext').style.visibility = "hidden";
//     })
//   });


// };

// // function confirmSubmit(){
// //   return confirm("Do you really want to Submit");
// // }

// function confirmReset(){
//   return confirm("Do you really want to Reset");
// }

// window.addEventListener("load", function () {
//   setTooltip();
// });


document.getElementById('customer-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Grab form data
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
      const response = await fetch('/api/addcustomer', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
          const messageDiv = document.getElementById('error-messages');
          messageDiv.innerHTML = `<div class="alert alert-success">${result.message}</div>`;
      } else {
          const messageDiv = document.getElementById('error-messages');
          messageDiv.innerHTML = '';

          result.errors.forEach(error => {
              const errorElement = document.createElement('div');
              errorElement.textContent = `${error.msg} (Field: ${error.path})`;
              messageDiv.appendChild(errorElement);
          });
      }
  } catch (error) {
      console.error('Error submitting the registration:', error);
      const messageDiv = document.getElementById('error-messages');
      messageDiv.innerHTML = `<div class="alert alert-danger">Error submitting registration</div>`;
  }
});
