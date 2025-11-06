import { GEOBLOCKING_AREA_IDS, getGeoblockingAreaById } from './geoblockingUtils';

const COMPONENTS_ATTRIBUTES = ['geoblocking-area', 'id'] as const;

const template = document.createElement('template');
template.innerHTML = `
      <style>
          .GeoblockingIcon-root { 
              display: flex;
              align-items: center;
              gap: 8px;
          } 
          svg {
              stroke:var(--primary-color, #000000);
              display: inline-block;
              width: 24px;
              height: 24px;
          }
      </style> 
      <div class="GeoblockingIcon-root">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-lock-icon lucide-globe-lock">
              <path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"/>
              <path d="M2 12h8.5"/>
              <path d="M20 6V4a2 2 0 1 0-4 0v2"/>
              <rect width="8" height="5" x="14" y="6" rx="1"/>
          </svg>
          <div class="GeoblockingIcon-label">Test</div>
      </div> 
  `;

export class GeoblockingIcon extends HTMLElement {
  private shadow: ShadowRoot;
  private dataLabel: HTMLDivElement;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));

    this.dataLabel = this.shadow.querySelector('div.GeoblockingIcon-label')!;
  }

  connectedCallback() {
    console.log('GeoblockingIcon added to the DOM');
  }

  static get observedAttributes() {
    return COMPONENTS_ATTRIBUTES;
  }

  attributeChangedCallback(name: (typeof COMPONENTS_ATTRIBUTES)[number], oldValue: string | null, newValue: string | null) {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    if (name === 'geoblocking-area') {
      return this.updateGeoblockingArea(newValue);
    }
    console.warn(`Invalid attribute name: ${name}`);
  }

  private updateGeoblockingArea(geoblockingAreaId: string | null) {
    const geoblockingArea = getGeoblockingAreaById(geoblockingAreaId);
    if (!geoblockingArea) {
      console.warn(`Invalid area value: ${geoblockingAreaId}. Expected one of: ${GEOBLOCKING_AREA_IDS}`);
      return;
    }
    this.dataLabel.textContent = geoblockingArea.shortLabel;
  }
}

customElements.define('geoblocking-icon', GeoblockingIcon);
