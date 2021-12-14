import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, IconButton } from "react-native-paper";

import theme from "../theme";

const Header = ({ title, resetDatabase }) => {
  return (
    <View style={styles.container}>
      <Title style={{ fontFamily: "PermanentMarker_400Regular", fontSize: 32 }}>{title}</Title>
      <IconButton
        color={theme.colors.text}
        icon="mushroom"
        size={24}
        onPress={() => resetDatabase()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 96,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 36,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
});

export default Header;
