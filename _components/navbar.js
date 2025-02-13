class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const globalResponse = await fetch('/_data/navbar.json');
      const globalData = await globalResponse.json();

      // Detectar idioma según la ruta
      let lang = this.getAttribute('data-lang') || this.detectLanguage();

      // Obtener las traducciones correctas
      const translations = this.getTranslations(lang);

      // Generar el HTML del navbar con los enlaces correctos
      const navItemsHTML = this.generateNavItems(globalData.navbar.global, lang, translations);
      const idiomaHTML = this.generateLanguageSelector(lang);

      // Estructura HTML del navbar
      const globalNavbarHTML = `
        <nav class="navbar navbar-expand-lg global-navbar fixed-top">
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

      // Insertar en el Shadow DOM
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="/_assets/_css/navbar.css">
        ${globalNavbarHTML}
      `;

      // Inicializar eventos
      this.initDropdowns();
      this.initLanguageSwitch();
    } catch (error) {
      console.error("❌ Error en CustomNavbar:", error);
    }
  }

  detectLanguage() {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.includes('en')) {
      return 'en';
    } else if (pathParts.includes('es')) {
      return 'es';
    }
    return "es"; // Idioma por defecto
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
      if (key === "Idioma") continue; // No generamos esto aquí, ya hay un selector de idioma
      const value = navItems[key];

      if (typeof value === "string") {
        html += `<li class="nav-item"><a class="nav-link" href="${this.replaceIdioma(value, lang)}">${translations[key] || key}</a></li>`;
      } else if (typeof value === "object") {
        html += this.buildDropdown(key, value, lang, translations);
      }
    }
    return html;
  }

  buildDropdown(title, items, lang, translations) {
    let html = `<li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="${title.replace(/\s/g, '')}Dropdown" role="button" data-bs-toggle="dropdown">
                    ${translations[title] || title}
                  </a>
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
            <a href="#" class="lang-btn" data-lang="en"><span>EN</span></a>
            <span class="divider">|</span>
            <a href="#" class="lang-btn" data-lang="es"><span>ES</span></a>
          </div>
        </div>
      </li>
    `;
  }

  replaceIdioma(url, lang) {
    if (typeof url !== "string") {
      console.warn(`⚠️ replaceIdioma recibió un objeto en lugar de una URL string. Verifica navbar.json`, url);
      return "#";
    }

    // Si la URL ya tiene "/es/" o "/en/" en el medio, la cambia sin tocar el inicio
    return url.replace(/\/(es|en)\//, `/${lang}/`);
  }

  getAlternateLanguageLink(targetLang) {
    let currentPath = window.location.pathname.split('/');

    // Buscar si ya hay un "es" o "en" en la estructura
    const langIndex = currentPath.indexOf('es') !== -1 ? currentPath.indexOf('es') : currentPath.indexOf('en');
    if (langIndex !== -1) {
      currentPath[langIndex] = targetLang; // Reemplazar el idioma en su posición actual
    }

    return currentPath.join('/');
  }

  initLanguageSwitch() {
    const langButtons = this.shadowRoot.querySelectorAll(".lang-btn");
    langButtons.forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        const targetLang = button.getAttribute("data-lang");
        const newUrl = this.getAlternateLanguageLink(targetLang);
        window.location.href = newUrl;
      });
    });
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
  }
}

customElements.define("custom-navbar", CustomNavbar);
