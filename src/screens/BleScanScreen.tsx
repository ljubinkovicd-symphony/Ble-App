import React, { PureComponent } from "react";
import { View, Alert } from "react-native";
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
import { MAIN_SCREEN, RESULTS_SCREEN, DETAIL_SCREEN } from ".";

interface Props {
  componentId: string;
}

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean;
  peripheralsData: IPeripheral[];
  errors: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof scanRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = Props &
  PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class BleScanScreen extends PureComponent<AllProps> {
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
          text: "JUST SOMETHING TO PASS ALONG"
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

  componentDidMount() {
    console.log("componentDidMount() CALLED!");
    console.log(JSON.stringify(this.props));
  }

  // Called immediately after updating occurs. Not called for the initial render.
  componentDidUpdate() {
    if (!this.props.loading) {
      this.pushPeripheralListScreen();
    }
  }

  startScan = () => {
    scanRequest();
  };

  /** WON'T NEED ANY OF THIS HERE! */
  onDiscoverPeripheral(peripheral: IPeripheral): void {
    const idList = Array.from(this.state.peripherals.map(x => x.id));

    if (!idList.includes(peripheral.id)) {
      this.setState({ peripherals: [...this.state.peripherals, peripheral] });
    }
  }

  onStopScan(): void {
    console.log(JSON.stringify(this.state.peripherals));
    const list = Array.from(this.state.peripherals.values());

    this.props.navigator.push({
      title: "Results",
      component: BleScanResults,
      passProps: { peripherals: list }
    });
  }

  asciiToString(str: string) {
    const newAscii = str.split(",");
    const asciiCode = [];
    for (let i = 0; i < newAscii.length; i++) {
      asciiCode.push(String.fromCharCode(parseInt(newAscii[i])));
    }
    return asciiCode.join("");
  }

  onUpdateCharacteristic(data: ISubscription<any>) {
    console.log(
      `Received the following:\nvalue: ${data.value}\nperipheralID: ${
        data.peripheral
      }\ncharacteristicID: ${data.characteristic}\nserviceID: ${data.service}`
    );

    switch (data.characteristic) {
      case CADENCE_CASE_EVENT_CHARACTERISTIC:
        Alert.alert(
          "Case events",
          `Case ${(data.value["0"] as number) == 1 ? "Opened" : "Closed"}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      case CADENCE_BLISTER_PACK_PLACED_REMOVED_EVENT:
        const dateFormatString = this.asciiToString(
          data.value.toString()
        ).slice(0, 19);
        console.log(`dateFormatString: ${dateFormatString}`);
        const removedPillDate = new Date(dateFormatString);
        console.log(`removedPillDate: ${removedPillDate}`);

        Alert.alert(
          "Pill medication event",
          `Took a pill at: ${removedPillDate}`, // "yyyy-MM-dd'T'HH:mm:ssZ" format
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      default:
        return;
    }
  }

  onStateChange(args: any) {
    if (args.state === "off") {
      this.setState({ isBluetooth: false });
      Alert.alert(
        "Bluetooth State",
        `Bluetooth is: ${
          args.state
        }. Please turn it on in order to use the app.`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      this.setState({ isBluetooth: true });
    }
  }
  /** ------------------------------------------------------------------------------------------ */

  renderScanButton() {
    if (this.props.loading) {
      return <Button>SCANNING...</Button>;
    } else {
      return <Button onPress={this.startScan}>Scan</Button>;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 16 }}>
        <View style={{ marginTop: 48, height: 44 }}>
          {this.renderScanButton()}
        </View>
      </View>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ peripherals }: ApplicationState) => ({
  loading: peripherals.loading,
  errors: peripherals.errors,
  peripheralsData: peripherals.peripheralsData
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(scanRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BleScanScreen);
