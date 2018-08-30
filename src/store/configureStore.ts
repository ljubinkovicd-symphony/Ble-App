import createSagaMiddleware from "redux-saga";
import rootSaga from "./peripherals/sagas";
import { peripheralsReducer } from "./peripherals/reducer";
import { createStore, applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(peripheralsReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export const action = (type: any) => store.dispatch({ type });
