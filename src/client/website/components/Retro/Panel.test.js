import React from 'react';
import Panel, { FILTER_MIN_LENGTH } from './Panel';
import enzyme from '../../services/test/enzymeWithProviders';
import { IconButton, FormControl, Input } from 'material-ui';
import SortIcon from 'material-ui-icons/Sort';

const spy = jest.fn();
const PLACEHOLDER_TEXT = 'placeholder text';

describe(`${Panel.name} component`, () => {
  const props = {
    sort: false,
    sortByVotes: spy,
    filterByText: spy,
    classes: {
      container: 'container',
      inner: 'inner',
      formControl: 'formControl',
      sortIcon: 'sortIcon',
      sortIconActive: 'sortIconActive'
    }
  }
  const context = {
    socket: {},
    intl: {
      formatMessage: () => PLACEHOLDER_TEXT
    }
  };
  const subject = enzyme.shallow(<Panel {... props} />, { context });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const container = subject.find(`div.${props.classes.container}`);

    expect(container).toHaveLength(1);
    expect(container.prop('open')).toBe(props.open);
  });

  it('renders sort icon', () => {
    const sortButton = subject.find(IconButton);
    const sortIcon = sortButton.find(SortIcon);

    expect(sortButton).toHaveLength(1);
    expect(sortButton.prop('onClick')).toEqual(expect.any(Function));
    expect(sortIcon).toHaveLength(1);
    expect(sortIcon.prop('className')).toBe(props.classes.sortIcon);
  });

  it('renders filter input', () => {
    const inputContainer = subject.find(FormControl);
    const input = inputContainer.find(Input);

    expect(inputContainer).toHaveLength(1);
    expect(inputContainer.prop('className')).toBe(props.classes.formControl);
    expect(input).toHaveLength(1);
    expect(input.prop('onChange')).toEqual(expect.any(Function));
    expect(input.prop('placeholder')).toBe(PLACEHOLDER_TEXT);
  });

  it('click on sort button calls sortByVotes', () => {
    const sortButton = subject.find(IconButton);

    expect(props.sortByVotes).not.toBeCalled();
    sortButton.simulate('click');
    expect(props.sortByVotes).toHaveBeenCalledTimes(1);
  });

  it(`type on filter input less than ${FILTER_MIN_LENGTH} chars should calls filterByText with no param`, () => {
    const input = subject.find(Input);
    const value = '#';

    expect(props.filterByText).not.toBeCalled();
    input.simulate('change', { target: { value } });
    expect(props.filterByText).toHaveBeenCalledTimes(1);
    expect(props.filterByText).toHaveBeenLastCalledWith();
  });

  it(`type on filter input min. ${FILTER_MIN_LENGTH} chars should calls filterByText with param`, () => {
    const input = subject.find(Input);
    const value = '#'.repeat(FILTER_MIN_LENGTH);

    expect(props.filterByText).not.toBeCalled();
    input.simulate('change', { target: { value } });
    expect(props.filterByText).toHaveBeenCalledTimes(1);
    expect(props.filterByText).toHaveBeenLastCalledWith(value);
  });
});
