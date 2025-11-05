"use strict";
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            border: red 1px solid;
        }
        svg {
            display: inline-block;
            width: 24px;
            height: 24px;
             border: blue 1px solid;
        }
    </style> 
    <div class="GeoblockingIcon-root">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-lock-icon lucide-globe-lock">
            <path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"/>
            <path d="M2 12h8.5"/>
            <path d="M20 6V4a2 2 0 1 0-4 0v2"/>
            <rect width="8" height="5" x="14" y="6" rx="1"/>
        </svg>
        <span class="GeoblockingIcon-label">Test</span>
    </div> 
`;
class GeoblockingIcon extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
        this.dataLabel = this.shadow.querySelector('span.GeoblockingIcon-label');
    }
    static get observedAttributes() {
        return ['area'];
    }
    connectedCallback() {
        console.log('GeoblockingIcon added to the DOM');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`${name} changed from ${oldValue} to ${newValue}`);
        if (name === 'area') {
            return this.updateArea(newValue);
        }
        console.warn(`Invalid attribute name: ${name}`);
    }
    updateArea(area) {
        if (!AREAS.includes(area)) {
            console.warn(`Invalid area value: ${area}. Expected one of: ${AREAS}`);
            return;
        }
        this.dataLabel.textContent = AREA_CONFIG[area].label;
    }
}
const AREAS = [
    'ALL',
    'EUR_PLUS',
    'SAT',
    'EUR_UK',
    'EUR_DE_FR',
    'DE_FR',
];
const AREA_CONFIG = {
    ALL: {
        label: 'Worldwide',
    },
    EUR_PLUS: {
        label: 'Europe Plus',
    },
    SAT: {
        label: 'Europe Sat',
    },
    EUR_UK: {
        label: 'Europe UK',
    },
    EUR_DE_FR: {
        label: 'German and French speaking countries',
    },
    DE_FR: {
        label: 'Germany & France',
    },
};
customElements.define('geoblocking-icon', GeoblockingIcon);
//# sourceMappingURL=GeoblockingIcon.js.map