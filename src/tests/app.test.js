import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import App from '../app';
import Header from '../components/Header';
import ItemCreator from '../components/ItemCreator';
import ItemsList from '../components/ItemsList';
import ItemsFilter from '../components/ItemsFilter';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should contain Provider', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Provider).length).toBe(1);
    expect(wrapper.find(Provider).props().store).toBeDefined();
  });

  it('should contain Header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('should contain ItemCreator', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ItemCreator).length).toBe(1);
  });

  it('should contain ItemsList', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ItemsList).length).toBe(1);
  });

  it('should contain ItemsFilter', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ItemsFilter).length).toBe(1);
  });
});
