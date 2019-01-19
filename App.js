import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './Router';
import Welcome from './components/Welcome';
import Camer from './components/Camera';

export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Welcome />
      // </View>
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
