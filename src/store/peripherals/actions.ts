import { action } from "typesafe-actions";
import { PeripheralsActionTypes } from "./types";
import { IPeripheral } from "../../models";

export const fetchRequest = () => action(PeripheralsActionTypes.FETCH_REQUEST);

export const fetchSuccess = (data: IPeripheral[]) =>
  action(PeripheralsActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) =>
  action(PeripheralsActionTypes.FETCH_ERROR, message);
