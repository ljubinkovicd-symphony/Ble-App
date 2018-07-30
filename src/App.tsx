import React from 'react';
import { NavigatorIOS } from 'react-native';
// import { List, ListItem } from 'react-native-elements';
// import { Button, Card, CardSection } from './common';
// import BleManager from 'react-native-ble-manager';
import BleScanResults from './screens/BleScanResults';

// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => (
  <NavigatorIOS
    style={{ flex: 1 }}
    initialRoute={{
      component: BleScanResults,
      title: 'My Initial Scene'
    }}
  />
);

export default App;
