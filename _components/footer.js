class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  async connectedCallback() {
    try {
      // Determinar el idioma basado en la URL o atributo data-lang
      let lang = this.getAttribute('data-lang');
      if (!lang) {
        lang = window.location.pathname.includes("/en/") ? "en" : "es";
      }

      // Cargar el JSON del footer
      const response = await fetch('/_data/footer.json');
      const data = await response.json();
      const footerData = data.footer;

      // Extraer las secciones
      const sobreNosotros = footerData["Sobre Nosotros"][lang];
      const congreso = footerData["Congreso"][lang];
      const galeria = footerData["Galería"][lang];
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
        "LinkedIn": "fab fa-linkedin",
        "Email": "fas fa-envelope"
      };

      const buildSocialIcons = linksObj => {
        return Object.entries(linksObj)
          .map(([name, url]) => `
            <a href="${url}" target="_blank" class="social-icon">
              <i class="${socialIcons[name] || 'fas fa-link'}"></i>
            </a>
          `)
          .join('');
      };

      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <link rel="stylesheet" href="/_assets/_css/global.css">
        
        <footer class="footer mt-5">
          <div class="container">
            <div class="row">
              <!-- Sección Sobre Nosotros -->
              <div class="col-lg-3 col-md-6 mb-3">
                <h5>${sobreNosotros["Título"]}</h5>
                <ul class="list-unstyled">
                  ${buildLinks(sobreNosotros["Enlaces"])}
                </ul>
              </div>

              <!-- Sección Congreso -->
              <div class="col-lg-3 col-md-6 mb-3">
                <h5>${congreso["Título"]}</h5>
                <ul class="list-unstyled">
                  ${buildLinks(congreso["Enlaces"])}
                </ul>
              </div>

              <!-- Sección Galería -->
              <div class="col-lg-3 col-md-6 mb-3">
                <h5>${galeria["Título"]}</h5>
                <ul class="list-unstyled">
                  ${buildLinks(galeria["Enlaces"])}
                </ul>
              </div>

              <!-- Sección Redes Sociales -->
              <div class="col-lg-3 col-md-6 mb-3 text-center">
                <h5>${redesSociales["Título"]}</h5>
                <div class="social-icons">
                  ${buildSocialIcons(redesSociales["Enlaces"])}
                </div>
              </div>
            </div>
          </div>
          <p class="footer-bottom text-center py-3 mb-0">${copy}</p>
        </footer>
        
        <style>
          .footer {
            background-color: #1a1a1a;
            color: #fff;
            padding: 40px 0;
          }

          .footer a {
            color: #fff;
            text-decoration: none;
            transition: color 0.3s ease-in-out;
          }

          .footer a:hover {
            text-decoration: underline;
            color: #f8c291;
          }

          .footer h5 {
            margin-bottom: 1rem;
            font-weight: bold;
          }

          .footer ul {
            padding-left: 0;
          }

          .footer ul li {
            list-style: none;
            margin-bottom: 8px;
          }

          .footer-bottom {
            background-color: #111;
            font-size: 0.9rem;
            padding: 10px 0;
          }

          /* Redes Sociales */
          .social-icons {
            display: flex;
            justify-content: center;
            gap: 15px;
          }

          .social-icons a {
            font-size: 24px;
            color: white;
            transition: transform 0.3s ease-in-out;
          }

          .social-icons a:hover {
            transform: scale(1.2);
            color: #f8c291;
          }
        </style>
      `;
    } catch (error) {
      console.error("Error al cargar footer.json:", error);
    }
  }
}

customElements.define("custom-footer", CustomFooter);
