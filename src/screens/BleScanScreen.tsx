import React, { Component } from "react";
import { View, NavigatorIOS } from "react-native";
import { Button } from "../common";
import { IPeripheral } from "../models";
import { BleWrapper } from "../bleService/BleWrapper";
import BLEManagerInnoveit from "../bleService/BleManagerInnoveit";

interface Props {
  navigator: NavigatorIOS;
}

interface State {
  isScanning: boolean;
  peripherals: Array<IPeripheral>;
  appState: string;
}

class BleScanScreen extends Component<Props, State> {
  myBleWrapper?: BleWrapper;

  constructor(props: Props) {
    super(props);

    this.state = {
      isScanning: false,
      peripherals: [],
      appState: ""
    };
  }

  componentDidMount() {
    this.myBleWrapper = new BleWrapper(BLEManagerInnoveit.getInstance());
  }

  // TODO: Change this...
  componentWillUnmount() {
    BLEManagerInnoveit.removeListeners();
  }

  startScan = () => {
    if (this.myBleWrapper) {
      this.setState({ peripherals: [] });
      this.myBleWrapper.startScan();
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
}

export default BleScanScreen;
