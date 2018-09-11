import {
  all,
  put,
  cancel,
  takeLatest,
  takeEvery,
  take
} from "redux-saga/effects";
import IBLEServiceFactory, {
  SELECTED_BLE_LIBRARY
} from "../../bleService/IBleServiceFactory";
import { BluetoothActionTypes } from "./types";

const bleService = IBLEServiceFactory.getInstance(SELECTED_BLE_LIBRARY);

function* checkBluetoothState() {
  console.log("SAGA: checkBluetoothState()");
  yield bleService.check();
}

// function* watchCheckBluetoothState() {
//   yield takeEvery(
//     BluetoothActionTypes.BLUETOOTH_CHECK_STATE,
//     checkBluetoothState
//   );
// }

export default function* bluetoothStateSaga() {
  yield all([checkBluetoothState()]);
}
