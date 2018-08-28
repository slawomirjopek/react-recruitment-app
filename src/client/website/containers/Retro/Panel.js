import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './../../components/Retro/Panel.styles';
import Panel from '../../components/Retro/Panel';
import { RETRO_SORT } from '../../actions/retro';
import { RETRO_SORT_KEY } from '../../reducers/retro';

const mapStateToProps = ({ retro }) => ({
  sort: retro[RETRO_SORT_KEY]
});

const mapDispatchToProps = dispatch => ({
  sortByVotes: () => dispatch({ type: RETRO_SORT })
});

export default withRouter(withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Panel)
));
