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
  private shadow: ShadowRoot;
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('theme-wrapper', ThemeWrapper);
