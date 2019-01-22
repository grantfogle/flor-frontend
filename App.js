import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './Router';

export default class App extends React.Component {
  render() {
    return (
      //Add provider tag - context api
      <Router />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
