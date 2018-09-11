export const enum BluetoothActionTypes {
  BLUETOOTH_CHECK_STATE = "@@bluetooth/BLUETOOTH_CHECK_STATE"
}

export interface BluetoothState {
  readonly enabled: boolean;
}
