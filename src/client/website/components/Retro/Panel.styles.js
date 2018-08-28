const styles = theme => ({
  container: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    padding: '0 4%',
    border: '1px solid #ccc',
    marginBottom: '1%',
    justifyContent: 'flex-end'
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
