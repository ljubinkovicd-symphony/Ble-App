import React from 'react';
import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import { View, NativeModules, NativeEventEmitter } from 'react-native';
import { CardSection, Button } from '../common';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const BleScanDetail = ({ thePeripheral }) => {
class BleScanDetail extends React.Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      characteristics: new Map()
    };

    this.handleConnectPeripheral = this.handleConnectPeripheral.bind(this);
    this.handleDisconnectPeripheral = this.handleDisconnectPeripheral.bind(this);
  }

  componentDidMount() {
    console.log('BLE_SCAN_DETAIL: componentDidMount');

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

  startRead = () => {
    const { characteristics } = this.state;
    const prphId = this.props.thePeripheral.id.toString();

    const characteristicObjectsList = Array.from(characteristics.values());
    // console.log(JSON.stringify(characteristicObjectsList));

    for (const charObj of characteristicObjectsList) {
      // console.log(`charObj: ${JSON.stringify(charObj)}`);

      if (charObj.properties.includes('Read')) {
        console.log('Inside characteristic which includes Read');
        this.readCharacteristics(prphId, charObj.service, charObj.characteristic);
      }
    }
  };

  readCharacteristics(peripheralId, serviceUUID, characteristicUUID) {
    BleManager.read(peripheralId, serviceUUID, characteristicUUID)
      .then(readData => {
        // Success code
        console.log(`Read: ${readData}`);

        const buffer = Buffer.from(readData); // https://github.com/feross/buffer#convert-arraybuffer-to-buffer
        const sensorData = buffer.readUInt8(1, true);

        console.log(`sensorData: ${sensorData}`);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

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

          this.setState({ characteristics: peripheralInfo.characteristics });
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

  renderReadButton() {
    if (this.state.isConnected) {
      const prphName = this.props.thePeripheral.name.toString();
      return <Button onPress={this.startRead}>Read from {prphName}</Button>;
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

        <CardSection>{this.renderReadButton()}</CardSection>
        <CardSection>{this.renderDisconnectButton()}</CardSection>
      </View>
    );
  }
}

export default BleScanDetail;
