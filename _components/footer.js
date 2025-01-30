class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
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
                        <li><a href="/_pages/es/somos.html">Quiénes Somos</a></li>
                        <li><a href="/_pages/es/plural.html">Plural</a></li>
                        <li><a href="/_pages/es/organizacion.html">Organización</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Congreso</h5>
                    <ul>
                        <li><a href="/_pages/es/cronograma.html">Cronograma</a></li>
                        <li><a href="/_pages/es/disertantes.html">Disertantes</a></li>
                        <li><a href="/_pages/es/seminarios.html">Seminarios Virtuales</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Galería</h5>
                    <ul>
                        <li><a href="/_pages/es/galeria/2025.html">Fotos 2025</a></li>
                        <li><a href="/_pages/es/galeria/2024.html">Fotos 2024</a></li>
                        <li><a href="/_pages/es/galeria/2023.html">Fotos 2023</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Síguenos</h5>
                    <div class="social-icons">
                        <a href="https://twitter.com/BayesPlural" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                        <a href="https://instagram.com/bayesplurinacional" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/bayes-plurinacional/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="mailto:bayesplurinacional@gmail.com"><i class="fa-solid fa-envelope"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <p class="footer-bottom">
            © 2025 Bayes Plurinacional. Todos los derechos reservados.
        </p>
      </footer>

      <style>
        .footer {
            background-color: var(--fondo-oscuro);
            color: white;
            padding: 40px 0;
            text-align: center;
        }

        .footer a {
            color: white;
            text-decoration: none;
            font-weight: 500;
        }

        .footer a:hover {
            color: var(--boton-secundario);
            text-decoration: underline; 
            }

        .footer-bottom {
            background-color: var(--fondo-oscuro);
            padding: 10px 0;
            font-size: 14x;
        }

        .social-icons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 10px;
        }

        .social-icons a {
            font-size: 24px;
            color: white;
            text-decoration: none;
            transition: color 0.3s ease-in-out;
        }

        .social-icons a:hover {
            color: var(--boton-secundario);
        }

        .footer p{
          font-size: 14px;
        }
      
      </style>
    `;
  }
}

customElements.define("custom-footer", CustomFooter);
