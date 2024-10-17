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

window.addEventListener("load", function () {
  document.getElementsByTagName("head")[0].innerHTML += bootstrapCDN;
  document.querySelector(".page-header").innerHTML = header;
});
