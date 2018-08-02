import React from "react";
import { NavigatorIOS } from "react-native";
import BleScanScreen from "./screens/BleScanScreen";

const App = () => (
  <NavigatorIOS
    style={{ flex: 1 }}
    initialRoute={{
      component: BleScanScreen,
      title: "Home"
    }}
  />
);

export default App;
