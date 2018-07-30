import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ResultItem from './ResultItem';
import BleScanDetail from '../screens/BleScanDetail';

class Results extends Component<{}> {
  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => (
    <ResultItem item={item} index={index} onPressItem={this._onPressItem} />
  );

  _onPressItem = index => {
    this.props.navigator.push({
      title: 'PeripheralDetail',
      component: BleScanDetail,
      passProps: { thePeripheral: this.props.peripherals[index] }
    });
  };

  render() {
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
