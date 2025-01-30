class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
            <div class="row">
                <!-- Sección 1: Sobre Nosotros -->
                <div class="col-lg-3 col-md-6">
                    <h5>Sobre Nosotros</h5>
                    <ul>
                        <li><a href="/_pages/es/somos.html">Quiénes Somos</a></li>
                        <li><a href="/_pages/es/plural.html">Plural</a></li>
                        <li><a href="/_pages/es/organizacion.html">Organización</a></li>
                    </ul>
                </div>

                <!-- Sección 2: Congreso -->
                <div class="col-lg-3 col-md-6">
                    <h5>Congreso</h5>
                    <ul>
                        <li><a href="/_pages/es/cronograma.html">Cronograma</a></li>
                        <li><a href="/_pages/es/disertantes.html">Disertantes</a></li>
                        <li><a href="/_pages/es/seminarios.html">Seminarios Virtuales</a></li>
                    </ul>
                </div>

                <!-- Sección 3: Galería -->
                <div class="col-lg-3 col-md-6">
                    <h5>Galería</h5>
                    <ul>
                        <li><a href="/_pages/es/galeria/2025.html">Fotos 2025</a></li>
                        <li><a href="/_pages/es/galeria/2024.html">Fotos 2024</a></li>
                        <li><a href="/_pages/es/galeria/2023.html">Fotos 2023</a></li>
                    </ul>
                </div>

                <!-- Sección 4: Redes Sociales -->
                <div class="col-lg-3 col-md-6">
                    <h5>Síguenos</h5>
                    <div class="social-icons">
                        <a href="https://twitter.com/BayesPlural" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="https://instagram.com/bayesplurinacional" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/bayes-plurinacional/" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="mailto:bayesplurinacional@gmail.com"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <p class="footer-bottom">
            © 2025 Bayes Plurinacional. Todos los derechos reservados.
        </p>
      </footer>
    `;
  }
}

customElements.define("custom-footer", CustomFooter);
