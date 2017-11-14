import React from 'react';
import { shallow } from 'enzyme';
import { actionCreators } from '../../../logic/todos';
import { ItemsList, mapDispatchToProps, mapStateToProps } from '../index';

const defaultProps = {
  items: [],
  onRemove: () => {}
};

describe.only('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should handle remove item click', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const mockCallBack = jest.fn();
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} onRemove={mockCallBack} />);
    renderedItem.find('.close-icon').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should map dispatch to props', () => {
    const dispatchSpy = jest.fn();
    const id = 123;
    const { onRemove } = mapDispatchToProps(dispatchSpy);
    const expectedAction = actionCreators.removeItem(id);
    onRemove(id);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should map state to props', () => {
    const state = { todos: { items: [1, 2, 3]} };
    const mappedState = mapStateToProps(state);
    const expectedState = { items: [1, 2, 3] }
    expect(mappedState).toEqual(expectedState);
  });
});
