class SecondaryNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      // Cargar el JSON secundario
      const response = await fetch('/_data/secundario.json');
      const data = await response.json();

      // Leer atributos: tipo de evento, clave del evento y idioma
      const eventType = this.getAttribute('data-event-type') || "";
      const eventKey = this.getAttribute('data-event-key') || "";
      const lang = this.getAttribute('data-lang') || this.detectLanguage();
      const translations = this.getTranslations(lang);

      // Filtrar la información del JSON según el tipo y clave del evento.
      // Suponemos que la estructura del JSON es algo así:
      // {
      //   "Evento": {
      //     "Presencial": {
      //       "Evento 2025": { ... },
      //       "Evento 2023": { ... }
      //     },
      //     "Virtual": {
      //       "Evento Virtual": "..."
      //     }
      //   }
      // }
      let navItemsHTML = "";
      if (
        data["Evento"] &&
        data["Evento"][eventType] &&
        data["Evento"][eventType][eventKey]
      ) {
        const eventData = data["Evento"][eventType][eventKey];

        // Recorremos el objeto eventData para construir los enlaces o dropdowns
        for (const item in eventData) {
          const value = eventData[item];
          if (typeof value === 'string') {
            navItemsHTML += `
              <li class="secondary-nav-item">
                <a class="secondary-nav-link" href="${this.replaceIdioma(value, lang)}">
                  ${translations[item] || item}
                </a>
              </li>`;
          } else if (typeof value === 'object') {
            // Caso dropdown
            navItemsHTML += `
              <li class="secondary-nav-item dropdown">
                <a href="#" class="secondary-nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  ${translations[item] || item}
                </a>
                <ul class="dropdown-menu">`;
            for (const subItem in value) {
              navItemsHTML += `
                <li>
                  <a class="dropdown-item" href="${this.replaceIdioma(value[subItem], lang)}">
                    ${translations[subItem] || subItem}
                  </a>
                </li>`;
            }
            navItemsHTML += `</ul></li>`;
          }
        }
      }

      // Construir el HTML del secondary navbar
      const html = `
        <nav class="secondary-navbar">
          <div class="container">
            <ul class="secondary-nav">
              ${navItemsHTML}
            </ul>
          </div>
        </nav>
      `;

      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/_assets/_css/secondary-navbar.css">
        ${html}
      `;
    } catch (error) {
      console.error("❌ Error en SecondaryNavbar:", error);
    }
  }

  detectLanguage() {
    const pathParts = window.location.pathname.split('/');
    return pathParts.includes('en') ? 'en' : 'es';
  }

  getTranslations(lang) {
    return {
      es: {
        "Organización del evento": "Organización del evento",
        "Cronograma": "Cronograma",
        "Disertantes": "Disertantes",
        "Materiales (Biiblliografia)": "Materiales (Bibliografía)",
        "workshops": "Workshops",
        "Galeria": "Galería",
        "Evento Virtual": "Evento Virtual"
      },
      en: {
        "Organización del evento": "Event Organization",
        "Cronograma": "Schedule",
        "Disertantes": "Speakers",
        "Materiales (Biiblliografia)": "Materials (Bibliography)",
        "workshops": "Workshops",
        "Galeria": "Gallery",
        "Evento Virtual": "Virtual Event"
      }
    }[lang];
  }

  replaceIdioma(url, lang) {
    if (typeof url !== "string") {
      console.warn("⚠️ replaceIdioma recibió un valor no string:", url);
      return "#";
    }
    return url.replace("{idioma}", lang);
  }
}

customElements.define("secondary-navbar", SecondaryNavbar);
