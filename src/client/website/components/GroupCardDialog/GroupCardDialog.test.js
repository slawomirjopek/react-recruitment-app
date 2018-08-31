import React from 'react';
import GroupCardDialog from './GroupCardDialog';
import enzyme from '../../services/test/enzymeWithProviders';
import { Button } from 'material-ui';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';

const spy = jest.fn();

describe(`${GroupCardDialog.name} component`, () => {
  const props = {
    open: true,
    toGroup: {
      from: {
        id: 'id1',
        columnId: 'columnId1',
        text: 'text1'
      },
      to: {
        id: 'id2',
        columnId: 'columnId2',
        text: 'text2'
      }
    },
    closeDialog: spy,
    cardGroup: spy
  }
  const socket = {};
  const subject = enzyme.shallow(<GroupCardDialog {... props} />, { context: { socket }});
  const buttons = subject.find(Button);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(subject.find(Dialog)).toHaveLength(1);
    expect(subject.find(Dialog).prop('open')).toBe(props.open);
  });

  it('renders buttons', () => {
    expect(buttons).toHaveLength(2);
    expect(buttons.at(0).prop('color')).toBe('primary');
    expect(buttons.at(1).prop('color')).toBe('primary');
    expect(buttons.at(0).prop('onClick')).toEqual(expect.any(Function));
    expect(buttons.at(1).prop('onClick')).toEqual(expect.any(Function));
  });

  it('calls closeDialog when cancel button is clicked', () => {
    expect(props.closeDialog).not.toBeCalled();
    buttons.at(0).simulate('click');
    expect(props.closeDialog).toHaveBeenCalledTimes(1);
  });

  it('calls closeDialog, cardGroup when cancel button is clicked', () => {
    expect(props.closeDialog).not.toBeCalled();
    expect(props.cardGroup).not.toBeCalled();
    buttons.at(1).simulate('click');
    expect(props.closeDialog).toHaveBeenCalledTimes(1);
    expect(props.cardGroup).toHaveBeenCalledTimes(1);
    expect(props.cardGroup).toHaveBeenLastCalledWith(socket, props.toGroup);
  });
});
