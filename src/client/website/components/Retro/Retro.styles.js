import { cardWidth } from '../../theme/dimensions';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    width: '100%'
  },
  columns: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    padding: '0 4%'
  },
  users: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    width: 64,
    height: 64,
    margin: theme.spacing.unit
  },
  badge: {
    margin: theme.spacing.unit * 2
  },
  messageCard: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
    width: cardWidth,
    maxWidth: '100%',
    margin: theme.spacing.unit * 2
  },
  hidden: {
    display: 'none'
  },
  download: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1% 4% 0',
    padding: '0 8px'
  },
  downloadIcon: {
    width: '40px',
    height: '40px',
    transition: 'all .2s ease',
    color: theme.palette.midGrey,
    '&:hover': {
      color: theme.palette.good
    }
  }
});

export default styles;
