const styles = theme => ({
  column: {
    display: 'flex',
    flex: '1 0 auto',
    flexFlow: 'column',
    alignContent: 'center',
    minWidth: 300,
    maxWidth: '100%',
    border: '1px dashed #ccc',
    margin: theme.spacing.unit,
    borderRadius: 3,
    padding: theme.spacing.unit
  },
  columnWide: {
    flexShrink: '1',
    flexBasis: '100%',
    order: '-1'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  columnTitle: {
    color: theme.palette.greyBlue,
    fontSize: '16px',
    fontWeight: '700'
  },
  icons: {
    float: 'right'
  },
  icon: {
    width: '32px',
    height: '32px',
    transition: 'all .2s ease',
    color: theme.palette.midGrey,
    '&:hover': {
      color: theme.palette.good
    }
  },
  addCardContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-end',
    paddingBottom: theme.spacing.unit
  }
});

export default styles;
