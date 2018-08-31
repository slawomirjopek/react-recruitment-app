import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './../../components/Retro/Panel.styles';
import Panel from '../../components/Retro/Panel';
import { RETRO_SORT_BY_VOTES, filterByText } from '../../actions/retro';
import { RETRO_SORT_BY_VOTES_KEY } from '../../reducers/retro';

const mapStateToProps = ({ retro }) => ({
  sort: retro[RETRO_SORT_BY_VOTES_KEY]
});

const mapDispatchToProps = dispatch => ({
  sortByVotes: () => dispatch({ type: RETRO_SORT_BY_VOTES }),
  filterByText: text => dispatch(filterByText(text))
});

export default withRouter(withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Panel)
));
