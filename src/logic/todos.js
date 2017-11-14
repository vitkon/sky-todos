export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const REMOVE_ITEM = 'qgo/assessment/REMOVE_ITEM';
export const TOGGLE_ITEM = 'qgo/assessment/TOGGLE_ITEM';

const addItem = content => {
  return { type: ADD_ITEM, content };
};

const removeItem = id => {
  return { type: REMOVE_ITEM, id };
};

const toggleItem = id => {
  return { type: TOGGLE_ITEM, id };
};

export const actionCreators = {
  addItem,
  removeItem,
  toggleItem
}

export const selectItems = state => state.todos.items;

export const initialState = {
  items: [
    { id: 1, content: 'Call mum' },
    { id: 2, content: 'Buy cat food' },
    { id: 3, content: 'Water the plants' },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
      case TOGGLE_ITEM:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== action.id) {
            return item;
          }
  
          return {
            ...item,
            done: !item.done
          };
        })
      }
    default:
      return state;
  }
};

export default reducer;
