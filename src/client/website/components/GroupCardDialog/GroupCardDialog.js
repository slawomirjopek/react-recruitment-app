import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import { Button } from 'material-ui';
import { FormattedMessage } from 'react-intl';

class GroupCardDialog extends Component {
  groupCards = async () => {
    const { socket } = this.context;
    const { cardGroup, closeDialog, toGroup: { to, from } } = this.props;

    await cardGroup(socket, { to, from });
    closeDialog();
  }

  render() {
    const { open, closeDialog } = this.props;

    return (
      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle>
          <FormattedMessage id="retro.confirm-group-card" />
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            <FormattedMessage id="navigation.cancel" />
          </Button>
          <Button onClick={this.groupCards} color="primary">
            <FormattedMessage id="navigation.ok" />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GroupCardDialog.contextTypes = {
  socket: PropTypes.object.isRequired
};

GroupCardDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toGroup: PropTypes.shape({
    to: PropTypes.shape({
      id: PropTypes.string.isRequired,
      columnId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }),
    from: PropTypes.shape({
      id: PropTypes.string.isRequired,
      columnId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  }).isRequired,
  closeDialog: PropTypes.func.isRequired,
  cardGroup: PropTypes.func.isRequired
};

export default GroupCardDialog;
