class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <footer class="footer bg-dark text-white text-center py-3">
              <div class="container">
                  <div class="row">
                      <div class="col-md-6">
                          <h5>Bayes Plurinacional</h5>
                          <p>Evento de estadística y ciencia de datos en América Latina. Conectamos a la comunidad para compartir conocimiento y experiencias.</p>
                      </div>
                      <div class="col-md-3">
                          <h5>Enlaces</h5>
                          <ul class="list-unstyled">
                              <li><a href="/_pages/es/somos.html">Somos</a></li>
                              <li><a href="/_pages/es/galeria.html">Galería</a></li>
                              <li><a href="/_pages/es/contacto.html">Contacto</a></li>
                          </ul>
                      </div>
                      <div class="col-md-3">
                          <h5>Síguenos</h5>
                          <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                      </div>
                  </div>
              </div>
              <div class="footer-bottom bg-secondary py-2">
                  © 2025 Bayes Plurinacional. Todos los derechos reservados.
              </div>
          </footer>

          <style>
          /* Navbar */
.navbar {
    background-color: var(--color-primario);
    color: white;
}

.navbar .nav-link {
    color: white;
}

.navbar .nav-link:hover {
    color: var(--color-secundario);
}

</style>
      `;
  }
}
customElements.define("custom-footer", CustomFooter);
