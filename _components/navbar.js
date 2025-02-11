class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  async connectedCallback() {
    try {
      // 1. Cargar el JSON del navbar global
      const globalResponse = await fetch('/_data/navbar.json');
      const globalData = await globalResponse.json();
      
      // Determinar el idioma: si no se define mediante el atributo, se deduce de la URL
      let lang = this.getAttribute('data-lang');
      if (!lang) {
        if (window.location.pathname.includes("/en/")) {
          lang = "en";
        } else {
          lang = globalData.config.idioma.default;
        }
      }
      
      const translations = {
        es: {
          "Eventos": "Eventos",
          "Seminarios Virtuales" : "Virtual Seminars",
          "Presencial": "Presencial",
          "Virtual": "Virtual",
          "Musica": "Musica",
          "Comunidad": "Comunidad",
          "Auspiciantes": "Sponsors",
          "Contacto": "Contacto",
          "Redes Sociales": "Redes Sociales",
          "Conducta": "Conducta",
          "Idioma": "Idioma"
        },
        en: {
          "Eventos": "Events",
          "Virtual Seminars": "Seminarios Virtuales",
          "Presencial": "In Person",
          "Virtual": "Virtual",
          "Musica": "Music",
          "Comunidad": "Community",
          "Sponsors": "Auspiciantes",
          "Contacto": "Contact",
          "Redes Sociales": "Social Networks",
          "Conducta": "Code of Conduct",
          "Idioma": "Language"
        }
      };
      
      const t = key => (translations[lang] && translations[lang][key]) || key;
      const replaceIdioma = ruta => ruta.replace(/{idioma}/gi, lang);
      
      function buildDropdown(obj) {
        let html = '';
        for (const key in obj) {
          if (typeof obj[key] === 'string') {
            html += `<li><a class="dropdown-item" href="${replaceIdioma(obj[key])}">${t(key)}</a></li>`;
          } else if (typeof obj[key] === 'object') {
            html += `<li class="dropdown-header">${t(key)}</li>`;
            for (const subKey in obj[key]) {
              html += `<li><a class="dropdown-item" href="${replaceIdioma(obj[key][subKey])}">${t(subKey)}</a></li>`;
            }
          }
        }
        return html;
      }
      
      let navItemsHTML = "";
      const globalItems = globalData.navbar.global;
      for (const key in globalItems) {
        if (key === "Idioma") continue;
        const value = globalItems[key];
        if (typeof value === "string") {
          navItemsHTML += `<li class="nav-item"><a class="nav-link" href="${replaceIdioma(value)}">${t(key)}</a></li>`;
        } else if (typeof value === "object") {
          const dropdownMenu = buildDropdown(value);
          navItemsHTML += `
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="${key.replace(/\s/g, '')}Dropdown">${t(key)}</a>
              <ul class="dropdown-menu">
                ${dropdownMenu}
              </ul>
            </li>
          `;
        }
      }
      
      // Selector de idioma: botón que redirige a la misma página en el otro idioma.
      const idiomaLink = this.getAlternateLanguageLink(lang);
      const idiomaHTML = `
      <li class="nav-item">
        <div class="language-selector">
          <div class="language-switch ${lang === 'es' ? 'es-active' : 'en-active'}">
        <a href="${this.getAlternateLanguageLink('en')}" class="lang-btn">
          <span>ES</span>
        </a>
        <span class="divider">|</span>
        <a href="${this.getAlternateLanguageLink('es')}" class="lang-btn">
          <span>EN</span>
        </a>
          </div>
        </div>
      </li>`;
      
      const globalNavbarHTML = `
        <nav class="navbar navbar-expand-lg global-navbar" style="margin-top: 70px;">
          <div class="container">
            <a class="navbar-brand" href="/">
              <img src="/_assets/_img/logos/PB.svg" alt="Logo" width="120">
            </a>
            <button class="navbar-toggler" type="button" id="global-toggle-button">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="globalNavbarNav">
              <ul class="navbar-nav ms-auto">
                ${navItemsHTML}
                ${idiomaHTML}
              </ul>
            </div>
          </div>
        </nav>
      `;
      
      let secondaryNavbarHTML = "";
      const eventType = this.getAttribute('data-event-type');
      const eventKey = this.getAttribute('data-event-key');
      
      if (eventType === "Presencial" && eventKey) {
        const secondaryResponse = await fetch('/_data/secundario.json');
        const secondaryData = await secondaryResponse.json();
        if (
          secondaryData.Evento &&
          secondaryData.Evento[eventType] &&
          secondaryData.Evento[eventType][eventKey]
        ) {
          const eventItems = secondaryData.Evento[eventType][eventKey];
          let secNavHTML = "";
          for (const key in eventItems) {
            const value = eventItems[key];
            if (typeof value === "string") {
              secNavHTML += `<li class="nav-item"><a class="nav-link" href="${replaceIdioma(value)}">${key}</a></li>`;
            } else if (typeof value === "object") {
              let nestedHTML = "";
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
            <nav class="navbar navbar-expand-lg  secondary-navbar" style="margin-top: 70px;">
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
        }
      }
      
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="/_assets/_css/global.css">
        
        ${globalNavbarHTML}
        ${secondaryNavbarHTML}
        
        <style>
          /* === Navbar Global === */
    .global-navbar {
        background-color: var(--fondo-oscuro);
        height: 85px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .global-navbar .navbar-brand img {
        width: 150px;
        height: auto;
    }

    .center-nav {
        flex-grow: 1;
        text-align: center;
    }

    .center-nav .navbar-nav {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    /* === Estilo del Selector de Idioma === */
    .language-switch {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: white;
        padding: 5px 10px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
    }

    .language-switch .lang-btn {
        text-decoration: none;
        color: black;
        opacity: 0.5;
    }

    .es-active .lang-btn:first-child,
    .en-active .lang-btn:last-child {
        opacity: 1;
        font-weight: bold;
    }

    .language-switch .divider {
        color: black;
    }

    /* === Navbar Secundario === */
    .secondary-navbar {
        background-color: var(--fondo-oscuro);
        text-align: center;
        margin-top: 0;
        padding: 10px 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1000;
    }

    .event-year {
        font-size: 1.2em;
        font-weight: bold;
        color: white;
        margin-right: 15px;
    }

    .navbar-nav .dropdown:hover .dropdown-menu {
        display: block;
    }

    .dropdown-menu {
        transition: all 0.3s ease-in-out;
        display: none;
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

    .dropdown:hover > .dropdown-menu {
        display: block;
    }

        </style>
      `;
      
      this.initDropdowns();
    } catch (error) {
      console.error("Error en CustomNavbar connectedCallback:", error);
    }
  }
  
  getAlternateLanguageLink(currentLang) {
    const currentPath = window.location.pathname;
    let alternateLang = currentLang === "es" ? "en" : "es";
    if (currentPath.includes("/es/")) {
      return currentPath.replace("/es/", `/${alternateLang}/`);
    } else if (currentPath.includes("/en/")) {
      return currentPath.replace("/en/", `/${alternateLang}/`);
    } else {
      return `/_pages/${alternateLang}${currentPath}`;
    }
  }
  
  initDropdowns() {
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
    
    const globalToggle = this.shadowRoot.querySelector("#global-toggle-button");
    const globalNav = this.shadowRoot.querySelector("#globalNavbarNav");
    if (globalToggle && globalNav) {
      globalToggle.addEventListener("click", () => {
        globalNav.classList.toggle("show");
      });
    }
    
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
