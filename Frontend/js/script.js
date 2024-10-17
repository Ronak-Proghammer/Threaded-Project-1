let header = `<nav class="header navbar navbar-expand-lg navbar-light">
      <a class="title-container" href="index.html">
        <img class="header-image" src="static/travel-logo.png" />
        <p class="header-title">Travel Experts</p>
      </a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register.html">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contact.html">Contact Us</a>
          </li>
        </ul>
      </div>
      <section class="action-buttons">
        <button type="button" class="btn btn-light">Login</button>
        <button type="button" class="btn btn-secondary" onclick="location.href = '/register.html'">Sign up</button>
      </section>
    </nav>`;

let bootstrapCDN = `<link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>`;

// const imagePath = "static/image.jpg";

const desc = [
  "A stunning view of outer space filled with stars and planets. The vastness of the universe creates a sense of wonder and awe.",
  "A vast desert landscape with rolling sand dunes. The golden sand stretches endlessly under the scorching sun.",
  "A calm lake surrounded by autumn trees and a clear sky. The water reflects the vibrant colors of the season in perfect tranquility.",
  "A quaint village nestled in green hills with a peaceful atmosphere. The charming cottages and winding roads offer a sense of quiet retreat.",
];

const title = [
  "Outer Space",
  "Desert Dunes",
  "Serene Lake",
  "Village in the Hills",
];

const URLs = [
  "https://science.ucalgary.ca/rothney-observatory",
  "http://www.desertsafaridubai.com/",
  "https://www.alltrails.com/trail/canada/alberta/pinto-lake",
  "https://www.villageofthehills.org/",
];

const setImages = () => {
  const gallery = document.querySelector(".gallery");

  title.forEach((value, index) => {
    const container = document.createElement("div");
    const containerImage = document.createElement("img");
    const containerDesc = document.createElement("div");
    const containerTitle = document.createElement("div");
    container.className = `gallery-container`;
    container.id = `gallery-${index + 1}`;

    let imagePath = `static/image${index + 1}.jpg`;

    containerImage.src = imagePath;
    containerImage.className = "images";
    containerImage.id = `image-${index}`;

    containerDesc.innerHTML = desc[index];
    containerDesc.className = "desc";

    containerTitle.innerHTML = title[index];
    containerTitle.className = "img-title";

    gallery.appendChild(container);
    container.appendChild(containerImage);
    container.appendChild(containerDesc);
    container.appendChild(containerTitle);

    if (index % 2 != 0) {
      container.style.flexDirection = "row-reverse";
    }

    container.onmouseover = () => {
      containerDesc.style.visibility = "visible";
      containerImage.style.animation =
        index % 2 != 0
          ? "animate-reverse 1s 1 forwards cubic-bezier(1, 0, 0.21, 1)"
          : "animate 1s 1 forwards cubic-bezier(1, 0, 0.21, 1)";
    };

    containerImage.addEventListener("click", openURL);
  });
};

const openURL = (event) => {
  const newWindow = window.open("", "_blank", "height=400,width=450");
  let index = event.target.id.split("-")[1];
  let secondsLeft = 5;

  if (newWindow && newWindow.focus) {
    newWindow.document.body.innerHTML = `<div style="font-family: Arial, sans-serif; text-align: center; padding: 30px; background-color: #f4f4f4; border-radius: 10px; width: 80%; max-width: 500px; margin: 50px auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #333; margin-bottom: 10px;">You will be redirected to:</p>
    <a href="${URLs[index]}" id="image_url" target="_blank" style="font-size: 20px; color: #007BFF; text-decoration: none; font-weight: bold;">${URLs[index]}</a>
    <p style="font-size: 16px; color: #555; margin-top: 20px;">in <span id="timer" style="font-weight: bold; color: #FF6347;">${secondsLeft}</span> seconds</p>
    <button id="cancelBtn" style="margin-top: 20px; padding: 10px 20px; background-color: #FF6347; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">Cancel</button>
</div>`;

    newWindow.focus();

    let timeLeft = 5;
    const timerElement = newWindow.document.getElementById("timer");
    const imageUrl = newWindow.document.getElementById("image_url");
    console.log(imageUrl);
    imageUrl.addEventListener('click',()=>{
      clearInterval(countdown);
      newWindow.close();
    })

    const countdown = setInterval(() => {
      timeLeft -= 1;
      timerElement.innerText = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        newWindow.close();
        window.location.href = URLs[index];
      }
    }, 1000);

    const cancelButton = newWindow.document.getElementById("cancelBtn");
    cancelButton.addEventListener("click", () => {
      clearInterval(countdown);
      newWindow.document.body.innerHTML = "<p>Redirection canceled.</p>";
    });
    
  }
};

onload = () => {
  document.getElementsByTagName("head")[0].innerHTML += bootstrapCDN;
  document.querySelector(".page-header").innerHTML = header;
  setImages();
};
