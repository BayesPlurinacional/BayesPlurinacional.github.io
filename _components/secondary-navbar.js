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

      // Detectar idioma y evento desde la URL
      const lang = this.detectLanguage();
      const eventKey = "Evento 2025"; // Nos enfocamos en 2025
      const eventType = "Presencial";

      // Obtener las secciones del evento
      const eventData = data?.Evento?.[eventType]?.[eventKey] || {};
      
      // Excluir "Ciudad"
      const filteredSections = Object.keys(eventData).filter(section => section !== "Ciudad");

      if (filteredSections.length === 0) {
        console.warn("🔸 No hay secciones para mostrar en el navbar secundario.");
        return;
      }

      // Generar HTML del navbar secundario
      const navItemsHTML = filteredSections.map(section => `
        <li class="secondary-nav-item">
          <a class="secondary-nav-link" href="${this.replaceIdioma(eventData[section], lang)}">
            ${this.getTranslations(lang)[section] || section}
          </a>
        </li>
      `).join("");

      // Insertar HTML en el shadow DOM
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

      // Agregar eventos de clic
      this.initClickListeners();
    } catch (error) {
      console.error("Error en SecondaryNavbar:", error);
    }
  }

  detectLanguage() {
    return window.location.pathname.includes("/en/") ? "en" : "es";
  }

  getTranslations(lang) {
    return {
      es: {
        "Inicio": "Inicio",
        "Organización": "Organización",
        "Disertantes": "Disertantes",
        "Cronograma": "Cronograma",
      },
      en: {
        "Inicio" : "Home",
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
