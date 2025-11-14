export { CustomCard } from './CustomCard';
export { GeoblockingIcon } from './GeoblockingIcon';
export { GeoblockingSelect } from './GeoblockingSelect';
export { ThemeWrapper } from './ThemeWrapper';

declare global {
  interface Window {
    click: () => void;
    dontClick: () => void;
  }
}

window.click = () => {
  document.body.style.transform = 'rotate(0)';
};
window.dontClick = () => {
  document.body.style.transform = 'rotate(35deg)';
};
