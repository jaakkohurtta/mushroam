import { StatusBar } from "expo-status-bar";
import React from "react";
import App from "./App";
import { AppStateProvider } from "./context/AppState";

const Root = () => {
  return (
    <AppStateProvider>
      <App />
    </AppStateProvider>
  );
};

export default Root;
