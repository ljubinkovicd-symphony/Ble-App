import { createStore, Reducer } from "redux";
import { PeripheralsState, PeripheralsActionTypes } from "./types";

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 */
const INITIAL_STATE: PeripheralsState = {
  loading: false,
  peripheralsData: [],
  errors: undefined
};

const reducer: Reducer<PeripheralsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PeripheralsActionTypes.SCAN_REQUEST: {
      return { ...state, loading: true };
    }

    case PeripheralsActionTypes.DISCOVER_PERIPHERAL_SUCCESS: {
      console.log(`DISCOVERED A PERIPHERAL: ${JSON.stringify(action.payload)}`);

      return { ...state, loading: false, data: action.payload };
    }

    case PeripheralsActionTypes.CONNECT_PERIPHERAL_REQUEST: {
      console.log(
        `TRYING TO CONNECT TO A PERIPHERAL: ${JSON.stringify(action.payload)}`
      );

      return { ...state, loading: false, data: action.payload };
    }
    case PeripheralsActionTypes.CONNECT_PERIPHERAL_SUCCESS: {
      console.log(
        `SUCCESSFULLY CONNECTED TO PERIPHERAL: ${JSON.stringify(
          action.payload
        )}`
      );

      return { ...state, loading: false, data: action.payload };
    }
    case PeripheralsActionTypes.CONNECT_PERIPHERAL_FAIL: {
      console.log("FAILED TO CONNECT!");

      return { ...state, loading: false, errors: action.payload };
    }

    case PeripheralsActionTypes.DISCONNECT_PERIPHERAL_REQUEST: {
      console.log(
        `TRYING TO DISCONNECT TO A PERIPHERAL: ${JSON.stringify(
          action.payload
        )}`
      );

      return { ...state, loading: false, data: action.payload };
    }
    case PeripheralsActionTypes.DISCONNECT_PERIPHERAL_SUCCESS: {
      console.log(
        `SUCCESSFULLY DISCONNECTED FROM PERIPHERAL: ${JSON.stringify(
          action.payload
        )}`
      );

      return { ...state, loading: false, data: action.payload };
    }
    case PeripheralsActionTypes.DISCONNECT_PERIPHERAL_FAIL: {
      console.log("FAILED TO DISCONNECT!");

      return { ...state, loading: false, errors: action.payload };
    }

    case PeripheralsActionTypes.READ_PERIPHERAL_REQUEST: {
      console.log("TRYING TO READ FROM A PERIPHERAL");

      return { ...state, loading: true };
    }

    case PeripheralsActionTypes.WRITE_PERIPHERAL_REQUEST: {
      console.log("TRYING TO WRITE TO A PERIPHERAL");

      return { ...state, loading: true };
    }

    case PeripheralsActionTypes.NOTIFY_PERIPHERAL_REQUEST: {
      console.log("TRYING TO SUBSCRIBE TO A PERIPHERAL");

      return { ...state, loading: true };
    }

    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.ts` folder.
export { reducer as peripheralsReducer };
