import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';
import ReactDOM from 'react-dom';
import tooltipStyles from './react-mui-tooltip-styles';

const HALF = 0.5;

const stripUnits = (str) =>
  parseInt(str.match(/^(\d+)/)[0], 10);

export default const Tooltip = withStyles(tooltipStyles)(
  class Tooltip extends React.PureComponent {

    constructor(props) {
      super(props);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleRootRef = this.handleRootRef.bind(this);
      this.handleTooltipRef = this.handleTooltipRef.bind(this);
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.portalRef = null;
      this.rootRef = null;
      this.state = {
        open: false
      };
      this.tooltipRef = null;
    }

    handleMouseLeave() {
      if (this.state.open) {
        this.portalRef.parentNode.removeChild(this.portalRef);
        this.setState({ open: false });
      }
    }

    handleMouseOver() {
      if (!this.state.open) {
        this.portalRef = document.createElement('div');
        this.portalRef.style.setProperty('height', '0');
        this.portalRef.style.setProperty('left', this.rootRefOffsetLeft + 'px');
        this.portalRef.style.setProperty('position', 'absolute');
        this.portalRef.style.setProperty('transition-delay', '0s');
        this.portalRef.style.setProperty('transition-duration', '0.15s');
        this.portalRef.style.setProperty('transition-property', 'top');
        this.portalRef.style.setProperty('transition-timing-function', 'linear');
        this.portalRef.style.setProperty('width', '0');
        document.body.appendChild(this.portalRef);
        this.setState({ open: true });
      }
    }

    handleRootRef(rootRef) {
      this.rootRef = rootRef;
    }

    handleTooltipRef(tooltipRef) {
      this.tooltipRef = tooltipRef;
      if (tooltipRef) {
        const PADDING = 8;

        // Elements that overflow with ellipses still have their full size offset width,
        // despite their visual offset width being only the size of their parent.
        const rootParentComputedStyle = window.getComputedStyle(this.rootRef.parentNode);
        const visualRootWidth = Math.min(
          this.rootRef.offsetWidth,
          this.rootRef.parentNode.clientWidth -
          stripUnits(rootParentComputedStyle['padding-left']) -
          stripUnits(rootParentComputedStyle['padding-right'])
        );

        // Calculate the renderable pixels on the left and right.
        const freeLeft = this.rootRefOffsetLeft;
        const freeRight = window.document.body.offsetWidth - visualRootWidth - freeLeft;

        // Vertical align middle.
        tooltipRef.style.setProperty('margin-top', '-' + Math.round(tooltipRef.offsetHeight * HALF) + 'px');

        // Anchor left.
        if (freeLeft >= freeRight) {
          const width = Math.min(tooltipRef.offsetWidth + 1, freeLeft - PADDING - PADDING);
          tooltipRef.style.setProperty('margin-left', '-' + (width + PADDING) + 'px');
          tooltipRef.style.setProperty('width', width + 'px');
        }

        // Anchor right.
        else {
          const width = Math.min(tooltipRef.offsetWidth + 1, freeRight - PADDING - PADDING);
          this.portalRef.style.setProperty( 
            'left',
            (
              freeLeft +
              visualRootWidth +
              PADDING
            ) + 'px'
          );
          tooltipRef.style.setProperty('width', width + 'px');
        }
        this.portalRef.style.setProperty('top', this.portalRefTop + 'px');
      }
    }

    handleTouchMove() {
      this.portalRef.style.setProperty('top', this.portalRefTop + 'px');
    }

    get portalRefTop() {
      let offsetTop = this.rootRef.offsetHeight * HALF;
      let parentNode = this.rootRef;
      let nextOffsetParent = this.rootRef;
      while (
        parentNode !== null &&
        parentNode !== document.body &&
        parentNode.nodeName.toLowerCase() !== 'html'
      ) {
        offsetTop -= parentNode.scrollTop;
        if (parentNode === nextOffsetParent) {
          offsetTop += parentNode.offsetTop;
          nextOffsetParent = parentNode.offsetParent;
        }
        parentNode = parentNode.parentNode;
      }
      if (offsetTop + this.tooltipRef.offsetHeight > window.innerHeight) {
        return window.innerHeight - this.tooltipRef.offsetHeight;
      }
      return offsetTop;
    }

    get rootRefOffsetLeft() {
      let offsetLeft = this.rootRef.offsetLeft;
      let parentNode = this.rootRef;
      let nextOffsetParent = this.rootRef;
      while (
        parentNode !== null &&
        parentNode !== document.body &&
        parentNode.nodeName.toLowerCase() !== 'html'
      ) {
        offsetLeft -= parentNode.scrollLeft;
        if (parentNode === nextOffsetParent) {
          offsetLeft += parentNode.offsetLeft;
          nextOffsetParent = parentNode.offsetParent;
        }
        parentNode = parentNode.parentNode;
      }
      return offsetLeft;
    }

    get tooltip() {
      if (!this.portalRef) {
        return null;
      }
      return ReactDOM.createPortal(
        <div
          children={this.props.title}
          className={
            this.state.open ?
              this.props.classes.open :
              this.props.classes.closed
          }
          ref={this.handleTooltipRef}
        />,
        this.portalRef
      );
    }

    render() {
      return (
        <span
          className={this.props.classes.root}
          handleBlur={this.handleMouseLeave}
          handleFocus={this.handleMouseOver}
          handleMouseLeave={this.handleMouseLeave}
          handleMouseOver={this.handleMouseOver}
          handleTouchEnd={this.handleMouseLeave}
          handleTouchMove={this.handleTouchMove}
          handleTouchStart={this.handleMouseOver}
          ref={this.handleRootRef}
        >
          {this.tooltip}
          {this.props.children}
        </span>
      );
    }
  }
);
