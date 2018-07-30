import React from 'react';
import BleManager from 'react-native-ble-manager';
import { Alert, View, NativeModules, NativeEventEmitter } from 'react-native';
import { CardSection, Button } from '../common';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BATTERY_LEVEL_CHARACTERISTIC = '2A19';
const CONNECT_BLE_EVENT = 'BleManagerConnectPeripheral';
const DISCONNECT_BLE_EVENT = 'BleManagerDisconnectPeripheral';

export interface IPeripheral {
  id: string,
  name: string
}

export interface ICharacteristic {
  service: string,
  characteristic: string,
  isNotifying: boolean,
  properties: [string]
}

interface Props {
  thePeripheral: IPeripheral
}

interface State {
  isConnected: boolean,
  characteristics: ICharacteristic[],
  readDataMap: {}
}

// const BleScanDetail = ({ thePeripheral }) => {
class BleScanDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isConnected: false,
      characteristics: [],
      readDataMap: {}
    };

    this.handleConnectPeripheral = this.handleConnectPeripheral.bind(this);
    this.handleDisconnectPeripheral = this.handleDisconnectPeripheral.bind(this);
  }

  componentDidMount() {
    console.log('BLE_SCAN_DETAIL: componentDidMount');

    bleManagerEmitter.addListener(
      CONNECT_BLE_EVENT,
      this.handleConnectPeripheral
    );

    bleManagerEmitter.addListener(
      DISCONNECT_BLE_EVENT,
      this.handleDisconnectPeripheral
    );
  }

  componentWillUnmount() {
    bleManagerEmitter.removeListener('BleManagerConnectPeripheral', this.handleConnectPeripheral);
    bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', this.handleDisconnectPeripheral);
  }

  startConnect = () => {
    const prphName = this.props.thePeripheral.name;
    const prphId = this.props.thePeripheral.id;
    BleManager.connect(prphId)
      .then(() => {
        // Success code
        console.log(`Connected with ${prphName}`);
        this.setState({ isConnected: true });
      })
      .catch((error: Error) => {
        // Failure code
        console.log(`BLE Error: ${error}`);
      });
  };

  startRead = () => {
    const { characteristics } = this.state;
    const prphId = this.props.thePeripheral.id;

    const characteristicObjectsList = Array.from(characteristics.values());
    // console.log(JSON.stringify(characteristicObjectsList));

    for (const charObj of characteristicObjectsList) {
      // console.log(`charObj: ${JSON.stringify(charObj)}`);

      if (charObj.properties.includes('Read')) {
        this.readCharacteristics(prphId, charObj.service, charObj.characteristic);
      }
    }
  };

  readCharacteristics(peripheralId: string, serviceUUID: string, characteristicUUID: string) {
    BleManager.read(peripheralId, serviceUUID, characteristicUUID)
      .then((readData: any) => {
        // Success code
        console.log(`Reading characteristicUUID ${characteristicUUID}: ${readData}`);

        this.setState({ readDataMap: readData });
        console.log(`My map: ${this.state.readDataMap}`);

        if (characteristicUUID === BATTERY_LEVEL_CHARACTERISTIC) {
          console.log('Reading battery level...');
          const prphName = this.props.thePeripheral.name.toString();
          Alert.alert(
            `${prphName}'s battery level:`,
            `${readData}%`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
      })
      .catch((error: Error) => {
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
      .catch((error: string) => {
        // Failure code
        console.log(`BLE Error: ${error}`);
      });
  };

  handleConnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    const prphName = this.props.thePeripheral.name.toString();
    BleManager.isPeripheralConnected(prphId, []).then(((isConnected: boolean) => {
      if (isConnected) {
        console.log(`Peripheral ${prphName} is connected!`);

        BleManager.retrieveServices(prphId).then((peripheralInfo: any) => {
          // Success code
          console.log('Peripheral info:', peripheralInfo);

          this.setState({ characteristics: peripheralInfo.characteristics });
        });
      } else {
        console.log('Peripheral is NOT connected!');
      }
    }));
  }

  handleDisconnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    const prphName = this.props.thePeripheral.name.toString();
    BleManager.isPeripheralConnected(prphId, []).then((isConnected: boolean) => {
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
