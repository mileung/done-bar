# done-bar
A React Native component that dismisses any the keyboard.  Especially useful for the iOS numeric keyboard as there is no return or done button by default.

![](https://media.giphy.com/media/l0MYsBvyAwkfATeBG/giphy.gif)

### Installation

`npm install --save done-bar`

### Importation

`import DoneBar from 'done-bar';`

### Usagation
2. make sure the DoneBar component is the last child in your wrapping root component
3. make sure to have a local (or redux) state to pass to DoneBar that indicates the type of keyboard currently being displayed.  In order for DoneBar to display, the keyboardType prop passed to it must be numeric or blank (numeric by default)
4. make sure your TextInputs set the proper keyboard type on their focus

#### Examplelation
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
        behavior="padding"
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
