export const TOGGLE_FILTER = 'qgo/assessment/TOGGLE_FILTER';

const toggleFilter = filter => {
  return { type: TOGGLE_FILTER, filter };
};

export const actionCreators = {
  toggleFilter
};

export const selectFilters = ({ filters }) => 
  Object.keys(filters).filter(el => filters[el] === true);

export const initialState = {
  hideCompleted: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      const { filter } = action; 
      return {
        ...state,
        [filter]: !state[filter]
      }
    default:
      return state;
  }
}

export default reducer;
