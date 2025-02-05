class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  async connectedCallback() {
    // 1. Cargar el JSON del navbar global
    const globalResponse = await fetch('/_data/navbar.json');
    const globalData = await globalResponse.json();
    
    // Determinar el idioma: se puede establecer mediante un atributo data-lang; sino, se usa el default.
    const lang = this.getAttribute('data-lang') || globalData.config.idioma.default;
    
    // Diccionario de traducciones (puedes ampliarlo según tus necesidades)
    const translations = {
      es: {
        "Eventos": "Eventos",
        "Presencial": "Presencial",
        "Virtual": "Virtual",
        "Comunidad": "Comunidad",
        "Contacto": "Contacto",
        "Redes Sociales": "Redes Sociales",
        "Conducta": "Conducta",
        "Idioma": "Idioma"
      },
      en: {
        "Eventos": "Events",
        "Presencial": "In Person",
        "Virtual": "Virtual",
        "Comunidad": "Community",
        "Contacto": "Contact",
        "Redes Sociales": "Social Networks",
        "Conducta": "Code of Conduct",
        "Idioma": "Language"
      }
    };
    
    // Función para obtener la traducción de una clave
    const t = key => (translations[lang] && translations[lang][key]) || key;
    
    // Función para reemplazar el placeholder {idioma} en una ruta
    const replaceIdioma = ruta => ruta.replace(/{idioma}/gi, lang);
    
    // Función auxiliar para construir un dropdown a partir de un objeto.
    // Si el valor es un string se asume enlace directo, si es objeto se agrega una cabecera y se listan sus items.
    function buildDropdown(obj) {
      let html = '';
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          html += `<li><a class="dropdown-item" href="${replaceIdioma(obj[key])}">${t(key)}</a></li>`;
        } else if (typeof obj[key] === 'object') {
          // Para niveles anidados: se muestra una cabecera y luego los enlaces
          html += `<li class="dropdown-header">${t(key)}</li>`;
          for (const subKey in obj[key]) {
            html += `<li><a class="dropdown-item" href="${replaceIdioma(obj[key][subKey])}">${t(subKey)}</a></li>`;
          }
        }
      }
      return html;
    }
    
    // 2. Construir el HTML del navbar global usando globalData.navbar.global
    let globalNavHTML = '';
    const globalItems = globalData.navbar.global;
    for (const key in globalItems) {
      const value = globalItems[key];
      if (typeof value === 'string') {
        // Ítem simple: enlace directo
        globalNavHTML += `<li class="nav-item"><a class="nav-link" href="${replaceIdioma(value)}">${t(key)}</a></li>`;
      } else if (typeof value === 'object') {
        // Ítem con dropdown
        const dropdownMenu = buildDropdown(value);
        globalNavHTML += `
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="${key.replace(/\s/g, '')}Dropdown">${t(key)}</a>
            <ul class="dropdown-menu">
              ${dropdownMenu}
            </ul>
          </li>
        `;
      }
    }
    
    const globalNavbarHTML = `
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
              ${globalNavHTML}
            </ul>
          </div>
        </div>
      </nav>
    `;
    
    // 3. Construir el navbar secundario (dependiente del evento)
    // Se mostrará si el componente tiene definidos los atributos:
    //   data-event-type: "Presencial" o "Virtual"
    //   data-event-key: por ejemplo, "Evento 2023"
    let secondaryNavbarHTML = '';
    const eventType = this.getAttribute('data-event-type'); // Ej: "Presencial"
    const eventKey = this.getAttribute('data-event-key');       // Ej: "Evento 2023"
    
    if (eventType && eventKey) {
      const secondaryResponse = await fetch('/_data/secundario.json');
      const secondaryData = await secondaryResponse.json();
      // Se espera que la estructura sea: secondaryData.Evento[eventType][eventKey]
      if (
        secondaryData.Evento &&
        secondaryData.Evento[eventType] &&
        secondaryData.Evento[eventType][eventKey]
      ) {
        const eventItems = secondaryData.Evento[eventType][eventKey];
        let secNavHTML = '';
        for (const key in eventItems) {
          const value = eventItems[key];
          if (typeof value === 'string') {
            secNavHTML += `<li class="nav-item"><a class="nav-link" href="${replaceIdioma(value)}">${key}</a></li>`;
          } else if (typeof value === 'object') {
            let nestedHTML = '';
            for (const subKey in value) {
              nestedHTML += `<li><a class="dropdown-item" href="${replaceIdioma(value[subKey])}">${subKey}</a></li>`;
            }
            secNavHTML += `
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="${key.replace(/\s/g, '')}SecDropdown">${key}</a>
                <ul class="dropdown-menu">
                  ${nestedHTML}
                </ul>
              </li>
            `;
          }
        }
        secondaryNavbarHTML = `
          <nav class="navbar navbar-expand-lg fixed-top secondary-navbar">
            <div class="container">
              <button class="navbar-toggler" type="button" id="secondary-toggle-button">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="secondaryNavbarNav">
                <ul class="navbar-nav ms-auto">
                  ${secNavHTML}
                </ul>
              </div>
            </div>
          </nav>
        `;
      } else if (eventType === "Virtual" && secondaryData.Evento && secondaryData.Evento.Virtual) {
        // Para Virtual se puede definir un comportamiento simple (un enlace directo, por ejemplo)
        const keys = Object.keys(secondaryData.Evento.Virtual);
        if (keys.length > 0) {
          const route = secondaryData.Evento.Virtual[keys[0]];
          secondaryNavbarHTML = `
            <nav class="navbar navbar-expand-lg fixed-top secondary-navbar">
              <div class="container">
                <a class="nav-link" href="${replaceIdioma(route)}">${keys[0]}</a>
              </div>
            </nav>
          `;
        }
      }
    }
    
    // 4. Inyectar en el Shadow DOM ambos navbars y agregar estilos y scripts para el comportamiento
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="/_assets/_css/global.css">
      
      ${globalNavbarHTML}
      ${secondaryNavbarHTML}
      
      <style>
        .navbar {
          background-color: var(--fondo-oscuro);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .navbar .nav-link {
          color: white;
          font-weight: 600;
          transition: color 0.3s ease;
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
        .global-navbar {
          z-index: 1050;
        }
        .secondary-navbar {
          top: 56px; /* Ajustar según la altura del global-navbar */
          z-index: 1040;
        }
        :host-context(body) {
          padding-top: 112px; /* Suma aproximada de las alturas de ambos navbars */
        }
      </style>
    `;
    
    this.initDropdowns();
  }
  
  initDropdowns() {
    // Inicializar el comportamiento de los dropdowns (para ambos navbars)
    const dropdowns = this.shadowRoot.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', e => {
        e.preventDefault();
        const menu = dropdown.nextElementSibling;
        if (menu) {
          menu.classList.toggle("show");
        }
      });
    });
    
    // Toggler del navbar global
    const globalToggle = this.shadowRoot.querySelector("#global-toggle-button");
    const globalNav = this.shadowRoot.querySelector("#globalNavbarNav");
    if (globalToggle && globalNav) {
      globalToggle.addEventListener("click", () => {
        globalNav.classList.toggle("show");
      });
    }
    
    // Toggler del navbar secundario (si existe)
    const secondaryToggle = this.shadowRoot.querySelector("#secondary-toggle-button");
    const secondaryNav = this.shadowRoot.querySelector("#secondaryNavbarNav");
    if (secondaryToggle && secondaryNav) {
      secondaryToggle.addEventListener("click", () => {
        secondaryNav.classList.toggle("show");
      });
    }
  }
}

customElements.define("custom-navbar", CustomNavbar);
