import { GEOBLOCKING_AREAS } from './geoblockingUtils';

const COMPONENTS_ATTRIBUTES = ['target'] as const;

const template = document.createElement('template');
template.innerHTML = `
    <style>  
        .GeoblockingSelect-root{
            display: block;
            padding: 4px;
            color:var(--primary-color, #000000);
        }
    </style>
      <select class="GeoblockingSelect-root" />
  `;

export class GeoblockingSelect extends HTMLElement {
  private target: string | null = null;
  private shadow: ShadowRoot;
  private select: HTMLSelectElement;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));

    this.select = this.shadow.querySelector('select.GeoblockingSelect-root')!;
    this.select.addEventListener('change', this.selectChangeHandler.bind(this));
  }

  connectedCallback() {
    GEOBLOCKING_AREAS.forEach((geoblockingArea) => {
      const optionElement = document.createElement('option');
      optionElement.value = geoblockingArea.id;
      optionElement.text = geoblockingArea.fullLabel;
      this.select.appendChild(optionElement);
    });
    this.selectChangeHandler();
  }

  static get observedAttributes() {
    return COMPONENTS_ATTRIBUTES;
  }

  attributeChangedCallback(name: (typeof COMPONENTS_ATTRIBUTES)[number], oldValue: string | null, newValue: string | null) {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    if (name === 'target') {
      this.target = newValue;
      this.selectChangeHandler();
    }
    console.warn(`Invalid attribute name: ${name}`);
  }

  selectChangeHandler(): void {
    this.select.value;

    const geoblockingIcon = document.getElementById(this.target!) as HTMLElement | null;
    if (geoblockingIcon) {
      geoblockingIcon.setAttribute('geoblocking-area', this.select.value);
    }
  }
}

customElements.define('geoblocking-select', GeoblockingSelect);
