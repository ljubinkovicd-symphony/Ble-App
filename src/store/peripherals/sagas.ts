import { delay } from "redux-saga";
import { all, put, takeEvery } from "redux-saga/effects";
import { PeripheralsActionTypes } from "./types";

// Our worker Saga: will perform the async increment task
export function* helloSaga() {
  yield delay(1000);
  yield put({ type: PeripheralsActionTypes.FETCH_REQUEST });
}

// Our watcher Saga: spawn a new incrementAsync task on each PeripheralsActionTypes.FETCH_REQUEST
export function* watchHelloSagaAsync() {
  yield takeEvery(PeripheralsActionTypes.FETCH_REQUEST + "_ASYNC", helloSaga);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchHelloSagaAsync()]);
}

/**
 * We import delay, a utility function that returns a Promise that will resolve after a specified number
 * of milliseconds. We'll use this function to block the Generator.

Sagas are implemented as Generator functions that yield objects to the redux-saga middleware.
The yielded objects are a kind of instruction to be interpreted by the middleware.
When a Promise is yielded to the middleware, the middleware will suspend the Saga until the Promise
completes. In the above example, the watchHelloSagaAsync Saga is suspended until the Promise returned by 
delay resolves, which will happen after 1 second.

Once the Promise is resolved, the middleware will resume the Saga, executing code until the next yield.
In this example, the next statement is another yielded object: the result of calling
put({type: PeripheralsActionTypes.FETCH_REQUEST + "_ASYNC"})
which instructs the middleware to dispatch an PeripheralsActionTypes.FETCH_REQUEST action.


put is one example of what we call an Effect. Effects are simple JavaScript objects which contain
instructions to be fulfilled by the middleware. When a middleware retrieves an Effect yielded by a Saga,
the Saga is paused until the Effect is fulfilled.
 */
