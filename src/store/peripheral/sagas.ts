import { SELECTED_BLE_LIBRARY } from "./../../bleService/IBleServiceFactory";
import { all, takeEvery } from "redux-saga/effects";
import { PeripheralActionTypes } from "./types";
import IBLEServiceFactory from "../../bleService/IBleServiceFactory";

const bleService = IBLEServiceFactory.getInstance(SELECTED_BLE_LIBRARY);

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

function* watchConnectPeripheral() {
  yield takeEvery(
    PeripheralActionTypes.CONNECT_PERIPHERAL_REQUEST,
    connectPeripheral
  );
}

function* watchDisconnectPeripheral() {
  yield takeEvery(
    PeripheralActionTypes.DISCONNECT_PERIPHERAL_REQUEST,
    disconnectPeripheral
  );
}

function* watchReadFromPeripheral() {
  yield takeEvery(
    PeripheralActionTypes.READ_PERIPHERAL_REQUEST,
    readFromPeripheral
  );
}

function* watchWriteToPeripheral() {
  yield takeEvery(
    PeripheralActionTypes.WRITE_PERIPHERAL_REQUEST,
    writeToPeripheral
  );
}

function* watchNotifyPeripheral() {
  yield takeEvery(
    PeripheralActionTypes.SUBSCRIBE_TO_PERIPHERAL_REQUEST,
    notifyPeripheral
  );
}

export default function* peripheralsSaga() {
  yield all([
    watchConnectPeripheral(),
    watchDisconnectPeripheral(),
    watchReadFromPeripheral(),
    watchWriteToPeripheral(),
    watchNotifyPeripheral()
  ]);
}
