import React from 'react';
import ReactDOM from 'react-dom';
import createPortal from './create-portal';
import styles from './react-mui-tooltip-styles';

const EVENT_LISTENER_OPTIONS = {
  passive: true
};

let openMuiTooltip = null;

// On Window touch, if the target is not a child of the open tooltip, close it.
const handleTouchStart = e => {
  if (open) {
    let target = e.target;
    while (target !== window.document.body) {
      if (target === open.rootRef) {
        return;
      }
      target = target.parentNode;
    }
    open.close();
  }
};

class MuiTooltip extends React.PureComponent {

  portalRef = null;

  rootRef = null;

  state = {
    open: false
  };

  tooltipRef = null;

  componentWillUnmount() {
    if (openMuiTooltip === this) {
      this.close(true);
    }
  }

  close(unmounting = false) {
    if (this.state.open) {

      // Remove window's event listeners.
      window.removeEventListener('touchstart', handleTouchStart, EVENT_LISTENER_OPTIONS);

      // Close this tooltip.
      openMuiTooltip = null;
      this.portalRef.parentNode.removeChild(this.portalRef);

      // Don't bother re-render if we are unmounting.
      if (!unmounting) {
        this.setState({ open: false });
      }
    }
  }

  handleBlur = () => {
    this.close();
  };

  handleFocus = () => {
    this.open();
  };

  handleMouseLeave = () => {
    this.close();
  };

  handleMouseOver = () => {
    this.open();
  };

  handleRootRef = (rootRef) => {
    this.rootRef = rootRef;
  };

  handleTooltipRef = (tooltipRef) => {
    this.tooltipRef = tooltipRef;
    if (tooltipRef) {
      const PADDING = 8;

      // Elements that overflow with ellipses still have their full size offsetWidth,
      // despite their visual offset width being only the size of their parent.
      const rootWidth = this.rootRef.getBoundingClientRect().width;

      // Calculate the renderable pixels on the left and right.
      const freeLeft = this.rootRefOffsetLeft;
      const freeRight = window.document.body.offsetWidth - rootWidth - freeLeft;

      // Vertical align middle.
      tooltipRef.style.setProperty('margin-top', '-' + Math.round(tooltipRef.offsetHeight * HALF) + 'px');

      // Anchor left.
      if (freeLeft >= freeRight) {
        const tooltipWidth = Math.min(tooltipRef.offsetWidth + 1, freeLeft - PADDING - PADDING);
        tooltipRef.style.setProperty('margin-left', '-' + (tooltipWidth + PADDING) + 'px');
        tooltipRef.style.setProperty('width', tooltipWidth + 'px');
      }

      // Anchor right.
      else {
        const tooltipWidth = Math.min(tooltipRef.offsetWidth + 1, freeRight - PADDING - PADDING);
        this.portalRef.style.setProperty(
          'left',
          (
            freeLeft +
            rootWidth +
            PADDING
          ) + 'px'
        );
        tooltipRef.style.setProperty('width', tooltipWidth + 'px');
      }
      this.setPortalRefTop();
    }
  };

  handleTouchStart = () => {
    this.open();
  };

  open() {
    if (!this.state.open) {

      // If another tooltip is open, close it.
      if (
        openMuiTooltip &&
        openMuiTooltip !== this
      ) {
        openMuiTooltip.close();
      }

      // Add event listeners for the window.
      window.addEventListener('touchstart', handleTouchStart, EVENT_LISTENER_OPTIONS);

      // Open this tooltip.
      openMuiTooltip = this;
      this.portalRef = createPortal();
      this.portalRef.style.setProperty('left', this.rootRefOffsetLeft + 'px');
      this.setState({ open: true });
    }
  }

  get portalRefTop() {
    const offsetTop = this.rootRef.getBoundingClientRect().y + this.rootRef.offsetHeight * HALF;
    if (offsetTop + this.tooltipRef.offsetHeight > window.innerHeight) {
      return window.innerHeight - this.tooltipRef.offsetHeight;
    }
    return offsetTop;
  }

  get rootRefOffsetLeft() {
    return this.rootRef.getBoundingClientRect().x;
  }

  setPortalRefTop() {
    this.portalRef.style.setProperty('top', this.portalRefTop + 'px');
  }

  get tooltip() {
    if (!this.portalRef) {
      return null;
    }
    return ReactDOM.createPortal(
      <div
        children={this.props.title}
        ref={this.handleTooltipRef}
        style={
          this.state.open ?
            styles.open :
            styles.closed
        }
      />,
      this.portalRef
    );
  }

  render() {
    return (
      <span
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseLeave={this.handleMouseLeave}
        onMouseOver={this.handleMouseOver}
        onTouchStart={this.handleTouchStart}
        ref={this.handleRootRef}
        style={styles.root}
      >
        {this.tooltip}
        {this.props.children}
      </span>
    );
  }
}

export default MuiTooltip;
