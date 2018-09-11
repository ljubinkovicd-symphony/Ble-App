import { BluetoothState, BluetoothActionTypes } from "./types";
import { Reducer } from "redux";

const INITIAL_STATE: BluetoothState = {
  enabled: false
};

const reducer: Reducer<BluetoothState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BluetoothActionTypes.BLUETOOTH_CHECK_STATE: {
      console.log(`Bluetooth is currently: ${action.payload}`);

      return { ...state, enabled: action.payload };
    }

    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.ts` folder.
export { reducer as bluetoothStateReducer };
