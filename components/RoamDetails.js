import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RoamDetails = ({ route, _ }) => {
  const { roam } = route.params;
  return (
    <View style={styles.container}>
      <Text>This is Roam Details screen for {roam}.</Text>
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

export default RoamDetails;
