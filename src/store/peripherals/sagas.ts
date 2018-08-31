import { all, takeLatest, takeEvery } from "redux-saga/effects";
import { PeripheralsActionTypes } from "./types";

import IBLEServiceFactory, {
  BleServiceLibrary
} from "../../bleService/IBleServiceFactory";

const bleService = IBLEServiceFactory.getInstance(BleServiceLibrary.Innoveit);

function* scanPeripherals() {
  yield bleService.startScan();
}

function* connectPeripheral() {
  yield bleService.connect();
}

function* disconnectPeripheral() {
  yield bleService.disconnect();
}

function* readFromPeripheral() {
  yield bleService.read();
}

function* writeToPeripheral<T>(data: T) {
  yield bleService.write(data);
}

function* notifyPeripheral() {
  yield bleService.notify();
}

function* watchScanPeripherals() {
  yield takeLatest(PeripheralsActionTypes.SCAN_REQUEST, scanPeripherals);
}

function* watchConnectPeripheral() {
  yield takeEvery(
    PeripheralsActionTypes.CONNECT_PERIPHERAL_REQUEST,
    connectPeripheral
  );
}

function* watchDisconnectPeripheral() {
  yield takeEvery(
    PeripheralsActionTypes.DISCONNECT_PERIPHERAL_REQUEST,
    disconnectPeripheral
  );
}

function* watchReadFromPeripheral() {
  yield takeEvery(
    PeripheralsActionTypes.READ_PERIPHERAL_REQUEST,
    readFromPeripheral
  );
}

function* watchWriteToPeripheral() {
  yield takeEvery(
    PeripheralsActionTypes.WRITE_PERIPHERAL_REQUEST,
    writeToPeripheral
  );
}

function* watchNotifyPeripheral() {
  yield takeEvery(
    PeripheralsActionTypes.NOTIFY_PERIPHERAL_REQUEST,
    notifyPeripheral
  );
}

export default function* rootSaga() {
  // yield takeLatest(PeripheralsActionTypes.FETCH_REQUEST, fetchPeripherals);
  yield all([
    watchScanPeripherals(),
    watchConnectPeripheral(),
    watchDisconnectPeripheral(),
    watchReadFromPeripheral(),
    watchWriteToPeripheral(),
    watchNotifyPeripheral()
  ]);
}
