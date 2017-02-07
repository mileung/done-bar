import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Dimensions,
  Platform
} from 'react-native';
import TextInputState from 'react-native/lib/TextInputState';

class DoneBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: Dimensions.get('window').width,
      // opacity: new Animated.Value(0),
      bottom: -81
    };

    if (!Keyboard.dismiss) {
      Keyboard.dismiss = () => TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
    }

    this.duration = 250;
    const config = {
      duration: this.duration,
      update: {
        duration: this.duration,
        type: LayoutAnimation.Types.keyboard
      }
    };

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', ({ endCoordinates }) => {
      if (this.props.keyboardType !== 'numeric') {
        return null;
      }
      let { height, width } = endCoordinates;
      this.props.includeLayoutAnimation ? LayoutAnimation.configureNext(config) : null;
      // this.props.fade ? this.changeOpacity(1) : null;
      this.setState({
        width,
        bottom: height - 40
      });
    });
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', ({ endCoordinates }) => {
      if (this.props.keyboardType !== 'numeric') {
        return null;
      }
      this.props.includeLayoutAnimation ? LayoutAnimation.configureNext(config) : null;
      // this.props.fade ? this.changeOpacity(0) : null;
      this.setState({
        width: endCoordinates.width,
        bottom: -81
      });
    });
  }

  render() {
    if (Platform.OS !== 'ios' || this.props.keyboardType !== 'numeric') {
      console.log('returning null')
      return null;
    }

    let { bottom, width, opacity } = this.state;

    return (
      <Animated.View style={[{ bottom, width, opacity }, styles.barWrapper]}>
        <View
          style={styles.bar}
          >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Keyboard.dismiss();
            }}
            >
            <Text style={styles.done}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bar} />
      </Animated.View>
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  changeOpacity(toValue) {
    Animated.timing(this.state.opacity, {
      toValue,
      duration: this.duration
    }).start();
  }
}

DoneBar.propTypes = {
  // viewBehavior: React.PropTypes.string,
  keyboardType: React.PropTypes.string,
  includeLayoutAnimation: React.PropTypes.bool,
  text: React.PropTypes.string,
};

DoneBar.defaultProps = {
  // viewBehavior: 'padding',
  keyboardType: 'numeric',
  includeLayoutAnimation: true,
  text: 'Done',
};

const styles = StyleSheet.create({
  barWrapper: {
    borderTopWidth: 1,
    backgroundColor: '#F6F8F9',
    borderColor: '#E5E5E5',
    position: 'absolute'
  },
  bar: {
    height: 40,
    alignItems: 'flex-end'
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
