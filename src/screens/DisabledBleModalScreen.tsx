import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
  componentId: string;
}

class DisabledBleModalScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);

    console.log("COMPONENT ID OF THE MODAL " + this.props.componentId);

    Navigation.events().bindComponent(this);
  }

  render() {
    const { mainContainer, textContainer, description } = style;

    return (
      <View style={mainContainer}>
        <View style={textContainer}>
          <Text style={description}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32
  },
  textContainer: {
    padding: 16,
    backgroundColor: "#2A2A2C"
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});

export default DisabledBleModalScreen;
