class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    // Cargamos el JSON de configuración y menús
    const response = await fetch('/_data/eventos.json');
    const data = await response.json();

    // Obtenemos el idioma por defecto y preparamos una función para reemplazar el placeholder {idioma}
    const idiomaDefault = data.config.idioma.default;
    const replaceIdioma = (ruta) => ruta.replace('{idioma}', idiomaDefault);

    // --- Construcción del navbar global ---
    let globalNavItemsHTML = '';

    // Recorremos los ítems de navbar.global (excepto el selector de idioma, que lo agregamos después)
    for (const [key, value] of Object.entries(data.navbar.global)) {
      if (key === "Selector de idioma") {
        continue; // se procesa más adelante
      }
      if (typeof value === 'object') {
        // Creamos un dropdown para items con submenús
        let dropdownHTML = '';
        for (const [subKey, subValue] of Object.entries(value)) {
          dropdownHTML += `<li><a class="dropdown-item" href="${replaceIdioma(subValue)}">${subKey}</a></li>`;
        }
        globalNavItemsHTML += `
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="${key.replace(/\s/g, '')}Dropdown">${key}</a>
            <ul class="dropdown-menu">
              ${dropdownHTML}
            </ul>
          </li>
        `;
      } else if (typeof value === 'string') {
        // Enlace simple
        globalNavItemsHTML += `<li class="nav-item"><a class="nav-link" href="${replaceIdioma(value)}">${key}</a></li>`;
      }
    }

    // Agregamos el dropdown de idioma usando data.config.idioma.opciones
    let idiomaDropdownHTML = '';
    for (const [langKey, langName] of Object.entries(data.config.idioma.opciones)) {
      // Suponemos que las páginas de inicio siguen la ruta "/_pages/{lang}/index.html"
      idiomaDropdownHTML += `<li><a class="dropdown-item" href="/_pages/${langKey}/index.html">${langName}</a></li>`;
    }
    globalNavItemsHTML += `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="idiomaDropdown">🌎 Idioma</a>
        <ul class="dropdown-menu">
          ${idiomaDropdownHTML}
        </ul>
      </li>
    `;

    // --- Construcción del navbar de eventos ---
    // Para el ejemplo, usamos los eventos Presencial.
    const eventos = data.navbar.eventos.Presencial;
    let eventosDropdown = "";
    for (const año in eventos) {
      const eventInfo = eventos[año];
      const sobreEvento = eventInfo["Sobre el evento"];
      // Intentamos usar "Evento {año}"; si no existe, se usa "Descripcion" (o se puede ajustar)
      const eventLink = sobreEvento["Evento " + año] || sobreEvento["Descripcion"] || "#";
      eventosDropdown += `<li><a class="dropdown-item" href="${eventLink}">${año}</a></li>`;
    }

    // --- Insertamos el HTML en el shadow DOM ---
    this.shadowRoot.innerHTML = `
      <!-- Incluimos Bootstrap y estilos globales -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="/_assets/_css/global.css">

      <!-- Navbar Global -->
      <nav class="navbar navbar-expand-lg fixed-top global-navbar">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img src="/_assets/_img/logos/PB.svg" alt="Logo" width="120">
          </a>
          <button class="navbar-toggler" type="button" id="global-toggle-button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="globalNavbarNav">
            <ul class="navbar-nav ms-auto">
              ${globalNavItemsHTML}
            </ul>
          </div>
        </div>
      </nav>

      <!-- Navbar de Eventos (se ubicará justo debajo del global) -->
      <nav class="navbar navbar-expand-lg fixed-top event-navbar">
        <div class="container">
          <button class="navbar-toggler" type="button" id="event-toggle-button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="eventNavbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="congresoDropdown">Congreso</a>
                <ul class="dropdown-menu">
                  ${eventosDropdown}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>
        /* Estilos generales para ambos navbars */
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
        /* Ajustes específicos para el navbar global */
        .global-navbar {
          z-index: 1050;
        }
        /* El navbar de eventos se ubica debajo del global */
        .event-navbar {
          top: 56px; /* Ajusta según la altura del navbar global */
          z-index: 1040;
        }
        /* Se asegura que el contenido no quede tapado por los navbars fijos */
        :host-context(body) {
          padding-top: 112px; /* Suma de alturas aproximadas */
        }
      </style>
    `;

    // Inicializamos la funcionalidad de dropdowns y togglers
    this.initDropdowns();
  }

  initDropdowns() {
    // Manejo de dropdowns para ambos navbars
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

    // Toggler del navbar global
    const globalToggleButton = this.shadowRoot.querySelector("#global-toggle-button");
    const globalNavbarCollapse = this.shadowRoot.querySelector("#globalNavbarNav");
    if (globalToggleButton && globalNavbarCollapse) {
      globalToggleButton.addEventListener("click", () => {
        globalNavbarCollapse.classList.toggle("show");
      });
    }

    // Toggler del navbar de eventos
    const eventToggleButton = this.shadowRoot.querySelector("#event-toggle-button");
    const eventNavbarCollapse = this.shadowRoot.querySelector("#eventNavbarNav");
    if (eventToggleButton && eventNavbarCollapse) {
      eventToggleButton.addEventListener("click", () => {
        eventNavbarCollapse.classList.toggle("show");
      });
    }
  }
}

customElements.define("custom-navbar", CustomNavbar);
