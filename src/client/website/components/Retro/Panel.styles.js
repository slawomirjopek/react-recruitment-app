const styles = theme => ({
  container: {
    display: 'flex',
    padding: '0 4%',
    marginBottom: '1%'
  },
  inner: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 8px'
  },
  formControl: {
    width: '100%',
    maxWidth: '300px'
  },
  sortIcon: {
    width: '40px',
    height: '40px',
    transition: 'all .2s ease',
    color: theme.palette.midGrey,
    '&:hover': {
      color: theme.palette.good
    }
  },
  sortIconActive: {
    color: theme.palette.good
  }
});

export default styles;
