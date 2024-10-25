let isLoggedIn;

let header = `<nav class="header navbar navbar-expand-lg navbar-light px-2">
      <a class="title-container" href="index.html">
        <img class="header-image" src="/static/travel-logo.png" />
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
          <li class="nav-item">
            <a class="nav-link" href="/packages.html">Packages</a>
          </li>
        </ul>
      </div>
      <section class="action-buttons user-info-header">
        <button type="button" class="btn btn-light mx-2" onclick="window.location.href = '/user/login';">Login</button>
        <button type="button" class="btn btn-secondary mr-2" onclick="location.href = '/register.html'">Sign up</button>
      </section>
    </nav>`;

const setHeader = ({ CustFirstName, CustLastName }) => {
  const newHeader = `<nav class="header navbar navbar-expand-lg navbar-light px-2">
      <a class="title-container" href="index.html">
        <img class="header-image" src="/static/travel-logo.png" />
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
          <li class="nav-item">
            <a class="nav-link" href="/packages.html">Packages</a>
          </li>
        </ul>
      </div>
      <section class="user-info-header">
        Welcome, ${[CustFirstName, CustLastName].join(" ")}
        <button type="button" class="btn btn-secondary mx-2" onclick="window.location.href = '/user/logout';">Logout</button>
        <button type="button" class="btn mx-2" onclick="window.location.href = '/user/dashboard';">Profile</button>
      </section>
    </nav>`;
  document.querySelector(".page-header").innerHTML = newHeader;
};

let loginButtons = `<button type="button" class="btn btn-light mx-2" onclick="window.location.href = '/user/login';">Login</button>
        <button type="button" class="btn btn-secondary mr-2" onclick="location.href = '/register.html'">Sign up</button>`;

let bootstrapCDN = `<link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
    ></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>`;

window.addEventListener("DOMContentLoaded", async function () {
  let data = await fetch("/user/loggedIn");
  let res = await data.json();
  isLoggedIn = res.isLoggedIn;
  if (isLoggedIn) {
    setHeader(res.result);
  }
  else{
    document.querySelector(".page-header").innerHTML = header;
  }
});
document.getElementsByTagName("head")[0].innerHTML += bootstrapCDN;
