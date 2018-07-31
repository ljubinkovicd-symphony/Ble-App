// TODO: - Will use 'react-native-navigation' library eventually.
import { Navigation } from "react-native-navigation";

import BleScanResults from "./BleScanResults";
import BleScanDetail from "./BleScanDetail";

const APP_NAME = "BluetoothScanner";
const BLE_SCAN_RESULTS_SCREEN = "BleScanResults";
const BLE_SCAN_DETAILS_SCREEN = "BleScanDetail";

export function registerScreens() {
  Navigation.registerComponent(
    `${APP_NAME}.${BLE_SCAN_RESULTS_SCREEN}`,
    () => BleScanResults
  );
  Navigation.registerComponent(
    `${APP_NAME}.${BLE_SCAN_DETAILS_SCREEN}`,
    () => BleScanDetail
  );
}
