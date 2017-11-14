import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators, selectItems } from "../../logic/todos";
import './styles.css';

export const ItemsList = ({ items, onRemove, onToggle }) => (
  <div>
    <ul className="itemsList-ul">
      {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
      {items.map(item => <li key={item.id} className={item.done ? 'is-done' : '' }>
        <span>
          <input type="checkbox" name={`todo-${item.id}`} onClick={() => onToggle(item.id)} />
          {item.content}
        </span>
        <button className="close-icon" onClick={() => onRemove(item.id)}>
          <span className="sr-only">Remove item</span>
        </button>
      </li>)}
    </ul>
  </div>
);

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export const mapStateToProps = state => {
  return { items: selectItems(state) };
};

export const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(actionCreators.removeItem(id)),
  onToggle: id => dispatch(actionCreators.toggleItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
