// TODO: - Will use 'react-native-navigation' library eventually.
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { store } from "../configureStore";

enum BleScreen {
  MAIN = "bleDemo.BleScanScreen",
  RESULTS = "bleDemo.BleScanResults",
  DETAILS = "bleDemo.BleScanDetail"
}

export const MAIN_SCREEN: string = BleScreen.MAIN;
export const RESULTS_SCREEN: string = BleScreen.RESULTS;
export const DETAIL_SCREEN: string = BleScreen.DETAILS;

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
    () => require("./BleScanScreen").default,
    Provider,
    store
  );
}
