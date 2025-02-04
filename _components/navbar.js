class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const response = await fetch('/_data/eventos.json'); // Ruta al JSON de eventos
    const data = await response.json();

    // Extraer los eventos por año
    const eventos = data.Eventos.Presencial;
    let eventosDropdown = "";
    Object.keys(eventos).forEach((año) => {
      eventosDropdown += `
        <li><a class="dropdown-item" href="${eventos[año]["Sobre el evento"]["Evento " + año]}">${año}</a></li>
      `;
    });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="/_assets/_css/global.css">

      <nav class="navbar navbar-expand-lg fixed-top">
          <div class="container">
              <a class="navbar-brand" href="/">
                  <img src="/_assets/_img/logos/PB.svg" alt="Logo" width="120">
              </a>
              <button class="navbar-toggler" type="button" id="toggle-button">
                  <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav ms-auto">
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="somosDropdown">Somos</a>
                          <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="/_pages/es/quienes_somos.html">Quiénes Somos</a></li>
                              <li><a class="dropdown-item" href="/_pages/es/Comunidad.html">Comunidad</a></li>
                          </ul>
                      </li>
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="congresoDropdown">Congreso</a>
                          <ul class="dropdown-menu">
                              ${eventosDropdown}
                          </ul>
                      </li>
                      <li class="nav-item"><a class="nav-link" href="/_pages/es/contacto.html">Contacto</a></li>
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="idiomaDropdown">🌎 Idioma</a>
                          <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="/_pages/es/index.html">Español</a></li>
                              <li><a class="dropdown-item" href="/_pages/en/index.html">English</a></li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>

      <style>
      .navbar {
          background-color: var(--fondo-oscuro);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .navbar .nav-link {
          color: white;
          font-weight: 600;
          transition: color 0.3s ease-in-out;
      }

      .navbar .nav-link:hover {
          color: var(--elementos-interactivos);
      }

      .dropdown-menu {
          background-color: var(--fondo-claro);
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .dropdown-menu .dropdown-item {
          color: var(--titulo-encabezado);
          font-weight: 500;
      }

      .dropdown-menu .dropdown-item:hover {
          background-color: var(--elementos-interactivos);
          color: white;
      }
      </style>
    `;

    this.initDropdowns();
  }

  initDropdowns() {
    const dropdownElements = this.shadowRoot.querySelectorAll('.dropdown-toggle');
    dropdownElements.forEach(dropdown => {
      dropdown.addEventListener('click', (event) => {
        event.preventDefault();
        const menu = dropdown.nextElementSibling;
        if (menu) {
          menu.classList.toggle("show");
        }
      });
    });

    const toggleButton = this.shadowRoot.querySelector("#toggle-button");
    const navbarCollapse = this.shadowRoot.querySelector("#navbarNav");
    if (toggleButton && navbarCollapse) {
      toggleButton.addEventListener("click", () => {
        navbarCollapse.classList.toggle("show");
      });
    }
  }
}

customElements.define("custom-navbar", CustomNavbar);
