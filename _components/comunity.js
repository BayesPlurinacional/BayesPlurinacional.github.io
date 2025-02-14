class CustomComunidad extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch('/_data/comunidad.json');
      const data = await response.json();
      
      // Detectar el idioma de la página
      let lang = this.getAttribute("data-lang") || "es";
      const comunidadData = data.Comunidad[lang];

      // Construcción dinámica de advertencias
      const advertenciasHTML = comunidadData.Advertencias.map(
        item => `<li>${item}</li>`
      ).join("");

      // Construcción dinámica de países
      const paisesHTML = Object.entries(comunidadData.Paises).map(
        ([nombre, url]) => `
          <div class="col-md-3 col-sm-6 text-center">
            <h5><a href="${url}" target="_blank">${nombre}</a></h5>
            <a href="${url}" target="_blank">
              <img class="img-fluid country-flag" src="/_assets/_img/banderas/${nombre.toLowerCase()}.png" alt="${nombre}">
            </a>
          </div>
        `
      ).join("");

      // Inserción en el Shadow DOM
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/_assets/_css/global.css">
        <div class="container comunidad-container">
          <h1 class="text-center">${comunidadData.Titulo}</h1>
          <p class="text-center lead">${comunidadData.Descripcion}</p>

          <h3 class="text-center mt-4">Advertencias</h3>
          <ul class="alert alert-warning">${advertenciasHTML}</ul>

          <div class="row text-center mt-4">${paisesHTML}</div>
        </div>

        <style>
          .comunidad-container {
            max-width: 900px;
            margin: auto;
            padding: 40px 20px;
          }

          .country-flag {
            width: 80%;
            border-radius: 10px;
            transition: transform 0.3s ease-in-out;
          }

          .country-flag:hover {
            transform: scale(1.05);
          }

          ul.alert {
            list-style-type: none;
            padding: 20px;
            background: #ffcc00;
            border-radius: 8px;
          }

          ul.alert li {
            margin-bottom: 5px;
          }
        </style>
      `;
    } catch (error) {
      console.error("Error al cargar comunidad.json:", error);
    }
  }
}

customElements.define("custom-comunidad", CustomComunidad);
