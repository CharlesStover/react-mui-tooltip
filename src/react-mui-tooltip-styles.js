const BACKGROUND_SHADE = 700;
const FONT_SIZE = 10;
const HALF = 0.5;
const LINE_HEIGHT = 1.4;

export default theme => ({
  root: {
    position: 'relative'
  },
  closed: {
    display: 'none'
  },
  open: {
    backgroundColor: theme.palette.grey[BACKGROUND_SHADE],
    borderRadius: 2,
    boxSizing: 'border-box',
    color: theme.palette.common.white,
    cursor: 'default',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(FONT_SIZE),
    left: '-100%',
    lineHeight: theme.typography.round(LINE_HEIGHT) + 'em',
    opacity: 0.9,
    paddingBottom: theme.spacing.unit * HALF,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * HALF,
    position: 'absolute',
    width: 'max-content'
  }
});
