console.disableYellowBox = true;

import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput
} from 'react-native';

import DoneBar from '../index.js';

export default class Example extends React.Component {
  state = {
    keyboardType: 'default'
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={this.state.keyboardType === 'numeric' ? 40 : 0}
        >
        <TextInput
          placeholder="Default Keyboard"
          keyboardType="default"
          onFocus={() => this.setState({ keyboardType: 'default' })}
          style={styles.input}
        />
        <TextInput
          placeholder="Numeric Keyboard"
          keyboardType="numeric"
          onFocus={() => this.setState({ keyboardType: 'numeric' })}
          style={styles.input}
        />
        <DoneBar
          keyboardType={this.state.keyboardType}
          onDone={() => console.log('done!')}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff'
  },
  input: {
    color: '#333333',
    margin: 5,
    height: 50,
    borderRadius: 5,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#ccf0ff'
  }
});
