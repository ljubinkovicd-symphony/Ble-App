import React, { Component } from "react";
import { View, NavigatorIOS } from "react-native";
import { Button } from "../common";
import { IPeripheral } from "../models";
import { IBleService, ListenerCallback } from "../bleService/IBleService";
import IBLEServiceFactory, {
  BleServiceLibrary
} from "../bleService/IBleServiceFactory";
import BleScanResults from "./BleScanResults";

interface Props {
  navigator: NavigatorIOS;
}

interface State {
  isScanning: boolean;
  peripherals: Array<IPeripheral>;
  appState: string;
}

class BleScanScreen extends Component<Props, State>
  implements ListenerCallback {
  myBleService: IBleService;

  constructor(props: Props) {
    super(props);

    this.myBleService = IBLEServiceFactory.getInstance(
      BleServiceLibrary.Innoveit,
      this
    );

    this.state = {
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
    this.myBleService.removeListeners();
  }

  startScan = () => {
    if (this.myBleService) {
      this.myBleService.startScan();
    }
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 16 }}>
        <View style={{ marginTop: 48, height: 44 }}>
          <Button onPress={this.startScan}>Scan</Button>
        </View>
      </View>
    );
  }

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
}

export default BleScanScreen;
