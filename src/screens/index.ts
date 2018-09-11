// TODO: - Will use 'react-native-navigation' library eventually.
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { store } from "../configureStore";

enum AppScreen {
  MAIN = "bleDemo.PairingScreen",
  RESULTS = "bleDemo.BleScanResults",
  DETAILS = "bleDemo.BleScanDetail",

  // Modal screens
  BLE_DISABLED = "bleDemo.DisabledBleScreen"
}

export const MAIN_SCREEN: string = AppScreen.MAIN;
export const RESULTS_SCREEN: string = AppScreen.RESULTS;
export const DETAIL_SCREEN: string = AppScreen.DETAILS;

// Modal screens
export const DISABLED_BLE_SCREEN: string = AppScreen.BLE_DISABLED;

export function registerScreens() {
  Navigation.registerComponentWithRedux(
    RESULTS_SCREEN,
    () => require("./BleScanResults").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    DETAIL_SCREEN,
    () => require("./BleScanDetail").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    MAIN_SCREEN,
    () => require("./PairingScreen").default,
    Provider,
    store
  );

  // Modal screens
  Navigation.registerComponentWithRedux(
    DISABLED_BLE_SCREEN,
    () => require("./DisabledBleModalScreen").default,
    Provider,
    store
  );
}
