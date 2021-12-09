import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, IconButton } from "react-native-paper";

const Header = ({ title, resetDatabase }) => {
  return (
    <View style={styles.container}>
      <Title>{title}</Title>
      <IconButton icon="cog" size={24} onPress={() => resetDatabase()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 32,
  },
});

export default Header;
