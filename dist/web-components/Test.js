import * as webjsx from 'webjsx';
// Define a simple virtual DOM element using JSX
const vdom = (<div id="main-container">
    <h1>Welcome to webjsx</h1>
    <p>This is a simple example.</p>
  </div>);
// Select the container in the real DOM
const appContainer = document.getElementById('app');
// Apply the virtual DOM diff to update the real DOM
webjsx.applyDiff(appContainer, vdom);
//# sourceMappingURL=Test.js.map