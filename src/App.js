import React, { Component } from 'react';
import { FlatList, View, Text, NativeModules, NativeEventEmitter, AppState } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Button, Card, CardSection } from './common';
import BleManager from 'react-native-ble-manager';
import BleScanResults from './screens/BleScanResults';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => <BleScanResults />;

export default App;
