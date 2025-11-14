const template = document.createElement('template');
template.innerHTML = `
    <style>
        .card-root{
            position: relative;
            padding: 6px;
            border-radius: 2px;
            border: 1px solid #888;
            box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .card-close-button {
            position: absolute;
            top: 4px;
            right: 4px;
            display:flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: white;
            background: #888;
            cursor: pointer;
            border-radius: 2px;
        }
        .card-title {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 1rem;
        }
        .card-content {
            margin-bottom: 1rem;
        }
        .card-footer {
        }
    </style>
    <div class="card-root">
        <div class="card-close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
        <div   class="card-title">
            <slot name="title"></slot>
        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
`;

export class CustomCard extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('Card added to the DOM');
  }
}

customElements.define('custom-card', CustomCard);
