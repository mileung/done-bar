# done-bar

[![NPM](https://nodei.co/npm/done-bar.png?downloads=true)](https://www.npmjs.com/package/done-bar)

A React Native component that dismisses any the keyboard.  Especially useful for the iOS numeric keyboard as there is no return or done button by default.

![](https://media.giphy.com/media/l0MYsBvyAwkfATeBG/giphy.gif)

### Installation

`npm install --save done-bar`

### Importation

`import DoneBar from 'done-bar';`

### Usagation
1. make sure the parent of DoneBar extends all the way to the bottom of the screen.  Else DoneBar could possibly appear on the screen when the keyboard isn't visible.
2. make sure to have a local (or redux) state to pass to DoneBar that indicates the type of keyboard currently being displayed.  In order for DoneBar to display, the keyboardType prop passed to it must be numeric or blank (numeric by default)
3. make sure your TextInputs set their keyboard type in state on their focus

### Examplelation
```javascript
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardType: 'default' // this is important
    };
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding" // this is important; currently only works when behavior is padding
        >
        <TextInput
          keyboardType="default"
          onFocus={() => this.setState({ keyboardType: 'default' })} // these are important
          style={styles.input}
        />
        <TextInput
          keyboardType="numeric"
          onFocus={() => this.setState({ keyboardType: 'numeric' })} // these are important
          style={styles.input}
        />
        <DoneBar
          keyboardType={this.state.keyboardType} // this is important
        />
      </KeyboardAvoidingView>
    );
  }
}
```

### Props
keyboardType: String ('numeric' by default)
