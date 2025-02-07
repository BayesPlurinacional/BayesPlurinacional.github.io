import './navbar.js';
import './footer.js';

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Lee los atributos que tiene el custom-header
    const eventType = this.getAttribute('data-event-type') || "";
    const eventKey = this.getAttribute('data-event-key') || "";
    const lang = this.getAttribute('data-lang') || "";
    
    // Pasa esos atributos a custom-navbar
    this.shadowRoot.innerHTML = `
      <custom-navbar data-event-type="${eventType}" data-event-key="${eventKey}" data-lang="${lang}"></custom-navbar>
      <slot></slot>
      <custom-footer></custom-footer>
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }
}

if (!customElements.get('custom-header')) {
  customElements.define('custom-header', CustomHeader);
}
