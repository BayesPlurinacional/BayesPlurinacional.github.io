import './navbar.js';
import './footer.js';
import './secondary-navbar.js'; 

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const eventType = this.getAttribute('data-event-type') || "";
    const eventKey = this.getAttribute('data-event-key') || "";
    const lang = this.getAttribute('data-lang') || "";
    
    this.shadowRoot.innerHTML = `
      <custom-navbar data-event-type="${eventType}" data-event-key="${eventKey}" data-lang="${lang}"></custom-navbar>
      ${
        eventKey 
          ? `<secondary-navbar data-event-type="${eventType}" data-event-key="${eventKey}" data-lang="${lang}"></secondary-navbar>` 
          : ""
      }
      <slot></slot>
      <custom-footer data-lang="${lang}"></custom-footer>
      <style>
        :host { display: block; }
      </style>
    `;
  }
}

if (!customElements.get('custom-header')) {
  customElements.define('custom-header', CustomHeader);
}
