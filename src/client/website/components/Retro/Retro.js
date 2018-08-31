import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography
} from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import { FormattedMessage } from 'react-intl';
import CloudDownload from 'material-ui-icons/CloudDownload';
import {
  QUERY_ERROR_KEY,
  QUERY_STATUS_FAILURE,
  QUERY_STATUS_KEY,
  QUERY_STATUS_SUCCESS,
  queryFailed,
  QueryShape,
  querySucceeded
} from '../../services/websocket/query';
import Column from '../../containers/Retro/Column';
import Steps from '../../containers/Retro/Steps';
import Panel from '../../containers/Retro/Panel';
import ConfirmActionDialog from '../../containers/ConfirmActionDialog';
import { initialsOf } from '../../services/utils/initials';
import { exportDataToCsv } from '../../services/file/export';

const CSV_KEYS = {
  COLUMN_ID: 'columnId',
  COLUMN_NAME: 'columnName',
  COLUMN_ICON: 'columnIcon',
  COLUMN_POSITION: 'columnPosition',
  CARD_ID: 'cardId',
  CARD_TEXT: 'cardText',
  CARD_VOTES: 'cardVotes',
  CARD_AUTHORS: 'cardAuthors'
};

class Retro extends Component {
  componentWillMount() {
    this.joinRetro();
  }

  componentWillReceiveProps(nextProps) {
    const { addColumnQuery, connectQuery, addMessage } = this.props;
    const { addColumnQuery: nextAddColumnQuery, connectQuery: nextConnectQuery } = nextProps;
    if (queryFailed(addColumnQuery, nextAddColumnQuery)) {
      addMessage(nextAddColumnQuery[QUERY_ERROR_KEY]);
    }
    if (querySucceeded(connectQuery, nextConnectQuery)) {
      this.joinRetro();
    }
  }

  joinRetro = () => {
    const { joinRetro, match: { params: { retroShareId } } } = this.props;
    const { socket } = this.context;
    joinRetro(socket, retroShareId);
  };

  exportCsv = () => {
    const { cards, columns, shareId } = this.props;
    const data = [];

    columns.forEach(({ position, name, icon, id }) => {
      const cardsInColumn = cards.filter(({ columnId }) => columnId === id);

      cardsInColumn.forEach((card) => {
        const authors = card.authors.reduce((acc, author, index) => (index ? `${acc}, ${author.name}` : author.name), '');

        data.push({
          [CSV_KEYS.COLUMN_ID]: id,
          [CSV_KEYS.COLUMN_NAME]: name,
          [CSV_KEYS.COLUMN_ICON]: icon,
          [CSV_KEYS.COLUMN_POSITION]: position,
          [CSV_KEYS.CARD_ID]: card.id,
          [CSV_KEYS.CARD_TEXT]: card.text,
          [CSV_KEYS.CARD_AUTHORS]: authors,
          [CSV_KEYS.CARD_VOTES]: card.votes.length
        });
      });
    });

    const filename = `retro-${shareId}`;
    const fields = Object.values(CSV_KEYS);

    exportDataToCsv({ data, fields, filename });
  };

  render() {
    const {
      classes,
      columns,
      users,
      history,
      joinRetroQuery: {
        [QUERY_STATUS_KEY]: joinStatus,
        [QUERY_ERROR_KEY]: joinError
      }
    } = this.props;
    switch (joinStatus) {
      case QUERY_STATUS_SUCCESS:
        return (
          <div className={classes.root}>
            <Steps />
            <Panel />
            <div className={classes.columns}>
              {columns.map(column => (
                <Column key={column.id} column={column} />
              ))}
            </div>
            <div className={classes.download}>
              <ConfirmActionDialog
                key="download-confirm"
                TriggeringComponent={({ onClick }) => (
                  <IconButton
                    key="export"
                  >
                    <CloudDownload
                      onClick={onClick}
                      className={classes.downloadIcon}
                    />
                  </IconButton>
                )}
                textContent={<FormattedMessage id="retro.confirm-export-data" />}
                onConfirm={this.exportCsv}
              />
            </div>
            <div className={classes.users}>
              {Object.values(users).map(({ id, name }) => (
                <Tooltip key={id} title={name} placement="left">
                  <Avatar
                    alt={name}
                    className={classes.avatar}
                  >
                    {initialsOf(name)}
                  </Avatar>
                </Tooltip>
              ))}
            </div>
          </div>
        );
      case QUERY_STATUS_FAILURE:
        return (
          <div className={classes.root}>
            <Card className={classes.messageCard}>
              <Typography type="headline">Error</Typography>
              <CardContent>
                <Typography>{joinError}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => history.goBack()}>Back</Button>
              </CardActions>
            </Card>
          </div>
        );
      default:
        return (
          <div className={classes.root}>
            <Card className={classes.messageCard}>
              <CircularProgress color="primary" />
            </Card>
          </div>
        );
    }
  }
}

Retro.contextTypes = {
  socket: PropTypes.object.isRequired
};

Retro.defaultProps = {
  shareId: ''
};

Retro.propTypes = {
  // Values
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      retroShareId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })).isRequired,
  users: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  shareId: PropTypes.string,
  // Queries
  connectQuery: PropTypes.shape(QueryShape).isRequired,
  joinRetroQuery: PropTypes.shape(QueryShape).isRequired,
  addColumnQuery: PropTypes.shape(QueryShape).isRequired,
  // Functions
  joinRetro: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    messageCard: PropTypes.string.isRequired,
    columns: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    hidden: PropTypes.string.isRequired,
    download: PropTypes.string.isRequired,
    downloadIcon: PropTypes.string.isRequired
  }).isRequired
};

export default Retro;
