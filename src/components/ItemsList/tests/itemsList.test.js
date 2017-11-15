import React from 'react';
import { shallow } from 'enzyme';
import { actionCreators } from '../../../logic/todos';
import { ItemsList, mapDispatchToProps, mapStateToProps } from '../index';

const defaultProps = {
  items: [],
  filters: [],
  onRemove: () => {},
  onToggle: () => {}
};

describe('ItemsList', () => {
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
    renderedItem.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should handle toggle checkbox click', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const mockCallBack = jest.fn();
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} onToggle={mockCallBack} />);
    renderedItem.find('input[type="checkbox"]').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should have is-completed class', () => {
    const items = [{ id: 1, content: 'Test 1', isCompleted: true }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    const list = renderedItem.find('li').simulate('click');
    expect(list.hasClass('is-completed')).toBe(true);
  });

  it('should hide completed items', () => {
    const items = [
      {id: 1, content: 'Test 1', isCompleted: true},
      {id: 2, content: 'Test 2', isCompleted: false},
      {id: 3, content: 'Test 3'}
    ];
    const filters = ['hideCompleted'];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} filters={filters} />);
    const list = renderedItem.find('li');
    expect(list.length).toBe(2);
  });

  it('should map dispatch to props', () => {
    const dispatchSpy = jest.fn();
    const id = 123;
    const { onRemove, onToggle } = mapDispatchToProps(dispatchSpy);
    const expectedAction1 = actionCreators.toggleItem(id);
    const expectedAction2 = actionCreators.removeItem(id);
    onToggle(id);
    onRemove(id);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction1);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction2);
  });

  it('should map state to props', () => {
    const state = { todos: { items: [1, 2, 3] }, filters: {} };
    const mappedState = mapStateToProps(state);
    const expectedState = { items: [1, 2, 3], filters: [] };
    expect(mappedState).toEqual(expectedState);
  });
});
