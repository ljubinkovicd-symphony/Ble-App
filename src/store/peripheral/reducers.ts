import { PeripheralState, PeripheralActionTypes } from "./types";
import { Reducer } from 'redux';

const INITIAL_STATE: PeripheralState = {
  connecting: false,
  connected: false,
  errors: undefined
}

const reducer: Reducer<PeripheralState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PeripheralActionTypes.CONNECT_PERIPHERAL_REQUEST: {
      console.log(`Sending a request to connect with the peripheral`);

      return { ...state, connecting: true };
    }

    case PeripheralActionTypes.CONNECT_PERIPHERAL_SUCCESS: {
      console.log(
        `SUCCESSFULLY CONNECTED TO PERIPHERAL: ${JSON.stringify(
          action.payload
        )}`
      );

      return { ...state, connecting: false, connected: true };
    }
    case PeripheralActionTypes.CONNECT_PERIPHERAL_FAIL: {
      console.log("FAILED TO CONNECT!");

      return { ...state, connecting: false, connected: false };
    }

    case PeripheralActionTypes.DISCONNECT_PERIPHERAL_REQUEST: {
      console.log(
        `TRYING TO DISCONNECT FROM A PERIPHERAL: ${JSON.stringify(
          action.payload
        )}`
      );

      return { ...state, connecting: true };
    }
    case PeripheralActionTypes.DISCONNECT_PERIPHERAL_SUCCESS: {
      console.log(
        `SUCCESSFULLY DISCONNECTED FROM PERIPHERAL: ${JSON.stringify(
          action.payload
        )}`
      );

      return { ...state, connecting: false, connected: false };
    }
    case PeripheralActionTypes.DISCONNECT_PERIPHERAL_FAIL: {
      console.log("FAILED TO DISCONNECT!");

      return { ...state, loading: false, errors: action.payload };
    }

    case PeripheralActionTypes.READ_PERIPHERAL_REQUEST: {
      console.log("TRYING TO READ FROM A PERIPHERAL");

      return { ...state, loading: true };
    }

    case PeripheralActionTypes.WRITE_PERIPHERAL_REQUEST: {
      console.log("TRYING TO WRITE TO A PERIPHERAL");

      return { ...state, loading: true };
    }

    case PeripheralActionTypes.SUBSCRIBE_TO_PERIPHERAL_REQUEST: {
      console.log("TRYING TO SUBSCRIBE TO A PERIPHERAL");

      return { ...state, loading: true };
    }

    default: {
      return state;
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.ts` folder.
export { reducer as peripheralReducer };