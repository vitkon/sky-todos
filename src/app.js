import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import Header from './components/Header';
import ItemCreator from './components/ItemCreator';
import ItemsList from './components/ItemsList';
import ItemsFilter from './components/ItemsFilter';
import './app.css';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Header />
          <div>
            <ItemCreator />
            <ItemsList />
            <ItemsFilter />
          </div>
        </div>
      </Provider>
    );
  }
}
