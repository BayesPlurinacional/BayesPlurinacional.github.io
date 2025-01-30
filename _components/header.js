import './navbar.js';
import './footer.js';

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Usamos shadow DOM para aislar estilos
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <custom-navbar></custom-navbar>
      <slot></slot> <!-- Aquí se cargará el contenido de cada página -->
      <custom-footer></custom-footer>
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }
}

// Definir el componente solo si no está definido
if (!customElements.get('custom-header')) {
  customElements.define('custom-header', CustomHeader);
}
