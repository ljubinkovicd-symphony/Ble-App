// import { IPeripheral } from "../models";
// import { ActionTypes, AddPeripheralAction } from "../actions";

// export interface State {
//   peripherals: Array<IPeripheral>;
// }

// export const initialState: State = {
//   peripherals: []
// };

// export type Action = AddPeripheralAction;

// export function reducer(state: State = initialState, action: Action) {
//   switch (action.type) {
//     case ActionTypes.ADD_PERIPHERAL: {
//       const peripheral = action.payload;

//       return {
//         ...state,
//         peripherals: [...state.peripherals, peripheral]
//       };
//     }
//   }
// }
