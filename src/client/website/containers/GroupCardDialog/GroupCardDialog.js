import { connect } from 'react-redux';
import { withMobileDialog } from 'material-ui/Dialog';
import GroupCardDialog from '../../components/GroupCardDialog';
import { openGroupCardDialog } from '../../actions/layout';
import { cardGroup } from '../../actions/card';
import {
  LAYOUT_GROUP_CARD_DIALOG_KEY,
  LAYOUT_GROUP_CARD_DIALOG_OPEN_KEY,
  LAYOUT_GROUP_CARD_DIALOG_TO_GROUP_KEY
} from '../../reducers/layout';

const mapStateToProps = ({ layout }) => {
  const key = layout[LAYOUT_GROUP_CARD_DIALOG_KEY];

  return {
    open: key[LAYOUT_GROUP_CARD_DIALOG_OPEN_KEY],
    toGroup: key[LAYOUT_GROUP_CARD_DIALOG_TO_GROUP_KEY]
  };
};

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(openGroupCardDialog(false)),
  cardGroup: (socket, cardsToGroup) => dispatch(cardGroup(socket, cardsToGroup))
});

export default withMobileDialog({ breakpoint: 'xs' })(
  connect(mapStateToProps, mapDispatchToProps)(GroupCardDialog)
);
