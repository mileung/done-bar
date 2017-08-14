# done-bar

[![NPM](https://nodei.co/npm/done-bar.png?downloads=true)](https://www.npmjs.com/package/done-bar)

A React Native component that dismisses the keyboard.  Especially useful for the iOS numeric keyboard as there is no return or done button by default.  Works in both landscape and portrait orientations.

![](https://media.giphy.com/media/xT39DdG9kXnvxsEVPy/giphy.gif)

### Install

`npm install --save done-bar`

### Import

`import DoneBar from 'done-bar';`

### Usage
1. make sure the parent of DoneBar extends all the way to the bottom of the screen.  Else DoneBar could possibly appear on the screen when the keyboard isn't visible.
2. make sure to have a local (or redux) state to pass to DoneBar that indicates the type of keyboard currently being displayed.  In order for DoneBar to display, the keyboardType prop passed to it must be numeric or blank (numeric by default)
3. make sure your TextInputs set their keyboard type in state on their focus

### Example
```javascript
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
```

### Props

```javascript
static propTypes = {
  keyboardType: PropTypes.string,
  includeLayoutAnimation: PropTypes.bool, // set to false if you get a warning saying there are simultaneous LayoutAnimations
  text: PropTypes.string,
  onDone: PropTypes.func
}

static defaultProps = {
  keyboardType: 'numeric',
  includeLayoutAnimation: true,
  text: 'Done',
  onDone: () => {}
}
```
