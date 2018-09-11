import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { Button } from "../components/common";
import { IPeripheral, ISubscription } from "../models";
import BleScanResults from "./BleScanResults";
import {
  CADENCE_CASE_EVENT_CHARACTERISTIC,
  CADENCE_BLISTER_PACK_PLACED_REMOVED_EVENT
} from "../bleService/Constants";
import { PeripheralsActionTypes } from "../store/peripherals/types";
import { action } from "../configureStore";
import { scanRequest } from "../store/peripherals/actions";
import { ConnectedReduxProps, ApplicationState } from "../store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Navigation } from "react-native-navigation";
import {
  MAIN_SCREEN,
  RESULTS_SCREEN,
  DETAIL_SCREEN,
  DISABLED_BLE_SCREEN
} from ".";
import {
  FIRST_SCREEN_INTRO_TEXT,
  SUCCESS_TEXT,
  FAIL_TEXT
} from "../bleService/Constants";
import { disconnectRequest } from "../store/peripheral/actions";
import { checkBluetoothState } from "../store/bluetooth/actions";
import { BluetoothActionTypes } from "../store/bluetooth/types";

interface PropsFromNavigation {
  componentId: string;
}

// Separate state props + dispatch props to their own interfaces.
interface PropsFromBluetoothState {
  enabled: boolean;
}

interface PropsFromPeripheralListState {
  loading: boolean;
  peripheralsData: IPeripheral[];
  errors: string;
}

interface PropsFromSinglePeripheralState {
  connecting: boolean;
  connected: boolean;
  errors: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof scanRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromBluetoothState &
  PropsFromNavigation &
  PropsFromPeripheralListState &
  PropsFromSinglePeripheralState &
  PropsFromDispatch &
  ConnectedReduxProps;

class PairingScreen extends PureComponent<AllProps> {
  constructor(props: AllProps) {
    super(props);

    Navigation.events().bindComponent(this);

    this.pushPeripheralListScreen = this.pushPeripheralListScreen.bind(this);
  }

  pushPeripheralListScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: RESULTS_SCREEN,
        passProps: {
          peripherals: this.props.peripheralsData
        },
        options: {
          topBar: {
            title: {
              text: "LIST OF PERIPHERALS"
            }
          }
        }
      }
    });
  }

  showModalBleDisabledScreen() {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: DISABLED_BLE_SCREEN,
              passProps: {
                text: "BLE is disabled on the device, please turn it on."
              },
              options: {
                topBar: {
                  title: {
                    text: "BLE Disabled"
                  }
                }
              }
            }
          }
        ]
      }
    });
  }

  componentDidMount() {
    console.log("componentDidMount() CALLED!");
    console.log(JSON.stringify(this.props));

    checkBluetoothState();
  }

  // Called immediately after updating occurs. Not called for the initial render.
  componentDidUpdate() {
    if (this.props.enabled) {
      Navigation.dismissAllModals();
    } else {
      this.showModalBleDisabledScreen();
    }
  }

  startScan = () => {
    scanRequest();
  };

  startDisconnect = () => {
    disconnectRequest();
  };

  renderTryAgainButton() {
    if (!this.props.enabled) {
      return (
        <Button onPress={this.startScan} disabled>
          BLE Disabled
        </Button>
      );
    } else {
      return <Button onPress={this.startScan}>Try Again</Button>;
    }
  }

  renderConnectDisconnectButton() {
    if (this.props.enabled) {
      if (this.props.connected) {
        return <Button onPress={this.startDisconnect}>Disconnect</Button>;
      } else {
        return <Button onPress={this.startScan}>Connect</Button>;
      }
    } else {
      return (
        <Button onPress={this.startScan} disabled>
          BLE Disabled
        </Button>
      );
    }
  }

  renderScanButton() {
    if (this.props.loading) {
      return <Button>SCANNING...</Button>;
    } else {
      return <Button onPress={this.startScan}>Scan</Button>;
    }
  }

  renderConnecting() {
    const { container, description } = style;

    if (this.props.connecting) {
      return (
        <View style={container}>
          <Text style={description}>
            Connecting with: {this.props.peripheralsData[0].name}
            ...
          </Text>
          <ActivityIndicator
            style={{ flex: 2, justifyContent: "flex-start" }}
            size="large"
            color="#2A2A2C"
          />
        </View>
      );
    } else {
      return (
        <View style={container}>
          <Text style={description}>{SUCCESS_TEXT}</Text>
          <Image
            style={{ flex: 3, width: 80, height: 80, alignSelf: "center" }}
            resizeMode="contain"
            source={require("../../assets/images/app-icon80x80.png")}
          />
          {this.renderConnectDisconnectButton()}
        </View>
      );
    }
  }

  // Scan until Cadence compact peripheral is not found. Timeout after 10 seconds.
  renderPairingScreen() {
    const { container, image, description } = style;

    if (!this.props.loading && this.props.peripheralsData.length != 0) {
      return this.renderConnecting();
    }

    if (this.props.loading) {
      return (
        <View style={container}>
          <Text style={{ flex: 1 }}>{FIRST_SCREEN_INTRO_TEXT}</Text>
          <ActivityIndicator
            style={{ flex: 2, justifyContent: "flex-start" }}
            size="large"
            color="#2A2A2C"
          />
        </View>
      );
    } else {
      return (
        <View style={container}>
          <Image
            style={image}
            resizeMode="contain"
            source={require("../../assets/images/fail-img.png")}
          />
          <Text style={description}>{FAIL_TEXT}</Text>
          <Button>Contact Support</Button>
          {this.renderTryAgainButton()}
        </View>
      );
    }
  }

  render() {
    return this.renderPairingScreen();
  }
}

const style = StyleSheet.create({
  // Container
  container: {
    display: "flex",
    flex: 1,
    margin: 32
  },
  // Children
  image: {
    marginTop: 16,
    flex: 4,
    width: 180,
    height: 180,
    alignSelf: "center",
    justifyContent: "center"
  },
  description: {
    flex: 2,
    textAlign: "center"
  }
});

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({
  bluetoothState,
  peripherals,
  peripheral
}: ApplicationState) => ({
  enabled: bluetoothState.enabled,

  loading: peripherals.loading,
  errors: peripherals.errors,
  peripheralsData: peripherals.peripheralsData,

  connecting: peripheral.connecting,
  connected: peripheral.connected,
  connectionErrors: peripheral.errors
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(scanRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PairingScreen);
