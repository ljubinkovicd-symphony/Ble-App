export const enum PeripheralActionTypes {
  // MARK: - Connection events
  CONNECT_PERIPHERAL_REQUEST = "@@peripheral/CONNECT_PERIPHERAL_REQUEST",
  CONNECT_PERIPHERAL_SUCCESS = "@@peripheral/CONNECT_PERIPHERAL_SUCCESS",
  CONNECT_PERIPHERAL_FAIL = "@@peripheral/CONNECT_PERIPHERAL_FAIL",

  // MARK: - Disconnection events
  DISCONNECT_PERIPHERAL_REQUEST = "@@peripheral/DISCONNECT_PERIPHERAL_REQUEST",
  DISCONNECT_PERIPHERAL_SUCCESS = "@@peripheral/DISCONNECT_PERIPHERAL_SUCCESS",
  DISCONNECT_PERIPHERAL_FAIL = "@@peripheral/DISCONNECT_PERIPHERAL_FAIL",

  // MARK: - Read events
  READ_PERIPHERAL_REQUEST = "@@peripheral/READ_PERIPHERAL_REQUEST",

  // MARK: - Write events
  WRITE_PERIPHERAL_REQUEST = "@@peripheral/WRITE_PERIPHERAL_REQUEST",

  // MARK: - Notify events
  SUBSCRIBE_TO_PERIPHERAL_REQUEST = "@@peripheral/NOTIFY_PERIPHERAL_REQUEST"
}

export interface PeripheralState {
  readonly connecting: boolean;
  readonly connected: boolean;
  readonly errors?: string;
}