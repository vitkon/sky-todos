import deepFreeze from 'deep-freeze';
import reducer, { initialState, actionCreators, ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM } from '../todos';

const mockState = {
  filters: {},
  items: [
    { id: 1, content: 'first' },
    { id: 2, content: 'second' },
  ]
}

const state = deepFreeze(reducer(mockState, { type: 'INIT'}));

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const mockAction = actionCreators.addItem('third');
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
  });

  it('should remove item on REMOVE_ITEM', () => {
    const mockAction = actionCreators.removeItem(1);
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toEqual(2);
    expect(result.items[0].content).toEqual('second');
  });

  it('should toggle item on TOGGLE_ITEM', () => {
    const mockAction = actionCreators.toggleItem(1);
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toEqual(1);
    expect(result.items[0].content).toEqual('first');
    expect(result.items[0].isCompleted).toBe(true);
  });
});

describe('actions', () => {
  it('should dispatch a correct ADD_ITEM action', () => {
    const expectedAction = { type: ADD_ITEM, content: 'foo' };
    const result = actionCreators.addItem('foo');
    expect(result).toEqual(expectedAction);
  });

  it('should dispatch a correct REMOVE_ITEM action', () => {
    const expectedAction = { type: REMOVE_ITEM, id: 123 };
    const result = actionCreators.removeItem(123);
    expect(result).toEqual(expectedAction);
  });
});