import createSagaMiddleware from "redux-saga";
import peripheralsSaga from "./store/peripherals/sagas";
import { peripheralsReducer } from "./store/peripherals/reducer";
import { createStore, applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  peripheralsReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(peripheralsSaga);

export const action = (type: any, payload?: any) =>
  store.dispatch({ type, payload });
