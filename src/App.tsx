import React from "react";
import { NavigatorIOS } from "react-native";
import BleScanScreen from "./screens/BleScanScreen";
import { createStore, applyMidleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";

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
