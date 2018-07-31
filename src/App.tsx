import React from "react";
import { NavigatorIOS } from "react-native";
import BleScanResults from "./screens/BleScanResults";

const App = () => (
  <NavigatorIOS
    style={{ flex: 1 }}
    initialRoute={{
      component: BleScanResults,
      title: "Home"
    }}
  />
);

export default App;
