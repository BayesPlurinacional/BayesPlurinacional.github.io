class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      // Cargar el JSON del navbar global
      const globalResponse = await fetch('/_data/navbar.json');
      const globalData = await globalResponse.json();

      // Determinar el idioma desde la URL o el atributo
      let lang = this.getAttribute('data-lang') || this.detectLanguage(globalData);

      // Traducciones
      const translations = this.getTranslations(lang);

      // Generar HTML del navbar
      const navItemsHTML = this.generateNavItems(globalData.navbar.global, lang, translations);
      const idiomaHTML = this.generateLanguageSelector(lang);

      // Estructura del navbar principal
      const globalNavbarHTML = `
        <nav class="navbar navbar-expand-lg global-navbar">
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

      // Estructura del navbar secundario (opcional)
      let secondaryNavbarHTML = this.generateSecondaryNavbar();

      // Insertar en el shadow DOM
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="/_assets/_css/navbar.css">
        
        ${globalNavbarHTML}
        ${secondaryNavbarHTML}
      `;

      // Inicializar interacciones
      this.initDropdowns();
    } catch (error) {
      console.error("Error en CustomNavbar connectedCallback:", error);
    }
  }

  detectLanguage(globalData) {
    if (window.location.pathname.includes("/en/")) {
      return "en";
    } else {
      return globalData.config.idioma.default || "es";
    }
  }

  getTranslations(lang) {
    return {
      es: {
      "Eventos": "Eventos",
      "Seminarios Virtuales": "Seminarios Virtuales", 
      "Presencial": "Presencial",
      "Virtual": "Virtual",
      "Musica": "Música",
      "Comunidad": "Comunidad", 
      "Auspiciantes": "Auspiciantes",
      "Contacto": "Contacto",
      "Redes Sociales": "Redes Sociales",
      "Conducta": "Código de Conducta",
      "Idioma": "Idioma"
      },
      en: {
      "Eventos": "Events",
      "Seminarios Virtuales": "Virtual Seminars",
      "Presencial": "In Person",
      "Virtual": "Virtual", 
      "Musica": "Music",
      "Comunidad": "Community",
      "Auspiciantes": "Sponsors",
      "Contacto": "Contact",
      "Redes Sociales": "Social Networks", 
      "Conducta": "Code of Conduct",
      "Idioma": "Language"
      }
    }[lang];
  }

  generateNavItems(navItems, lang, translations) {
    let html = "";
    for (const key in navItems) {
      if (key === "Idioma") continue;
      const value = navItems[key];
  
      if (typeof value === "string") {
        html += `<li class="nav-item"><a class="nav-link" href="${this.replaceIdioma(value, lang)}">${translations[key] || key}</a></li>`;
      } else if (typeof value === "object") {
        html += this.buildDropdown(key, value, lang, translations);  // Aquí es donde debe llamarse correctamente
      }
    }
    return html;
  }
  

buildDropdown(title, items, lang, translations) {
  let html = `<li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="${title.replace(/\s/g, '')}Dropdown">${translations[title] || title}</a>
                <ul class="dropdown-menu">`;
  
  for (const subKey in items) {
    html += `<li><a class="dropdown-item" href="${this.replaceIdioma(items[subKey], lang)}">${translations[subKey] || subKey}</a></li>`;
  }
  
  html += `</ul></li>`;
  return html;
}



  generateLanguageSelector(lang) {
    return `
      <li class="nav-item">
        <div class="language-selector">
          <div class="language-switch ${lang === 'es' ? 'es-active' : 'en-active'}">
            <a href="${this.getAlternateLanguageLink('en')}" class="lang-btn"><span>ES</span></a>
            <span class="divider">|</span>
            <a href="${this.getAlternateLanguageLink('es')}" class="lang-btn"><span>EN</span></a>
          </div>
        </div>
      </li>
    `;
  }

  generateSecondaryNavbar() {
    const eventType = this.getAttribute('data-event-type');
    const eventKey = this.getAttribute('data-event-key');

    if (eventType === "Presencial" && eventKey) {
      return `
        <nav class="navbar navbar-expand-lg secondary-navbar">
          <div class="container">
            <button class="navbar-toggler" type="button" id="secondary-toggle-button">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="secondaryNavbarNav">
              <ul class="navbar-nav ms-auto">
                <!-- Aquí se llenarán los elementos específicos del navbar secundario -->
              </ul>
            </div>
          </div>
        </nav>
      `;
    }
    return "";
  }

  getAlternateLanguageLink(targetLang) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/es/")) {
      return currentPath.replace("/es/", `/${targetLang}/`);
    } else if (currentPath.includes("/en/")) {
      return currentPath.replace("/en/", `/${targetLang}/`);
    } else {
      return `/_pages/${targetLang}${currentPath}`;
    }
  }

  replaceIdioma(url, lang) {
    if (typeof url !== "string") {
        console.warn(`⚠️ replaceIdioma recibió un objeto en lugar de una URL string. Verifica navbar.json`, url);
        return "#"; // Devuelve un enlace vacío en caso de error
    }
    return url.replace(/{idioma}/gi, lang);
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
