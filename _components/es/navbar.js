class CustomNavbar extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
          <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #F8F9FA;">
              <div class="container">
                  <a class="navbar-brand" href="/">
                      <img src="/_static/logos/BayesPlurinacional.png" alt="Logo" width="120">
                  </a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav ms-auto">
                          <li class="nav-item"><a class="nav-link" href="/_pages/es/somos.html">Somos</a></li>
                          <li class="nav-item"><a class="nav-link" href="/_pages/es/galeria.html">Galería</a></li>
                          <li class="nav-item"><a class="nav-link" href="/_pages/es/contacto.html">Contacto</a></li>
                          <li class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" href="#" id="eventDropdown" role="button" data-bs-toggle="dropdown">Eventos</a>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="/_pages/es/congresos/2025.html">2025</a></li>
                                  <li><a class="dropdown-item" href="/_pages/es/congresos/2024.html">2024</a></li>
                                  <li><a class="dropdown-item" href="/_pages/es/congresos/2023.html">2023</a></li>
                              </ul>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>

          <style>

          /* Navbar */
.navbar {
    background-color: var(--color-primario);
    color: white;
}

.navbar .nav-link {
    color: white;
}

.navbar .nav-link:hover {
    color: var(--color-secundario);
}


          </style>
      `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
