import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { IconButton, Input, FormControl } from 'material-ui';
import SortIcon from 'material-ui-icons/Sort';

export const FILTER_MIN_LENGTH = 2;

class Panel extends Component {
  handleChange = ({ target: { value } }) => {
    const { filterByText } = this.props;

    if (value.length >= FILTER_MIN_LENGTH) {
      filterByText(value);
    } else {
      filterByText();
    }
  }

  render() {
    const { sort, classes, sortByVotes } = this.props;
    const { intl } = this.context;

    return (
      <div className={classes.container}>
        <div className={classes.inner}>
          <FormControl className={classes.formControl}>
            <Input
              onChange={this.handleChange}
              placeholder={intl.formatMessage({ id: 'retro.filter-cards' })}
            />
          </FormControl>
          <IconButton onClick={sortByVotes}>
            <SortIcon className={cn(classes.sortIcon, {
              [classes.sortIconActive]: sort
            })}
            />
          </IconButton>
        </div>
      </div>
    );
  }
}

Panel.contextTypes = {
  socket: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

Panel.propTypes = {
  // Values
  sort: PropTypes.bool.isRequired,
  // Functions
  sortByVotes: PropTypes.func.isRequired,
  filterByText: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    inner: PropTypes.string.isRequired,
    formControl: PropTypes.string.isRequired,
    sortIcon: PropTypes.string.isRequired,
    sortIconActive: PropTypes.string.isRequired
  }).isRequired
};

export default Panel;
