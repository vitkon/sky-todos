import { combineReducers } from 'redux';
import todosReducer from '../logic/todos';
import filtersReducer from '../logic/filters';

export default function createReducer() {
  return combineReducers({
    filters: filtersReducer,
    todos: todosReducer
  });
}
