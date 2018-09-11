import { SELECTED_BLE_LIBRARY } from "./../../bleService/IBleServiceFactory";
import { all, takeLatest, takeEvery } from "redux-saga/effects";
import { PeripheralsActionTypes } from "./types";
import IBLEServiceFactory from "../../bleService/IBleServiceFactory";

const bleService = IBLEServiceFactory.getInstance(SELECTED_BLE_LIBRARY);

function* scanPeripherals() {
  console.log("SAGA: scanPeripherals()");
  yield bleService.startScan();
}

function* watchScanPeripherals() {
  yield takeLatest(PeripheralsActionTypes.SCAN_REQUEST, scanPeripherals);
}

export default function* peripheralsSaga() {
  // yield takeLatest(PeripheralsActionTypes.FETCH_REQUEST, fetchPeripherals);
  yield all([watchScanPeripherals()]);
}
