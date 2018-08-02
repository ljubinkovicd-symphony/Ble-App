import React from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { IPeripheral } from "../models";

interface Props {
  item: IPeripheral;
  index: number;
  onPressItem: (index: number) => void;
}
interface State {}

class ResultItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  render() {
    const peripheral = this.props.item;

    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#dddddd">
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Device Name: {peripheral.name}
          </Text>
          <Text>{peripheral.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ResultItem;
