import React, { Component } from 'react';
import BleManager from 'react-native-ble-manager';
import { View, NativeModules, NativeEventEmitter, AppState, NavigatorIOS } from 'react-native';
import { Button } from '../common';
import Results from '../components/Results';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const DISCOVER_BLE_EVENT: string = 'BleManagerDiscoverPeripheral';
const STOP_SCAN_BLE_EVENT: string = 'BleManagerStopScan';

export interface IPeripheral {
  id: string,
  name: string
}

interface Props {
  navigator: NavigatorIOS
}

interface State {
  isScanning: boolean,
  peripherals: Array<IPeripheral>,
  appState: string
}

class BleScanResults extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isScanning: false,
      peripherals: [],
      appState: ''
    };

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    // this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    // this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    console.log('bluetooth scanner mounted');

    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log('Module initialized');
    });

    bleManagerEmitter.addListener(DISCOVER_BLE_EVENT, this.handleDiscoverPeripheral);
    bleManagerEmitter.addListener(STOP_SCAN_BLE_EVENT, this.handleStopScan);
    // this.handlerDisconnect = bleManagerEmitter
    //     .addListener('BleManagerDisconnectPeripheral',
    //                   this.handleDisconnectedPeripheral);
    // this.handlerUpdate = bleManagerEmitter
    //     .addListener('BleManagerDidUpdateValueForCharacteristic',
    //                   this.handleUpdateValueForCharacteristic);
  }

  componentWillUnmount() {
    bleManagerEmitter.removeListener(DISCOVER_BLE_EVENT, this.handleDiscoverPeripheral);
    bleManagerEmitter.removeListener(STOP_SCAN_BLE_EVENT, this.handleStopScan);
  }

  handleDiscoverPeripheral(peripheral: IPeripheral) {
    const peripherals = this.state.peripherals;
    const peripheralIds = peripherals.map(x => x.id);
    if (!peripheralIds.includes(peripheral.id)) {
      console.log('Got ble peripheral', peripheral);
      peripherals.push(peripheral);
      this.setState({ peripherals });
    }
  }

  handleStopScan() {
    console.log('Scan stopped');
    const list = Array.from(this.state.peripherals.values());

    this.props.navigator.push({
      title: 'Results',
      component: Results,
      passProps: { peripherals: list }
    });
  }

  handleAppStateChange(nextAppState: string) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then((peripheralsArray: [IPeripheral]) => {
        console.log(`Connected peripherals: ${peripheralsArray.length}`);
      });
    }
    this.setState({ appState: nextAppState });
  }

  startScan = () => {
    this.setState({ peripherals: [] });
    BleManager.scan([], 3).then(() => {
      console.log('Scanning...');
    });
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

export default BleScanResults;
