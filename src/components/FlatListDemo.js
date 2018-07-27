import React, { Component } from 'react';
import { FlatList, NativeAppEventEmitter, List, ListItem } from 'react-native';
import BleManager from 'react-native-ble-manager';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: []
    };
  }

  componentDidMount() {
    console.log('bluetooth scanner mounted');

    NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', data => {
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

export { FlatListDemo };
