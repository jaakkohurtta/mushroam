import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    background: "#eef0f2",
    surface: "#fbfcff",
    text: "#1d2020",
    primary: "#7c8edf",
    accent: "#dc5e41",
    notification: "#80b38f",
    backdrop: "#a2a2a4",
    disabled: "#a2a2a4",
    placeholder: "gray",
  },
};

export default theme;
