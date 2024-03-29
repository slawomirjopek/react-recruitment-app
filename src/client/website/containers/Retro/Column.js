import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './../../components/Retro/Column.styles';
import Column from '../../components/Retro/Column';
import { columnEdit } from '../../actions/column';
import {
  CARD_ADD_QUERY_KEY,
  COLUMN_EDIT_QUERY_KEY,
  RETRO_CARDS_KEY,
  RETRO_SORT_BY_VOTES_KEY,
  RETRO_FILTER_BY_TEXT_KEY
} from '../../reducers/retro';
import { cardAdd, cardEdit } from '../../actions/card';
import { addMessage } from '../../actions/layout';

const mapStateToProps = ({ retro }) => ({
  cards: retro[RETRO_CARDS_KEY],
  editColumnQuery: retro[COLUMN_EDIT_QUERY_KEY],
  addCardQuery: retro[CARD_ADD_QUERY_KEY],
  sortByVotes: retro[RETRO_SORT_BY_VOTES_KEY],
  filterByText: retro[RETRO_FILTER_BY_TEXT_KEY]
});

const mapDispatchToProps = dispatch => ({
  editColumn: (socket, column) => dispatch(columnEdit(socket, column)),
  addCard: (socket, columnId, text) => dispatch(cardAdd(socket, columnId, text)),
  editCard: (socket, card) => dispatch(cardEdit(socket, card)),
  addMessage: message => dispatch(addMessage(message))
});

export default withRouter(withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(Column)
));
