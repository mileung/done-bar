import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  Animated,
  StyleSheet,
  Easing
} from 'react-native';

class DoneBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      keyboardWidth: 0,
      opacity: new Animated.Value(0),
      bottom: new Animated.Value(0)
    };
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      this.setState({keyboardVisible: false}, this.toggleBar);
    });
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      this.setState({keyboardVisible: true}, this.toggleBar);
    });
    this.keyboardDidChangeFrameListener = Keyboard.addListener('keyboardWillChangeFrame', ({ endCoordinates }) => {
      let { height, width } = endCoordinates;
      this.setState({
        keyboardHeight: height,
        keyboardWidth: width
      });
    });
  }

  render() {
    if (!this.state.keyboardVisible || this.props.keyboardType !== 'numeric') {
      return null;
    }

    let { bottom, opacity } = this.state;

    return (
      <Animated.View style={{ bottom, opacity, width: this.state.keyboardWidth, position: 'absolute' }}>
        <View
          style={styles.bar}
          >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Keyboard.dismiss();
              this.setState({keyboardVisible: false});
            }}
            >
            <Text style={styles.done}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bar} />
      </Animated.View>
    );
  }

  toggleBar() {
    let opacity = 0;
    let bottom = 0;
    if (this.state.keyboardVisible) {
      opacity = 1;
      bottom = this.state.keyboardHeight - 40;
    }
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: opacity,
        duration: 200
      }),
      Animated.timing(this.state.bottom, {
        toValue: bottom,
        easing: Easing.out(Easing.cubic),
        duration: 380
      })
    ]).start();
  }
}

DoneBar.propTypes = {
  KeyboardAvoidingViewBehavior: React.PropTypes.string,
  keyboardType: React.PropTypes.string
};

DoneBar.defaultProps = {
  KeyboardAvoidingViewBehavior: 'padding',
  keyboardType: 'numeric'
};

const styles = StyleSheet.create({
  bar: {
    height: 40,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    backgroundColor: '#F6F8F9',
    borderColor: '#E5E5E5'
  },
  button: {
    flex: 1,
    justifyContent: 'center'
  },
  done: {
    fontSize: 21,
    color: '#218BFE',
    fontWeight: '500',
    margin: 10
  }
});

export default DoneBar;
