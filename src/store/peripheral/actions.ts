import { PeripheralActionTypes } from "./types";
import { action } from "../../configureStore";

export const connectRequest = () => {
  action(PeripheralActionTypes.CONNECT_PERIPHERAL_REQUEST);
};

export const disconnectRequest = () => {
  action(PeripheralActionTypes.DISCONNECT_PERIPHERAL_REQUEST);
};
