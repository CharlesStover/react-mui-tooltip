const BACKGROUND_SHADE = 700;

export default {
  root: {

    // The root needs to be inline-block, so that the max-width can be 100%.
    display: 'inline-block',

    // A max width of 100% prevents the positioning of the tooltip from aligning to overflowed content.
    maxWidth: '100%',
    position: 'relative'
  },
  closed: {
    display: 'none'
  },
  open: {
    backgroundColor: '#606060',
    borderRadius: 2,
    boxSizing: 'content-box',
    color: '#F0F0F0',
    cursor: 'default',
    fontFamily: '"Roboto Condensed", "Roboto", "Verdana", sans-serif',
    fontSize: 12,
    fontWeight: 500,
    left: '-100%',
    lineHeight: '1.4em',
    opacity: 1,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingTop: 4,
    position: 'absolute',
    width: 'max-content',
    zIndex: 1500
  }
};
