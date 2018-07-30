import React from 'react';
import { View } from 'react-native';

const CardSection = props => {
  const { containerStyle } = styles;

  return <View style={containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#dddddd',
    position: 'relative'
  }
};

export { CardSection };
