import createSagaMiddleware from "redux-saga";
import peripheralsSaga from "./store/peripherals/sagas";
import { peripheralsReducer } from "./store/peripherals/reducer";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, rootSaga } from "./store";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export const action = (type: any, payload?: any) =>
  store.dispatch({ type, payload });
