import React, { Component } from "react";
import { NavigatorIOS, FlatList } from "react-native";
import ResultItem from "./ResultItem";
import BleScanDetail from "../screens/BleScanDetail";
import { IPeripheral } from "../models";

interface Props {
  peripherals: Array<IPeripheral>;
  navigator: NavigatorIOS;
}
interface State {}

class Results extends Component<Props, State> {
  _keyExtractor = (item: IPeripheral, index: number) => index.toString();

  _renderItem = (info: { item: IPeripheral; index: number }): JSX.Element => (
    <ResultItem
      item={info.item}
      index={info.index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (index: number) => {
    this.props.navigator.push({
      title: "PeripheralDetail",
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
