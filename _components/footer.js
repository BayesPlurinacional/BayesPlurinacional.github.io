class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      // Se asume que el JSON de eventos está en /_data/eventos.json
      const response = await fetch('/_data/eventos.json');
      const data = await response.json();
      const eventos = data.Eventos.Presencial;
      let eventosFooter = "";
      Object.keys(eventos).forEach((año) => {
        // Verificamos que exista el enlace en "Sobre el evento"
        if (
          eventos[año]["Sobre el evento"] &&
          eventos[año]["Sobre el evento"]["Evento " + año]
        ) {
          eventosFooter += `
            <li><a href="${eventos[año]["Sobre el evento"]["Evento " + año]}">Fotos ${año}</a></li>
          `;
        }
      });

      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <link rel="stylesheet" href="/_assets/_css/global.css">

        <footer class="footer mt-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-3">
                <h5>Sobre Nosotros</h5>
                <ul class="list-unstyled">
                  <li><a href="/_pages/es/quienes_somos.html">Quiénes Somos</a></li>
                  <li><a href="/_pages/es/comunidad.html">Comunidad</a></li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 mb-3">
                <h5>Congreso</h5>
                <ul class="list-unstyled">
                  ${eventosFooter}
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 mb-3">
                <h5>Redes</h5>
                <ul class="list-unstyled">
                  <li><a href="mailto:bayesplurinacional@gmail.com">Correo Electrónico</a></li>
                  <li><a href="https://discord.gg/2dsAjBBFG3" target="_blank">Discord</a></li>
                  <li><a href="https://twitter.com/BayesPlurinacio" target="_blank">Twitter</a></li>
                  <li><a href="https://www.linkedin.com/company/bayes-plurinacional/" target="_blank">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <p class="footer-bottom text-center py-3 mb-0">© 2025 Bayes Plurinacional. Todos los derechos reservados.</p>
        </footer>

        <style>
          .footer {
            background-color: #1a1a1a;
            color: #fff;
          }
          .footer a {
            color: #fff;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .footer h5 {
            margin-bottom: 1rem;
          }
          .footer-bottom {
            background-color: #111;
            font-size: 0.9rem;
          }
        </style>
      `;
    } catch (error) {
      console.error("Error cargando eventos para el footer:", error);
      // En caso de error, mostramos un footer básico
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <footer class="footer mt-5">
          <div class="container text-center py-3">
            <p>© 2025 Bayes Plurinacional. Todos los derechos reservados.</p>
          </div>
        </footer>
      `;
    }
  }
}

customElements.define("custom-footer", CustomFooter);
