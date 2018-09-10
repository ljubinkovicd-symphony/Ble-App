/** @format */

import { Navigation } from "react-native-navigation";
import { registerScreens, MAIN_SCREEN } from "./src/screens";

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: MAIN_SCREEN
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: "Pair Compact",

            },
            rightButtons: [
              {
                id: "nextButton",
                text: "Next >",
                color: "#2A2A2C",
                fontSize: 14
              }
            ],
            background: {
              color: '#EBEBF9',
            }
          }
        }
      }
    }
  });
});
