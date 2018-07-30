import { Navigation } from 'react-native-navigation';

import BleScanResults from './BleScanResults';
import BleScanDetail from './BleScanDetail';

const APP_MODULE_NAME = 'BluetoothScanner';
const BLE_RESULTS_SCREEN_NAME = 'BleScanResults';
const BLE_DETAILS_SCREEN_NAME = 'BleScanDetail';

export function registerScreens() {
  Navigation.registerComponent(
    `${APP_MODULE_NAME}.${BLE_RESULTS_SCREEN_NAME}`,
    () => BleScanResults
  );
  Navigation.registerComponent(
    `${APP_MODULE_NAME}.${BLE_DETAILS_SCREEN_NAME}`,
    () => BleScanDetail
  );
}
