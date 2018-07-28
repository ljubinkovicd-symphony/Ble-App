import React from 'react';
import { Text, View } from 'react-native';

// const BleScanDetail = ({ thePeripheral }) => {
class BleScanDetail extends React.Component<{}> {
  componentDidMount() {
    console.log('BLE_SCAN_DETAIL: componentDidMount');
  }

  render() {
    const myPeripheral = JSON.stringify(this.props.thePeripheral);

    console.log(`Peripheral object: \n${myPeripheral}`);

    return (
      <View style={{ marginTop: 150 }}>
        <Text>{myPeripheral}</Text>
        <Text>{myPeripheral}</Text>
      </View>
    );
  }
}

export default BleScanDetail;
