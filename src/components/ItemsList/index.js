import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators, selectItems } from '../../logic/todos';
import { selectFilters } from '../../logic/filters';
import './styles.css';

export const ItemsList = ({ items, filters, onRemove, onToggle }) => {
  const filteredItems = () => {
    if (filters.includes('hideCompleted')) {
      return items.filter(item => item.isCompleted !== true);
    }

    return items;
  };

  return (
    <div>
      <ul className="itemsList-ul">
        {filteredItems().length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {filteredItems().map(item => <li key={item.id} className={item.isCompleted ? 'is-completed' : '' }>
          <span>
            <input
              type="checkbox"
              name={`todo-${item.id}`}
              onClick={() => onToggle(item.id)}
              defaultChecked={!!item.isCompleted}
            />
            {item.content}
          </span>
          <button className="close-icon" onClick={() => onRemove(item.id)}>
            <span className="sr-only">Remove item</span>
          </button>
        </li>)}
      </ul>
    </div>
  );
}

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  filters: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export const mapStateToProps = state => {
  return {
    items: selectItems(state),
    filters: selectFilters(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(actionCreators.removeItem(id)),
  onToggle: id => dispatch(actionCreators.toggleItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
