// Refactor so that action from "typesafe-actions" is used instead of custom action function.
// import { action } from "typesafe-actions";
import { PeripheralsActionTypes } from "./types";
import { IPeripheral } from "../../models";
import { action } from "../../configureStore";

export const scanRequest = () => {
  action(PeripheralsActionTypes.SCAN_REQUEST);
};

export const scanDiscoverSuccess = (data: IPeripheral) =>
  action(PeripheralsActionTypes.DISCOVER_PERIPHERAL_SUCCESS, data);
export const fetchError = (message: string) =>
  action(PeripheralsActionTypes.FETCH_ERROR, message);
