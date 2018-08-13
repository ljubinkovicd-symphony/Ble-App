import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {}
interface State {}

class CardSection extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { containerStyle } = styles

    return <View style={containerStyle}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create ({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#dddddd',
    position: 'relative'
  }
});

export { CardSection };
