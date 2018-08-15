import withStyles from '@material-ui/core/styles/withStyles';

const BACKGROUND_SHADE = 700;
const FONT_SIZE = 12;
const HALF = 0.5;
const LINE_HEIGHT = 1.4;

export default withStyles(theme => ({
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
    backgroundColor: theme.palette.grey[BACKGROUND_SHADE],
    borderRadius: 2,
    boxSizing: 'content-box',
    color: theme.palette.common.white,
    cursor: 'default',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(FONT_SIZE),
    fontWeight: 500,
    left: '-100%',
    lineHeight: theme.typography.round(LINE_HEIGHT) + 'em',
    opacity: 1,
    paddingBottom: theme.spacing.unit * HALF,
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit * HALF,
    position: 'absolute',
    width: 'max-content',
    zIndex: 1500
  }
}));
