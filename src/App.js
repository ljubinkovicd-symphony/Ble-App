import React, { Component } from 'react';
import { FlatList, View, Text, Button, NativeModules, NativeEventEmitter } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: []
    };
  }

  componentDidMount() {
    console.log('bluetooth scanner mounted');

    console.log(`My BleManagerModule: ${BleManagerModule}`);
    console.log(`My bleManagerEmitter: ${bleManagerEmitter}`);

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', data => {
      const device = {
        deviceName: data.name,
        deviceId: data.id
      };

      this.setState({
        devices: [...this.state.devices, device]
      });

      console.log(`Here are my devices currently: ${this.state.devices}`);
    });

    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log('Module initialized');
      console.log('started scanning...');
      BleManager.scan([], 5); // 5 second-scanning
    });
  }

  render() {
    return (
      <List>
        <FlatList
          data={this.state.devices}
          renderItem={({ item }) => <ListItem title={item.deviceName} subtitle={item.deviceId} />}
        />
      </List>
    );
  }
}

export default App;
