import { IPeripheral } from "../../models";

export const enum PeripheralsActionTypes {
  // MARK: - Scan events
  SCAN_REQUEST = "@@peripherals/SCAN_REQUEST",
  SCAN_STOP = "@@peripherals/SCAN_STOP",

  // MARK: - Discover events
  DISCOVER_PERIPHERAL_SUCCESS = "@@peripherals/DISCOVER_PERIPHERAL_SUCCESS",

  FETCH_ERROR = "@@peripherals/FETCH_ERROR",
  SELECT_PERIPHERAL = "@@peripherals/SELECT_PERIPHERAL",
  SELECTED_PERIPHERAL = "@@peripherals/SELECTED_PERIPHERAL"
}

export interface PeripheralsState {
  readonly loading: boolean;
  readonly peripheralsData: IPeripheral[];
  readonly errors?: string;
}
