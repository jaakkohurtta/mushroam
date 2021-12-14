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
  mushrooms: {
    generic: "#FF0059",
    blacktrumpet: "#0022FF",
    chantarelle: "#FFC300",
    funnel: "#FF8000",
    porcini: "#FF4D00",
    rufousmilkcap: "#963C36", //
    shiitake: "#00D0FF",
    sheeppolypore: "#00FFAA",
    slimyspikecap: "#B28377",
    velvetbolete: "#9E6236",
    woollymilkcap: "#B5947D",
  },
};

export default theme;
