class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  async connectedCallback() {
    try {
      let lang = this.getAttribute('data-lang') || (window.location.pathname.includes("/en/") ? "en" : "es");

      const response = await fetch('/_data/footer.json');
      const data = await response.json();
      const footerData = data.footer;

      // Secciones del JSON
      const sobreNosotros = footerData["Sobre Nosotros"][lang];
      const ultimosEventos = footerData["Últimos Eventos"][lang];
      const contacto = footerData["Contacto"][lang];
      const redesSociales = footerData["Redes Sociales"][lang];
      const copy = footerData["Copy"][lang];

      // Función para construir enlaces de texto
      const buildLinks = linksObj => {
        return Object.entries(linksObj)
          .map(([text, url]) => `<li><a href="${url}">${text}</a></li>`)
          .join('');
      };

      // Función para redes sociales con iconos dinámicos
      const socialIcons = {
        "Twitter": "fab fa-twitter",
        "Instagram": "fab fa-instagram",
        "Linkedin": "fab fa-linkedin",
        "YouTube": "fab fa-youtube"
      };

      const buildSocialIcons = linksObj => {
        return Object.entries(linksObj)
          .map(([name, url]) => `
            <a href="${url}" target="_blank" class="social-icon" title="${name}">
              <i class="${socialIcons[name] || 'fas fa-link'}"></i>
            </a>
          `)
          .join('');
      };

  

      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <link rel="stylesheet" href="/_assets/_css/footer.css">
        
        <footer class="footer">
          <div class="container">
            <div class="footer-section">
              <h5>${sobreNosotros["Título"]}</h5>
              <ul>${buildLinks(sobreNosotros["Enlaces"])}</ul>
            </div>

            <div class="footer-section">
              <h5>${ultimosEventos["Título"]}</h5>
              <ul>${buildLinks(ultimosEventos["Enlaces"])}</ul>
            </div>

            <div class="footer-section">
              <h5>${contacto["Título"]}</h5>
              <ul>${buildLinks(contacto["Enlaces"])}</ul>
            </div>

            <div class="footer-section text-center">
              <h5>${redesSociales["Título"]}</h5>
              <div class="social-icons">${buildSocialIcons(redesSociales["Enlaces"])}</div>
            </div>
          </div>

          <p class="footer-bottom">${copy}</p>
        </footer>
      `;
    } catch (error) {
      console.error("Error al cargar el footer:", error);
    }
  }
}

customElements.define("custom-footer", CustomFooter);
