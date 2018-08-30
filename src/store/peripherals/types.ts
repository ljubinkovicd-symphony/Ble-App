import { IPeripheral } from "../../models";

export const enum PeripheralsActionTypes {
  FETCH_REQUEST = "@@peripherals/FETCH_REQUEST",
  FETCH_SUCCESS = "@@peripherals/FETCH_SUCCESS",
  FETCH_ERROR = "@@peripherals/FETCH_ERROR",
  SELECT_PERIPHERAL = "@@peripherals/SELECT_PERIPHERAL",
  SELECTED_PERIPHERAL = "@@peripherals/SELECTED_PERIPHERAL"
}

export interface PeripheralsState {
  readonly loading: boolean;
  readonly peripheralsData: IPeripheral[];
  readonly errors?: string;
}
