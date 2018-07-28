import { Navigation } from 'react-native-navigation';

import BleScanResults from './BleScanResults';
import BleScanDetail from './BleScanDetail';

export function registerScreens() {
  Navigation.registerComponent('BluetoothScanner.BleScanResults', () => BleScanResults);
  Navigation.registerComponent('BluetoothScanner.BleScanDetail', () => BleScanDetail);
}
