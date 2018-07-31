import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  onPress?: () => void
}
interface State {}

class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { buttonStyle, textStyle } = styles;

    return (
      <TouchableOpacity onPress={this.props.onPress} style={buttonStyle}>
        <Text style={textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create ({
  buttonStyle: {
    flex: 1, // expand to fill as much content as it can.
    alignSelf: 'stretch',
    backgroundColor: '#007aff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
});

export { Button };
