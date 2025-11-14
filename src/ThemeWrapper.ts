const COMPONENTS_ATTRIBUTES = ['primary'] as const;

const template = document.createElement('template');
template.innerHTML = `
        <style>
             :host {
               --primary-color: #000000;
             }
        </style>
        <slot></slot>
        `;

export class ThemeWrapper extends HTMLElement {
  private primary: string = '#000000';
  private shadow: ShadowRoot;
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return COMPONENTS_ATTRIBUTES;
  }

  attributeChangedCallback(name: (typeof COMPONENTS_ATTRIBUTES)[number], oldValue: string | null, newValue: string | null) {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    if (name === 'primary') {
      this.primary = newValue || '#000000';
      const style = document.createElement('style');
      style.textContent = `
        :host {
            --primary-color: ${this.getAttribute('primary') || '#000'};
        }
    `;
      this.shadow.appendChild(style);
    }
    console.warn(`Invalid attribute name: ${name}`);
  }
}

customElements.define('theme-wrapper', ThemeWrapper);
