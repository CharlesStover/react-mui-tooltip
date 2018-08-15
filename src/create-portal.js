export default () => {
  const portal = document.createElement('div');
  portal.style.setProperty('height', '0');
  portal.style.setProperty('position', 'absolute');
  portal.style.setProperty('transition-delay', '0s');
  portal.style.setProperty('transition-duration', '0.15s');
  portal.style.setProperty('transition-property', 'top');
  portal.style.setProperty('transition-timing-function', 'linear');
  portal.style.setProperty('width', '0');
  document.body.appendChild(portal);
  return portal;
};
