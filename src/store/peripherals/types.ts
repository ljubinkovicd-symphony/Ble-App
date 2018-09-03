import { IPeripheral } from "../../models";

export const enum PeripheralsActionTypes {
  // MARK: - Scan events
  SCAN_REQUEST = "@@peripherals/SCAN_REQUEST",
  SCAN_STOP = "@@peripherals/SCAN_STOP",

  // MARK: - Discover events
  DISCOVER_PERIPHERAL_SUCCESS = "@@peripherals/DISCOVER_PERIPHERAL_SUCCESS",

  // MARK: - Connection events
  CONNECT_PERIPHERAL_REQUEST = "@@peripherals/CONNECT_PERIPHERAL_REQUEST",
  CONNECT_PERIPHERAL_SUCCESS = "@@peripherals/CONNECT_PERIPHERAL_SUCCESS",
  CONNECT_PERIPHERAL_FAIL = "@@peripherals/CONNECT_PERIPHERAL_FAIL",

  // MARK: - Disconnection events
  DISCONNECT_PERIPHERAL_REQUEST = "@@peripherals/DISCONNECT_PERIPHERAL_REQUEST",
  DISCONNECT_PERIPHERAL_SUCCESS = "@@peripherals/DISCONNECT_PERIPHERAL_SUCCESS",
  DISCONNECT_PERIPHERAL_FAIL = "@@peripherals/DISCONNECT_PERIPHERAL_FAIL",

  // MARK: - Read events
  READ_PERIPHERAL_REQUEST = "@@peripherals/READ_PERIPHERAL_REQUEST",

  // MARK: - Write events
  WRITE_PERIPHERAL_REQUEST = "@@peripherals/WRITE_PERIPHERAL_REQUEST",

  // MARK: - Notify events
  NOTIFY_PERIPHERAL_REQUEST = "@@peripherals/NOTIFY_PERIPHERAL_REQUEST",

  FETCH_ERROR = "@@peripherals/FETCH_ERROR",
  SELECT_PERIPHERAL = "@@peripherals/SELECT_PERIPHERAL",
  SELECTED_PERIPHERAL = "@@peripherals/SELECTED_PERIPHERAL"
}

export interface PeripheralsState {
  readonly loading: boolean;
  readonly peripheralsData: IPeripheral[];
  readonly errors?: string;
}
