import React, { Component } from 'react';
import { NavigatorIOS, View, TouchableHighlight, FlatList, Text } from 'react-native';
import ResultItem from './ResultItem';
import BleScanDetail from '../screens/BleScanDetail';

class Results extends Component<{}> {
  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => (
    <ResultItem item={item} index={index} onPressItem={this._onPressItem} />
  );

  _onPressItem = index => {
    const objString = JSON.stringify(this.props.peripherals[index]);
    console.log(`Peripheral selected: ${objString}`);
    console.log(`Kliknuo na celiju na ${index}. mestu.`);

    this.props.navigator.push({
      title: 'PeripheralDetail',
      component: BleScanDetail,
      passProps: { thePeripheral: this.props.peripherals[index] }
    });
  };

  render() {
    console.log(`IN RESULTS with peripherals: ${this.props.peripherals}`);

    return (
      <FlatList
        data={this.props.peripherals}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default Results;
