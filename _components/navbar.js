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
              <img src="/_assets/_img/logos/PB.svg" alt="Logo" width="180">
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
      console.error("Error en CustomNavbar:", error);
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
        "Seminarios": "Seminarios",
        "Presencial": "Presencial",
        "Virtual": "Virtual",
        "Comunidad": "Comunidad",
        "Aprendizaje": "Aprendizaje",
        "Música": "Música",
        "Inteligencia": "Inteligencia",
        "Misión": "Misión",
        "Auspiciantes": "Auspiciantes",
        "Contacto": "Contacto",
        "Redes Sociales": "Redes Sociales",
        "Conducta": "Código de Conducta",
        "Idioma": "Idioma",
      },
      en: {
        "Eventos": "Events",
        "Seminarios": "Seminars",
        "Seminarios Virtuales": "Virtual Seminars",
        "Presencial": "In Person",
        "Virtual": "Virtual",
        "Musica": "Music",
        "Comunidad": "Community",
        "Aprendizaje": "Learning",
        "Música": "Music",
        "Inteligencia": "Intelligence",
        "Misión": "Mission",
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
        if (key === "Idioma") continue; // Ya manejamos el selector de idioma aparte
        const value = navItems[key];

        if (typeof value === "string") {
            html += `<li class="nav-item"><a class="nav-link" href="${this.replaceIdioma(value, lang)}">${translations[key] || key}</a></li>`;
        } else if (typeof value === "object") {
            // Caso especial para "Eventos" que debe agrupar "Presencial" y "Galería"
            if (key === "Eventos") {
                html += this.buildEventsDropdown(key, value, lang, translations);
            } else {
                html += this.buildDropdown(key, value, lang, translations);
            }
        }
    }
    return html;
}
buildEventsDropdown(title, items, lang, translations) {
  let html = `<li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="${title.replace(/\s/g, '')}Dropdown" role="button" data-bs-toggle="dropdown">
                  ${translations[title] || title}
                </a>
                <ul class="dropdown-menu">`;

  for (const category in items) {
      html += `<li class="dropdown-subtitle">${translations[category] || category}</li>`;

      const subItems = items[category];
      // Ordenar años en orden descendente
      const sortedYears = Object.keys(subItems).sort((a, b) => b.localeCompare(a));

      for (const year of sortedYears) {
          const link = this.replaceIdioma(subItems[year], lang);
          html += `<li><a class="dropdown-item" href="${link}">${year}</a></li>`;
      }

      html += `<li><hr class="dropdown-divider"></li>`;
  }

  html += `</ul></li>`;
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
        console.warn(`replaceIdioma recibió un objeto en lugar de una URL string. Verifica navbar.json`, url);
        return "#";
    }

    // Reemplazar {idioma} en las URLs por el valor real de lang
    return url.replace("{idioma}", lang);
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
    const globalNav = this.shadowRoot.querySelector("#globalNavbarNav");
    const globalToggle = this.shadowRoot.querySelector("#global-toggle-button");
  
    if (!globalToggle || !globalNav) return; // 🚨 Evitar errores si no existen los elementos
  
    // 1️⃣ FORZAMOS evento de click en el botón hamburguesa
    globalToggle.addEventListener("click", (event) => {
      event.preventDefault();
      
      // ⬇️ Abrir o cerrar el menú
      const isExpanded = globalNav.classList.contains("show");
      if (isExpanded) {
        globalNav.classList.remove("show");
        globalNav.style.display = "none"; // 🔥 FORZAMOS QUE SE OCULTE
      } else {
        globalNav.classList.add("show");
        globalNav.style.display = "flex"; // 🔥 FORZAMOS QUE SE MUESTRE
      }
  
      // ⬇️ Actualizar el estado del botón
      globalToggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    });
  
    const navLinks = this.shadowRoot.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    const isDropdownToggle = link.classList.contains("dropdown-toggle");

    // Si es dropdown, prevenir que se cierre y alternar la visibilidad del submenú
    if (isDropdownToggle) {
      event.preventDefault();

      const dropdownMenu = link.nextElementSibling;
      if (dropdownMenu && dropdownMenu.classList.contains("dropdown-menu")) {
        dropdownMenu.classList.toggle("show");
      }
    } else {
      // Si es link normal, cerrar el menú
      globalNav.classList.remove("show");
      globalNav.style.display = "none";
      globalToggle.setAttribute("aria-expanded", "false");
    }
  });
});

  
    document.addEventListener("click", (event) => {
      // Obtenemos el recorrido completo del evento
      const path = event.composedPath();
      // Verificamos si el host (this) está en el recorrido
      if (!path.includes(this) && globalNav.classList.contains("show")) {
        globalNav.classList.remove("show");
        globalNav.style.display = "none"; // 🔥 OCULTAR EL MENÚ
        globalToggle.setAttribute("aria-expanded", "false");
      }
    });
    
  }
  

}

customElements.define("custom-navbar", CustomNavbar);
