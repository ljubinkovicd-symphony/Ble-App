import React, { Component } from "react";
import { NavigatorIOS, AppState } from "react-native";
import PairingScreen from "./screens/PairingScreen";
import { Store } from "redux";
import { ApplicationState } from "./store";
import { Provider, connect } from "react-redux";
import { store } from "./configureStore";
// import { store } from "./configureStore";

// Separate props from state and props from dispatch to their own interfaces.
// interface PropsFromState {
//   loading: boolean;
//   errors?: string;
//   peripheralsData: IPeripheral[];
// }

// interface PropsFromDispatch {
//   [key: string]: any;
// }

interface OwnProps {
  store: Store<ApplicationState>;
}

// type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class App extends Component<OwnProps> {
  render() {
    // const { store } = this.props;

    return (
      <Provider store={store}>
        <NavigatorIOS
          style={{ flex: 1 }}
          initialRoute={{
            component: PairingScreen,
            title: "Home"
          }}
        />
      </Provider>
    );
  }
}

export default App;

// TODO: Refactor to use this instead of exporting store directly as a variable.
// const mapStateToProps = ({ peripherals }: ApplicationState) => ({
//   loading: peripherals.loading,
//   errors: peripherals.errors,
//   peripheralsData: peripherals.peripheralsData
// });

// export default connect<
//   PropsFromState,
//   PropsFromDispatch,
//   OwnProps,
//   ApplicationState
// >(mapStateToProps)(App);
