import { BluetoothActionTypes } from "./types";
import { action } from "../../configureStore";

export const checkBluetoothState = () => {
  action(BluetoothActionTypes.BLUETOOTH_CHECK_STATE);
};
