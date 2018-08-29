import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography } from 'material-ui';
import PlaylistAdd from 'material-ui-icons/PlaylistAdd';
import Card from '../../containers/Retro/Card';
import { QUERY_ERROR_KEY, queryFailed, QueryShape } from '../../services/websocket/query';
import { FILTER_MIN_LENGTH } from './Panel';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentWillReceiveProps(nextProps) {
    const { addCardQuery, addMessage } = this.props;
    const { addCardQuery: nextAddCardQuery } = nextProps;
    if (queryFailed(addCardQuery, nextAddCardQuery)) {
      addMessage(nextAddCardQuery[QUERY_ERROR_KEY]);
    }
  }

  getFilterConditions = (card) => {
    const { column, filterByText } = this.props;

    return {
      column: column.id === card.columnId,
      word: filterByText.length >= FILTER_MIN_LENGTH && card.text.includes(filterByText)
    };
  };

  addCard = () => {
    const { socket } = this.context;
    const { text } = this.state;
    const { column: { id }, addCard } = this.props;

    addCard(socket, id, text);
    this.setState({ text: '' });
  };

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDrop = ({ dataTransfer }) => {
    const { socket } = this.context;
    const { column: { id }, editCard } = this.props;
    const card = JSON.parse(dataTransfer.getData('card'));

    if (card.columnId !== id) {
      editCard(socket, {
        ...card,
        columnId: id
      });
    }
  };

  filterCards = (card) => {
    const { filterByText } = this.props;
    const conditions = this.getFilterConditions(card);

    return filterByText.length >= FILTER_MIN_LENGTH ?
      conditions.column && conditions.word : conditions.column;
  };

  render() {
    const { column, cards, classes, sortByVotes } = this.props;
    const transformedCards = cards
      .filter(this.filterCards)
      .sort((a, b) => sortByVotes && b.votes.length - a.votes.length)
      .map(card => (
        <Card card={card} key={card.id} highlight={this.getFilterConditions(card).word} />
      ));

    return (
      <div
        className={classes.column}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className={classes.header}>
          <Typography
            type="headline"
            className={classes.columnTitle}
            onDoubleClick={this.startEditing}
          >{column.name}
          </Typography>
          <IconButton className={classes.addCardIcon} onClick={this.addCard}>
            <PlaylistAdd className={classes.actionIcon} />
          </IconButton>
        </div>
        {transformedCards}
      </div>
    );
  }
}

Column.contextTypes = {
  socket: PropTypes.object.isRequired
};

Column.propTypes = {
  // Values
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  sortByVotes: PropTypes.bool.isRequired,
  filterByText: PropTypes.string.isRequired,
  // Functions
  addCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  // Queries
  addCardQuery: PropTypes.shape(QueryShape).isRequired,
  // Styles
  classes: PropTypes.shape({
    column: PropTypes.string.isRequired,
    columnTitle: PropTypes.string.isRequired,
    addCardIcon: PropTypes.string.isRequired,
    addCardContainer: PropTypes.string.isRequired
  }).isRequired
};

export default Column;
