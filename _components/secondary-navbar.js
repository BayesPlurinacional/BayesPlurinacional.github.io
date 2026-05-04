class SecondaryNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch("/_data/secundario.json");
      if (!response.ok) throw new Error("No se pudo cargar secundario.json");
      const data = await response.json();

      const lang = this.detectLanguage();
      const section = this.getAttribute("data-section");

      if (section === "metodos") {
        this.renderNav(data?.["Métodos"] || {}, lang);
      } else {
        this.renderEventNav(data, lang);
      }
    } catch (error) {
      console.error("Error en SecondaryNavbar:", error);
    }
  }

  renderNav(items, lang) {
    const translations = this.getTranslations(lang);
    const navItemsHTML = Object.entries(items).map(([label, url]) => `
      <li class="secondary-nav-item">
        <a class="secondary-nav-link" href="${this.replaceIdioma(url, lang)}">
          ${translations[label] || label}
        </a>
      </li>
    `).join("");

    if (!navItemsHTML) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/_assets/_css/secondary-navbar.css">
      <nav class="secondary-navbar">
        <div class="container">
          <ul class="secondary-nav">
            ${navItemsHTML}
          </ul>
        </div>
      </nav>
    `;

    this.initClickListeners();
  }

  renderEventNav(data, lang) {
    const eventType = this.getAttribute("data-event-type") || "Presencial";
    const eventKey = this.getAttribute("data-event-key") || "";

    const eventData = data?.Evento?.[eventType]?.[eventKey] || {};
    const filteredSections = Object.keys(eventData).filter(section => section !== "Ciudad");

    if (filteredSections.length === 0) {
      console.warn("🔸 No hay secciones para mostrar en el navbar secundario.");
      return;
    }

    const translations = this.getTranslations(lang);
    const navItemsHTML = filteredSections.map(section => `
      <li class="secondary-nav-item">
        <a class="secondary-nav-link" href="${this.replaceIdioma(eventData[section], lang)}">
          ${translations[section] || section}
        </a>
      </li>
    `).join("");

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/_assets/_css/secondary-navbar.css">
      <nav class="secondary-navbar">
        <div class="container">
          <ul class="secondary-nav">
            ${navItemsHTML}
          </ul>
        </div>
      </nav>
    `;

    this.initClickListeners();
  }

  detectLanguage() {
    return window.location.pathname.includes("/en/") ? "en" : "es";
  }

  getTranslations(lang) {
    return {
      es: {
        "Inicio": "Inicio",
        "Capacitación": "Capacitación",
        "Certificación": "Certificación",
        "Introducción": "Introducción",
        "Organización": "Organización",
        "Disertantes": "Disertantes",
        "Cronograma": "Cronograma",
      },
      en: {
        "Inicio": "Home",
        "Capacitación": "Training",
        "Certificación": "Certification",
        "Introducción": "Introduction",
        "Organización": "Organization",
        "Disertantes": "Speakers",
        "Cronograma": "Schedule",
      }
    }[lang];
  }

  replaceIdioma(url, lang) {
    return typeof url === "string" ? url.replace("{idioma}", lang) : "#";
  }

  initClickListeners() {
    this.shadowRoot.querySelector(".secondary-navbar").addEventListener("click", (event) => {
      const target = event.target.closest("a");
      if (target && target.href) {
        window.location.href = target.href;
      }
    });
  }
}

customElements.define("secondary-navbar", SecondaryNavbar);
