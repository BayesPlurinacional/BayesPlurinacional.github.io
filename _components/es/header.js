class CustomHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
          <custom-navbar></custom-navbar>
          <slot></slot> <!-- Aquí se cargará el contenido de cada página -->
          <custom-footer></custom-footer>
      `;
  }
}
customElements.define('custom-header', CustomHeader);
