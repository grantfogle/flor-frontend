import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { loadFlowers } from './actions/index';
import Router from './Router';
import store from './store';

store.dispatch(loadFlowers());


class App extends Component {
  render() {
    return (
      //Add provider tag - context api
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;