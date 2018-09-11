import { createStore, Reducer, AnyAction } from "redux";
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
      return { ...state, peripheralsData: [], loading: true };
    }

    case PeripheralsActionTypes.SCAN_STOP: {
      console.log(
        "THE SCANNING HAS ENDED! TIME TO SWITCH TO A NEW SCREEN AND TRY TO CONNECT WITH CADENCE HARDWARE!"
      );

      console.log(`The peripherals are: ${JSON.stringify(state)}`);

      return { ...state, loading: false };
    }

    case PeripheralsActionTypes.DISCOVER_PERIPHERAL_SUCCESS: {
      console.log(`DISCOVERED A PERIPHERAL: ${JSON.stringify(action.payload)}`);

      return {
        ...state,
        peripheralsData: [...state.peripheralsData, action.payload]
      };
    }

    case PeripheralsActionTypes.FETCH_ERROR: {
      console.log(`FETCH ERROR`);

      return {
        ...state,
        errors: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.ts` folder.
export { reducer as peripheralsReducer };
