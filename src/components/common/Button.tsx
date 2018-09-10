import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  disabled?: boolean;
  onPress?: () => void;
}
interface State { }

class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { buttonStyle, textStyle } = styles;

    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        style={buttonStyle}
      >
        <Text style={textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1, // expand to fill as much content as it can.
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#26297B",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#26297B",
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 8
  },
  textStyle: {
    alignSelf: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});

export { Button };
