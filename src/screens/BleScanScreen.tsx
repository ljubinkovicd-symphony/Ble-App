import React, { Component } from "react";
import { View, NavigatorIOS } from "react-native";
import { Button } from "../common";
import { IPeripheral } from "../models";
import { IBleService, ListenerCallback } from "../bleService/IBleService";
import IBLEServiceFactory, {
  BleServiceLibrary
} from "../bleService/IBleServiceFactory";

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

    console.log(`BLESCANSCREEN: ${this} is of type: ${typeof this}`);

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
      this.setState({ peripherals: [] });
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

  listenerCallback(peripheral: IPeripheral): void {
    console.log(
      "My peripheral from inside the screen: " + JSON.stringify(peripheral)
    );
  }
}

export default BleScanScreen;
