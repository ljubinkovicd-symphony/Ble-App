import React, { Component } from 'react';
import BleManager from 'react-native-ble-manager';
import { View, NativeModules, NativeEventEmitter, AppState } from 'react-native';
import { Button } from '../common';
import Results from '../components/Results';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const DISCOVER_BLE_EVENT = 'BleManagerDiscoverPeripheral';
const STOP_SCAN_BLE_EVENT = 'BleManagerStopScan';
const APP_STATE_CHANGE_EVENT = 'change';

class BleScanResults extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      scanning: false,
      peripherals: new Map(),
      appState: ''
    };

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener(APP_STATE_CHANGE_EVENT, this.handleAppStateChange);

    BleManager.start({ showAlert: false }).then(() => {
      /* Success */
    });

    this.handlerDiscover = bleManagerEmitter.addListener(
      DISCOVER_BLE_EVENT,
      this.handleDiscoverPeripheral
    );
    this.handlerStop = bleManagerEmitter.addListener(STOP_SCAN_BLE_EVENT, this.handleStopScan);
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
  }

  handleDiscoverPeripheral(peripheral) {
    const peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)) {
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals });
    }
  }

  handleStopScan() {
    const list = Array.from(this.state.peripherals.values());

    this.props.navigator.push({
      title: 'Results',
      component: Results,
      passProps: { peripherals: list }
    });
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
        console.log(`Connected peripherals: ${peripheralsArray.length}`);
      });
    }
    this.setState({ appState: nextAppState });
  }

  startScan = () => {
    this.setState({ peripherals: new Map() });
    BleManager.scan([], 3).then(() => {});
  };

  render() {
    const { containerStyle, topContainer } = styles;

    return (
      <View style={containerStyle}>
        <View style={topContainer}>
          <Button onPress={this.startScan}>Scan</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    marginTop: 16
  },
  topContainer: {
    marginTop: 48,
    height: 44
  }
};

export default BleScanResults;
