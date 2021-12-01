import React from "react";
import { Provider as ThemeProvider } from "react-native-paper";

import App from "./src/App";
import { AppStateProvider } from "./src/context/AppState";

import theme from "./src/theme";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ThemeProvider>
  );
};

export default Root;
