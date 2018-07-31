import React from "react";
import BleManager from "react-native-ble-manager";
import { Alert, View, NativeModules, NativeEventEmitter } from "react-native";
import { CardSection, Button } from "../common";
import { IPeripheral, ICharacteristic } from "../models";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BATTERY_LEVEL_CHARACTERISTIC = "2A19";
const CONNECT_BLE_EVENT = "BleManagerConnectPeripheral";
const DISCONNECT_BLE_EVENT = "BleManagerDisconnectPeripheral";

interface Props {
  thePeripheral: IPeripheral;
}

interface State {
  isConnected: boolean;
  characteristics: ICharacteristic[];
}

class BleScanDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isConnected: false,
      characteristics: []
    };

    this.handleConnectPeripheral = this.handleConnectPeripheral.bind(this);
    this.handleDisconnectPeripheral = this.handleDisconnectPeripheral.bind(
      this
    );
  }

  componentDidMount() {
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
    bleManagerEmitter.removeListener(
      CONNECT_BLE_EVENT,
      this.handleConnectPeripheral
    );
    bleManagerEmitter.removeListener(
      DISCONNECT_BLE_EVENT,
      this.handleDisconnectPeripheral
    );
  }

  startConnect = () => {
    const prphId = this.props.thePeripheral.id;
    BleManager.connect(prphId)
      .then(() => {
        // Success code
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

    for (const charObj of characteristicObjectsList) {
      if (charObj.properties.includes("Read")) {
        this.readCharacteristics(
          prphId,
          charObj.service,
          charObj.characteristic
        );
      }
    }
  };

  readCharacteristics(
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string
  ) {
    BleManager.read(peripheralId, serviceUUID, characteristicUUID)
      .then((readData: any) => {
        // Success code
        if (characteristicUUID === BATTERY_LEVEL_CHARACTERISTIC) {
          const prphName = this.props.thePeripheral.name.toString();
          Alert.alert(
            `${prphName}'s battery level:`,
            `${readData}%`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
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
    const prphId = this.props.thePeripheral.id.toString();
    BleManager.disconnect(prphId)
      .then(() => {
        // Success code
        this.setState({ isConnected: false });
      })
      .catch((error: string) => {
        // Failure code
        console.log(`BLE Error: ${error}`);
      });
  };

  handleConnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    BleManager.isPeripheralConnected(prphId, []).then(
      (isConnected: boolean) => {
        if (isConnected) {
          BleManager.retrieveServices(prphId).then((peripheralInfo: any) => {
            // Success code
            this.setState({ characteristics: peripheralInfo.characteristics });
          });
        } else {
          console.log("Peripheral is NOT connected!");
        }
      }
    );
  }

  handleDisconnectPeripheral() {
    const prphId = this.props.thePeripheral.id.toString();
    const prphName = this.props.thePeripheral.name.toString();
    BleManager.isPeripheralConnected(prphId, []).then(
      (isConnected: boolean) => {
        if (isConnected) {
          console.log(`Peripheral ${prphName} is connected!`);
        } else {
          console.log(`Peripheral ${prphName} is NOT connected!`);
        }
      }
    );
  }

  renderDisconnectButton() {
    if (this.state.isConnected) {
      const prphName = this.props.thePeripheral.name.toString();
      return (
        <Button onPress={this.startDisconnect}>
          Disconnect from {prphName}
        </Button>
      );
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

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CardSection>
          <Button onPress={this.startConnect}>
            Pair with {peripheralName}
          </Button>
        </CardSection>

        <CardSection>{this.renderReadButton()}</CardSection>
        <CardSection>{this.renderDisconnectButton()}</CardSection>
      </View>
    );
  }
}

export default BleScanDetail;
