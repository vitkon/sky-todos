import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators } from '../../logic/filters';
import './styles.css';

export const ItemsFilter = ({ toggleCompletedFilter }) => (
  <div>
      <label>
          <input
              type="checkbox"
              className="filter"
              name="filter"
              onClick={toggleCompletedFilter}
          />
          Hide completed items
      </label>
  </div>
);

ItemsFilter.propTypes = {
  toggleCompletedFilter: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
  toggleCompletedFilter: () => dispatch(actionCreators.toggleFilter('hideCompleted'))
});

export default connect(null, mapDispatchToProps)(ItemsFilter);
