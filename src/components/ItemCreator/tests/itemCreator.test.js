import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemCreator, mapDispatchToProps } from '../index';
import { actionCreators } from '../../../logic/todos';

const defaultProps = {
  onAdd: f => f,
};

describe('ItemCreator', () => {
  it('renders without crashing', () => {
    shallow(<ItemCreator {...defaultProps} />);
  });

  it('should call onAdd with the input content', () => {
    const onAddMock = jest.fn();
    const renderedItem = mount(
      <ItemCreator {...defaultProps} onAdd={onAddMock} />
    );
    renderedItem.find('.itemCreator-input').node.value = 'New Test Item';
    renderedItem.find('.itemCreator-button').simulate('click');
    expect(onAddMock.mock.calls.length).toBe(1);
    expect(onAddMock.mock.calls[0][0]).toBe('New Test Item');
  });

  it('should clear the input onAdd', () => {
    const renderedItem = mount(<ItemCreator {...defaultProps} />);
    renderedItem.find('.itemCreator-input').node.value = 'New Test Item';
    renderedItem.find('.itemCreator-button').simulate('click');
    expect(renderedItem.find('.itemCreator-input').node.value).toEqual('');
  });

  it('should map dispatch to props', () => {
    const dispatchSpy = jest.fn();
    const item = {id: 1, value: 'test'};
    const { onAdd } = mapDispatchToProps(dispatchSpy);
    const expectedAction = actionCreators.addItem(item);
    onAdd(item);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
