import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./router/router";
import { Provider } from "react-redux";
import store from "./store/store";
import { MD3LightTheme, PaperProvider, Portal } from "react-native-paper";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={MD3LightTheme}>
        <Portal>
          <NavigationContainer>
            <AppStackNavigator />
          </NavigationContainer>
        </Portal>
      </PaperProvider>
    </Provider>
  );
}
