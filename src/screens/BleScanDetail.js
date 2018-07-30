import React from 'react';
import BleManager from 'react-native-ble-manager';
import { Alert, View, NativeModules, NativeEventEmitter } from 'react-native';
import { CardSection, Button } from '../common';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BATTERY_LEVEL_CHARACTERISTIC = '2A19';
const CONNECT_BLE_EVENT = 'BleManagerConnectPeripheral';
const DISCONNECT_BLE_EVENT = 'BleManagerDisconnectPeripheral';

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
    this.handleConnectPeripheral = bleManagerEmitter.addListener(
      CONNECT_BLE_EVENT,
      this.handleConnectPeripheral
    );

    this.handleDisconnectPeripheral = bleManagerEmitter.addListener(
      DISCONNECT_BLE_EVENT,
      this.handleDisconnectPeripheral
    );
  }

  componentWillUnmount() {
    this.handleConnectPeripheral.remove();
    this.handleDisconnectPeripheral.remove();
  }

  startConnect = () => {
    const prphId = this.props.thePeripheral.id.toString();

    BleManager.connect(prphId)
      .then(() => {
        // Success code
        this.setState({ isConnected: true });
      })
      .catch(error => {
        // Failure code
        this.displayAlert('Error:', `${error}%`);
      });
  };

  startRead = () => {
    const { characteristics } = this.state;
    const prphId = this.props.thePeripheral.id.toString();

    const characteristicObjectsList = Array.from(characteristics.values());

    for (const charObj of characteristicObjectsList) {
      if (charObj.properties.includes('Read')) {
        this.readCharacteristics(prphId, charObj.service, charObj.characteristic);
      }
    }
  };

  readCharacteristics(peripheralId, serviceUUID, characteristicUUID) {
    BleManager.read(peripheralId, serviceUUID, characteristicUUID)
      .then(readData => {
        // Success code
        if (characteristicUUID === BATTERY_LEVEL_CHARACTERISTIC) {
          const prphName = this.props.thePeripheral.name.toString();
          this.displayAlert(`${prphName}'s battery level:`, `${readData}%`);
        }
      })
      .catch(error => {
        // Failure code
        this.displayAlert('Error:', `${error}%`);
      });
  }

  startDisconnect = () => {
    const prphName = this.props.thePeripheral.name.toString();
    const prphId = this.props.thePeripheral.id.toString();
    BleManager.disconnect(prphId)
      .then(() => {
        // Success code
        this.setState({ isConnected: false });
      })
      .catch(error => {
        // Failure code
        this.displayAlert('Error:', `${error}%`);
      });
  };

  handleConnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    BleManager.isPeripheralConnected(prphId, []).then(isConnected => {
      if (isConnected) {
        BleManager.retrieveServices(prphId).then(peripheralInfo => {
          // Success code
          this.setState({ characteristics: peripheralInfo.characteristics });
        });
      } else {
        // device is NOT connected
      }
    });
  }

  handleDisconnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    BleManager.isPeripheralConnected(prphId, []).then(isConnected => {
      if (isConnected) {
        // device is connected
      } else {
        // device is NOT connected
      }
    });
  }

  displayAlert(title, message) {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
      cancelable: false
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
    const peripheralName = this.props.thePeripheral.name;
    const { containerStyle } = styles;

    return (
      <View style={containerStyle}>
        <CardSection>
          <Button onPress={this.startConnect}>Pair with {peripheralName}</Button>
        </CardSection>

        <CardSection>{this.renderReadButton()}</CardSection>
        <CardSection>{this.renderDisconnectButton()}</CardSection>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default BleScanDetail;
