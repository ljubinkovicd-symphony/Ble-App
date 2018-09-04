import React, { Component } from "react";
import { FlatList } from "react-native";
import ResultItem from "../components/BleScanItem";
import BleScanDetail from "./BleScanDetail";
import { IPeripheral } from "../models";
import { Navigation } from "react-native-navigation";
import { DETAIL_SCREEN } from ".";

interface Props {
  peripherals: IPeripheral[];
  componentId: string;
}

class BleScanResults extends Component<Props> {
  constructor(props: Props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  _keyExtractor = (item: IPeripheral, index: number) => index.toString();

  _renderItem = (info: { item: IPeripheral; index: number }): JSX.Element => (
    <ResultItem
      item={info.item}
      index={info.index}
      onPressItem={this._onPressItem}
    />
  );

  pushPeripheralDetailScreen(selectedPeripheral: IPeripheral) {
    Navigation.push(this.props.componentId, {
      component: {
        name: DETAIL_SCREEN,
        passProps: {
          thePeripheral: selectedPeripheral
        },
        options: {
          topBar: {
            title: {
              text: `${selectedPeripheral.name}`
            }
          }
        }
      }
    });
  }

  _onPressItem = (index: number) => {
    this.pushPeripheralDetailScreen(this.props.peripherals[index]);
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

export default BleScanResults;
