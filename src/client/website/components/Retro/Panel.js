import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { IconButton } from 'material-ui';
import SortIcon from 'material-ui-icons/Sort';

const Panel = ({ sort, classes, sortByVotes }) => (
  <div className={classes.container}>
    <IconButton onClick={sortByVotes}>
      <SortIcon className={cn(classes.sortIcon, {
        [classes.sortIconActive]: sort
      })}
      />
    </IconButton>
  </div>
);

Panel.contextTypes = {
  socket: PropTypes.object.isRequired
};

Panel.propTypes = {
  // Values
  sort: PropTypes.bool.isRequired,
  // Functions
  sortByVotes: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    sortIcon: PropTypes.string.isRequired,
    sortIconActive: PropTypes.string.isRequired
  }).isRequired
};

export default Panel;
