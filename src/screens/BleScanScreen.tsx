import React, { Component } from "react";
import { View, NavigatorIOS, Alert } from "react-native";
import { Button } from "../components/common";
import { IPeripheral, ISubscription } from "../models";
import { IBleService, ListenerCallback } from "../bleService/IBleService";
import IBLEServiceFactory, {
  BleServiceLibrary
} from "../bleService/IBleServiceFactory";
import BleScanResults from "./BleScanResults";
import {
  CADENCE_CASE_EVENT_CHARACTERISTIC,
  CADENCE_BLISTER_PACK_PLACED_REMOVED_EVENT
} from "../bleService/Constants";
import { PeripheralsActionTypes } from "../store/peripherals/types";
import { action } from "../configureStore";

interface Props {
  navigator: NavigatorIOS;
}

interface State {
  isBluetooth: boolean;
  isScanning: boolean;
  peripherals: Array<IPeripheral>;
  appState: string;
}

class BleScanScreen extends Component<Props, State>
  implements ListenerCallback {
  // myBleService: IBleService;

  constructor(props: Props) {
    super(props);

    // this.myBleService = IBLEServiceFactory.getInstance(
    // BleServiceLibrary.Innoveit,
    // this
    // );

    this.state = {
      isBluetooth: false,
      isScanning: false,
      peripherals: [],
      appState: ""
    };
  }

  componentDidMount() {
    // this.myBleWrapper = new BleWrapper(BLEManagerInnoveit.getInstance());
  }

  // TODO: Change this...
  componentWillUnmount() {
    // this.myBleService.removeListeners();
  }

  startScan = () => {
    action(PeripheralsActionTypes.SCAN_REQUEST);

    // if (this.myBleService) {
    //   this.myBleService.startScan();
    // }
  };

  /** WON'T NEED ANY OF THIS HERE! */
  onDiscoverPeripheral(peripheral: IPeripheral): void {
    const idList = Array.from(this.state.peripherals.map(x => x.id));

    if (!idList.includes(peripheral.id)) {
      this.setState({ peripherals: [...this.state.peripherals, peripheral] });
    }
  }

  onStopScan(): void {
    console.log(JSON.stringify(this.state.peripherals));
    const list = Array.from(this.state.peripherals.values());

    this.props.navigator.push({
      title: "Results",
      component: BleScanResults,
      passProps: { peripherals: list }
    });
  }

  asciiToString(str: string) {
    const newAscii = str.split(",");
    const asciiCode = [];
    for (let i = 0; i < newAscii.length; i++) {
      asciiCode.push(String.fromCharCode(parseInt(newAscii[i])));
    }
    return asciiCode.join("");
  }

  onUpdateCharacteristic(data: ISubscription<any>) {
    console.log(
      `Received the following:\nvalue: ${data.value}\nperipheralID: ${
        data.peripheral
      }\ncharacteristicID: ${data.characteristic}\nserviceID: ${data.service}`
    );

    switch (data.characteristic) {
      case CADENCE_CASE_EVENT_CHARACTERISTIC:
        Alert.alert(
          "Case events",
          `Case ${(data.value["0"] as number) == 1 ? "Opened" : "Closed"}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      case CADENCE_BLISTER_PACK_PLACED_REMOVED_EVENT:
        const dateFormatString = this.asciiToString(
          data.value.toString()
        ).slice(0, 19);
        console.log(`dateFormatString: ${dateFormatString}`);
        const removedPillDate = new Date(dateFormatString);
        console.log(`removedPillDate: ${removedPillDate}`);

        Alert.alert(
          "Pill medication event",
          `Took a pill at: ${removedPillDate}`, // "yyyy-MM-dd'T'HH:mm:ssZ" format
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      default:
        return;
    }
  }

  onStateChange(args: any) {
    if (args.state === "off") {
      this.setState({ isBluetooth: false });
      Alert.alert(
        "Bluetooth State",
        `Bluetooth is: ${
          args.state
        }. Please turn it on in order to use the app.`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      this.setState({ isBluetooth: true });
    }
  }
  /** ------------------------------------------------------------------------------------------ */

  renderScanButton() {
    return <Button onPress={this.startScan}>Scan</Button>;
    // return (
    //   <Button
    //     onPress={() => action(PeripheralsActionTypes.FETCH_REQUEST + "_ASYNC")}
    //   >
    //     Scan
    //   </Button>
    // );
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 16 }}>
        <View style={{ marginTop: 48, height: 44 }}>
          {this.renderScanButton()}
        </View>
      </View>
    );
  }
}

export default BleScanScreen;
