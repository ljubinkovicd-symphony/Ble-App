import React, { Component } from 'react';
import BleManager from 'react-native-ble-manager';
import { FlatList, View, NativeModules, NativeEventEmitter, AppState } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Button } from '../common';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class BleScanResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scanning: false,
      peripherals: new Map(),
      appState: ''
    };

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    // this.handleStopScan = this.handleStopScan.bind(this);
    // this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    // this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    console.log('bluetooth scanner mounted');

    // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', data => {
    //   const peripheral = {
    //     peripheralName: data.name,
    //     peripheralId: data.id
    //   };
    //
    //   this.setState({
    //     peripherals: [...this.state.peripherals, peripheral]
    //   });
    // });

    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log('Module initialized');
    });

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral
    );
    // this.handlerStop = bleManagerEmitter
    //     .addListener('BleManagerStopScan',
    //                   this.handleStopScan);
    // this.handlerDisconnect = bleManagerEmitter
    //     .addListener('BleManagerDisconnectPeripheral',
    //                   this.handleDisconnectedPeripheral);
    // this.handlerUpdate = bleManagerEmitter
    //     .addListener('BleManagerDidUpdateValueForCharacteristic',
    //                   this.handleUpdateValueForCharacteristic);
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDiscoverPeripheral(peripheral) {
    const peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)) {
      console.log('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals });
    }
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
        console.log(`Connected peripherals: ${peripheralsArray.length}`);
      });
    }
    this.setState({ appState: nextAppState });
  }

  startScan = () => {
    this.setState({ peripherals: new Map() });
    BleManager.scan([], 3).then(results => {
      console.log('Scanning...');
      console.log(`Results: ${results}`);
    });
  };

  render() {
    const list = Array.from(this.state.peripherals.values());

    return (
      <View style={{ flex: 1, marginTop: 16 }}>
        <View style={{ flex: 5 }}>
          <FlatList
            data={list}
            renderItem={({ item }) => <ListItem title={item.id} subtitle={item.name} />}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={{ marginBottom: 8, height: 44 }}>
          <Button onPress={this.startScan}>Scan</Button>
        </View>
      </View>
    );
  }
}

export default BleScanResults;
