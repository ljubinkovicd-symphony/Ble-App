import React from 'react';
import BleManager from 'react-native-ble-manager';
import { View, NativeModules, NativeEventEmitter } from 'react-native';
import { CardSection, Button } from '../common';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const BleScanDetail = ({ thePeripheral }) => {
class BleScanDetail extends React.Component<{}> {
  constructor(props) {
    super(props);

    this.handleConnectPeripheral = this.handleConnectPeripheral.bind(this);
  }

  componentDidMount() {
    console.log('BLE_SCAN_DETAIL: componentDidMount');

    // BleManager.start({ showAlert: false }).then(() => {
    //   // Success code
    //   console.log('Module initialized');
    // });

    this.handleConnectPeripheral = bleManagerEmitter.addListener(
      'BleManagerConnectPeripheral',
      this.handleConnectPeripheral
    );
  }

  componentWillUnmount() {
    this.handleConnectPeripheral.remove();
  }

  handleConnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    const prphName = this.props.thePeripheral.name.toString();
    console.log(`Trying to connect with ${this.props.thePeripheral.id}`);
    BleManager.connect(prphId)
      .then(() => {
        // Success code
        console.log(`Connected with ${prphName}`);
      })
      .catch(error => {
        // Failure code
        console.log(`BLE Error: ${error}`);
      });
  }

  render() {
    const myPeripheral = JSON.stringify(this.props.thePeripheral);

    console.log(`Peripheral object: \n${myPeripheral}`);

    const peripheralName = this.props.thePeripheral.name;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CardSection>
          <Button onPress={this.handleConnectPeripheral}>Pair with {peripheralName}</Button>
        </CardSection>
      </View>
    );
  }
}

export default BleScanDetail;
