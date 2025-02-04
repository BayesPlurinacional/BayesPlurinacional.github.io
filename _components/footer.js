class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const response = await fetch('/_data/eventos.json');
    const data = await response.json();

    const eventos = data.Eventos.Presencial;
    let eventosFooter = "";
    Object.keys(eventos).forEach((año) => {
      eventosFooter += `
        <li><a href="${eventos[año]["Sobre el evento"]["Evento " + año]}">Fotos ${año}</a></li>
      `;
    });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
      <link rel="stylesheet" href="/_assets/_css/global.css">

      <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <h5>Sobre Nosotros</h5>
                    <ul>
                        <li><a href="/_pages/es/quienes_somos.html">Quiénes Somos</a></li>
                        <li><a href="/_pages/es/Comunidad.html">Comunidad</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Congreso</h5>
                    <ul>
                        ${eventosFooter}
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Redes</h5>
                    <ul>
                        <li><a href="mailto:bayesplurinacional@gmail.com">Correo Electrónico</a></li>
                        <li><a href="https://discord.gg/2dsAjBBFG3">Discord</a></li>
                        <li><a href="https://twitter.com/BayesPlurinacio">Twitter</a></li>
                        <li><a href="https://www.linkedin.com/company/bayes-plurinacional/">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <p class="footer-bottom">© 2025 Bayes Plurinacional. Todos los derechos reservados.</p>
      </footer>
    `;
  }
}

customElements.define("custom-footer", CustomFooter);
