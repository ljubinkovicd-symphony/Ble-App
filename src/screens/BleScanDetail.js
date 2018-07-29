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

    this.state = {
      isConnected: false
    };

    this.handleConnectPeripheral = this.handleConnectPeripheral.bind(this);
    this.handleDisconnectPeripheral = this.handleDisconnectPeripheral.bind(this);
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

    this.handleDisconnectPeripheral = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectPeripheral
    );
  }

  componentWillUnmount() {
    this.handleConnectPeripheral.remove();
    this.handleDisconnectPeripheral.remove();
  }

  startConnect = () => {
    const prphName = this.props.thePeripheral.name.toString();
    const prphId = this.props.thePeripheral.id.toString();
    BleManager.connect(prphId)
      .then(() => {
        // Success code
        console.log(`Connected with ${prphName}`);
        this.setState({ isConnected: true });
      })
      .catch(error => {
        // Failure code
        console.log(`BLE Error: ${error}`);
      });
  };

  startDisconnect = () => {
    const prphName = this.props.thePeripheral.name.toString();
    const prphId = this.props.thePeripheral.id.toString();
    BleManager.disconnect(prphId)
      .then(() => {
        // Success code
        console.log(`Disconnected from ${prphName}`);
        this.setState({ isConnected: false });
      })
      .catch(error => {
        // Failure code
        console.log(`BLE Error: ${error}`);
      });
  };

  handleConnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    const prphName = this.props.thePeripheral.name.toString();
    BleManager.isPeripheralConnected(prphId, []).then(isConnected => {
      if (isConnected) {
        console.log(`Peripheral ${prphName} is connected!`);

        BleManager.retrieveServices(prphId).then(peripheralInfo => {
          // Success code
          console.log('Peripheral info:', peripheralInfo);
        });
      } else {
        console.log('Peripheral is NOT connected!');
      }
    });
  }

  handleDisconnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    const prphName = this.props.thePeripheral.name.toString();
    BleManager.isPeripheralConnected(prphId, []).then(isConnected => {
      if (isConnected) {
        console.log(`Peripheral ${prphName} is connected!`);
      } else {
        console.log(`Peripheral ${prphName} is NOT connected!`);
      }
    });
  }

  renderDisconnectButton() {
    if (this.state.isConnected) {
      const prphName = this.props.thePeripheral.name.toString();
      return <Button onPress={this.startDisconnect}>Disconnect from {prphName}</Button>;
    }
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
          <Button onPress={this.startConnect}>Pair with {peripheralName}</Button>
        </CardSection>

        <CardSection>{this.renderDisconnectButton()}</CardSection>
      </View>
    );
  }
}

export default BleScanDetail;
