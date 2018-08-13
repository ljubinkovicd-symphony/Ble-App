import React from "react";
import BleManager from "react-native-ble-manager";
import { Alert, View, NativeModules, NativeEventEmitter } from "react-native";
import { CardSection, Button } from "../components/common";
import { IPeripheral, ICharacteristic } from "../models";
import {
  CONNECT_BLE_EVENT,
  DISCONNECT_BLE_EVENT,
  CADENCE_CASE_EVENT_CHARACTERISTIC,
  CADENCE_CASE_UUID,
  CADENCE_BLISTER_PACK_UUID,
  CADENCE_BLISTER_PACK_PLACED_REMOVED_EVENT,
  MANUFACTURER_NAME_CHARACTERISTIC
} from "../bleService/Constants";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

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
        console.log(`Connected to: ${prphId}`);
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

  startWrite = () => {
    const byteArrayDataToSend = this.unpack("Djole je car");

    console.log("My unpacked data: " + byteArrayDataToSend);

    const prphId = this.props.thePeripheral.id;

    BleManager.write(
      prphId,
      "A0DD7243-53AE-42F9-BF2B-5981D5C30EA6",
      "4DE63F41-3C3F-4A56-9875-A723BF4BE3A3",
      byteArrayDataToSend
    )
      .then(() => {
        // Success code
        console.log("Writing data: " + byteArrayDataToSend);
      })
      .catch((error: Error) => {
        // Failure code
        console.log(error);
      });
  };

  unpack(str: string): number[] {
    const bytes = [];

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      bytes.push(char >>> 8);
      bytes.push(char & 0xff);
    }

    return bytes;
  }

  readCharacteristics(
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string
  ) {
    BleManager.read(peripheralId, serviceUUID, characteristicUUID)
      .then((readData: any) => {
        console.log(`Reading characteristic: ${characteristicUUID}`);

        switch (characteristicUUID) {
          case "2A2B":
            Alert.alert(
              `${this.props.thePeripheral.name}'s battery level:`,
              `${readData}%`,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            return;
          case CADENCE_CASE_EVENT_CHARACTERISTIC:
            console.log("MY NUMBER IS: " + readData);
            Alert.alert(
              `${this.props.thePeripheral.name}'s case event:`,
              `${(readData as number) == 1 ? "Open" : "Closed"}`,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            return;
          case MANUFACTURER_NAME_CHARACTERISTIC:
            const binaryRepresentation = [];
            const characterRepresentation = [];

            for (let i = 0; i < readData.length; i++) {
              binaryRepresentation[i] = readData[i].toString(2);
              characterRepresentation[i] = this.binaryToString(
                binaryRepresentation[i]
              );
            }

            const reducer = (accumulator: string, currentValue: string) =>
              accumulator + currentValue;
            const manufacturerString = characterRepresentation.reduce(
              reducer,
              ""
            );

            // Manufacturer's string
            console.log("Reading manufacturer's string...");
            const prphName = this.props.thePeripheral.name.toString();
            Alert.alert(
              `${prphName}'s manufacturer name:`,
              `${manufacturerString}`,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            return;
          default:
            break;
        }
      })
      .catch((error: Error) => {
        // Failure code
        console.log(error);
      });
  }

  binaryToString(str: string) {
    const newBinary = str.split(" ");
    const binaryCode = [];
    for (let i = 0; i < newBinary.length; i++) {
      binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
    }
    return binaryCode.join("");
  }

  // need to call retrieveServices method before
  startSubscribe = () => {
    const prphId = this.props.thePeripheral.id.toString();

    BleManager.startNotification(
      prphId,
      CADENCE_CASE_UUID,
      CADENCE_CASE_EVENT_CHARACTERISTIC
    )
      .then(() => {
        // success code
        console.log("Cadence case notification started!");
      })
      .catch((error: Error) => {
        // failure code
        console.log(error);
      });

    BleManager.startNotification(
      prphId,
      CADENCE_BLISTER_PACK_UUID,
      CADENCE_BLISTER_PACK_PLACED_REMOVED_EVENT
    )
      .then(() => {
        // success code
        console.log("Cadence blister pack notification started!");
      })
      .catch((error: Error) => {
        // failure code
        console.log(error);
      });
  };

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
            console.log(
              `Here are the services from the peripheral:\n${JSON.stringify(
                peripheralInfo
              )}`
            );
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

  renderWriteButton() {
    if (this.state.isConnected) {
      const prphName = this.props.thePeripheral.name.toString();
      return <Button onPress={this.startWrite}>Write to {prphName}</Button>;
    }
  }

  renderSubscribeButton() {
    if (this.state.isConnected) {
      const prphName = this.props.thePeripheral.name.toString();
      return (
        <Button onPress={this.startSubscribe}>Subscribe to {prphName}</Button>
      );
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
        <CardSection>{this.renderWriteButton()}</CardSection>
        <CardSection>{this.renderSubscribeButton()}</CardSection>
        <CardSection>{this.renderDisconnectButton()}</CardSection>
      </View>
    );
  }
}

export default BleScanDetail;
