import deepFreeze from 'deep-freeze';
import reducer, { initialState, TOGGLE_FILTER, actionCreators, selectFilters } from '../filters';

const mockState = {
  filters: {
    isImportant: true,
    isScheduled: false
  },
  todos: {
    items: []
  }
}

const state = deepFreeze(reducer(mockState, { type: 'INIT'}));

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(state, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should toggle filters on TOGGLE_FILTER', () => {
    const mockAction = actionCreators.toggleFilter('test');
    const state1 = reducer(state, mockAction);
    expect(state1.test).toBe(true);

    const state2 = reducer(state1, mockAction);
    expect(state2.test).toBe(false);
  });
});

describe('actions', () => {
  it('should dispatch a correct TOGGLE_FILTER action', () => {
    const expectedAction = { type: TOGGLE_FILTER, filter: 'foo' };
    const result = actionCreators.toggleFilter('foo');
    expect(result).toEqual(expectedAction);
  });
});

describe('selectors', () => {
  it('should select enabled filters', () => {
    const result = selectFilters(state);
    expect(result).toEqual(['isImportant']);
  });
});