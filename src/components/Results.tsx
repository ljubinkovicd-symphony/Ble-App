import React, { Component } from 'react';
import { NavigatorIOS, FlatList } from 'react-native';
import ResultItem from './ResultItem';
import BleScanDetail from '../screens/BleScanDetail';

interface Props {
  peripherals: [any],
  navigator: NavigatorIOS
}
interface State {}

class Results extends Component<Props, State> {
  _keyExtractor = (item: any, index: number) => index.toString();

  _renderItem = (item: any): JSX.Element => (
    <ResultItem item={item} index={item.index} onPressItem={this._onPressItem} />
  );

  _onPressItem = (index: number) => {
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
