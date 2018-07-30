import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

interface Props {
  item: any,
  index: number,
  onPressItem: (index: number) => void
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
    const peripheralId = peripheral.id;
    const peripheralName = peripheral.name;

    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#dddddd">
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            Peripheral Name: {peripheralName}
          </Text>
          <Text>{peripheralId}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ResultItem;
