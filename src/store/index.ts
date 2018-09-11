import { combineReducers, Dispatch, Action, AnyAction } from "redux";
import { all, fork } from "redux-saga/effects";
import { BluetoothState } from "./bluetooth/types";
import { PeripheralsState } from "./peripherals/types";
import { PeripheralState } from "./peripheral/types";
import { peripheralsReducer } from "./peripherals/reducers";
import { peripheralReducer } from "./peripheral/reducers";
import peripheralsSaga from "./peripherals/sagas";
import peripheralSaga from "./peripheral/sagas";
import { bluetoothStateReducer } from "./bluetooth/reducers";
import bluetoothStateSaga from "./bluetooth/sagas";

// The top level state object.
export interface ApplicationState {
  peripherals: PeripheralsState;
  peripheral: PeripheralState;
  bluetoothState: BluetoothState;
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  peripherals: peripheralsReducer,
  peripheral: peripheralReducer,
  bluetoothState: bluetoothStateReducer
});

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([
    fork(peripheralsSaga),
    fork(peripheralSaga),
    fork(bluetoothStateSaga)
  ]); // TODO: replace fork here???
}
