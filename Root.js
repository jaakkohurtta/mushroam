import { StatusBar } from "expo-status-bar";
import React from "react";
import App from "./App";
import { LocationState } from "./context/LocationState";

const Root = () => {
  return (
    <LocationState>
      <App />
    </LocationState>
  );
};

export default Root;
