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
    case PeripheralsActionTypes.FETCH_REQUEST + "_ASYNC": {
      // return { ...state, loading: true };
      console.log("ASYNC");
    }

    case PeripheralsActionTypes.FETCH_REQUEST: {
      // return { ...state, loading: true };
      console.log("NOT ASYNC");
    }
    case PeripheralsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case PeripheralsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.ts` folder.
export { reducer as peripheralsReducer };

// const store = createStore(reducer);
