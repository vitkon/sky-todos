import React from 'react';
import { shallow } from 'enzyme';
import { actionCreators } from '../../../logic/filters';
import { ItemsFilter, mapDispatchToProps } from '../index';

const defaultProps = {
    toggleCompletedFilter: () => {}
};

describe('ItemsFilter', () => {
  it('renders without crashing', () => {
    shallow(<ItemsFilter {...defaultProps} />);
  });


  it('should map dispatch to props', () => {
    const dispatchSpy = jest.fn();
    const { toggleCompletedFilter } = mapDispatchToProps(dispatchSpy);
    const expectedAction1 = actionCreators.toggleFilter('hideCompleted');
    toggleCompletedFilter();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction1);
  });
});