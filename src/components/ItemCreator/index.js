import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators } from '../../logic/todos';
import './styles.css';

export const ItemCreator = ({ onAdd }) => {
  let inputField;

  const handleSubmit = (e) => {
    e.preventDefault();
    inputField.value && onAdd(inputField.value);
    inputField.value = '';
  }

  return (
    <form className="itemCreator" onSubmit={handleSubmit}>
      <input
        ref={input => {
          inputField = input;
        }}
        className="itemCreator-input"
        type="text"
        placeholder="What do you need to do?"
      />
      <input
        className="itemCreator-button"
        type="button"
        value="Add Task"
        onClick={handleSubmit}
      />
    </form>
  );
};

ItemCreator.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  onAdd: newItem => dispatch(actionCreators.addItem(newItem)),
});

export default connect(null, mapDispatchToProps)(ItemCreator);
