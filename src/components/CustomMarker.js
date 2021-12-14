import React from "react";
import { View } from "react-native";

import theme from "../theme";

const CustomMarker = ({ color }) => {
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: theme.colors.text,
        backgroundColor: color,
        elevation: 10,
      }}
    />
  );
};

export default CustomMarker;
