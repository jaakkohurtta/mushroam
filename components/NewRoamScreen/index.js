import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewRoamScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the New Roam Form.</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NewRoamScreen;
