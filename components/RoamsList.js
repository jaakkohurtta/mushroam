import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { useStateValue } from "../context/AppState";

const RoamsList = ({ navigation }) => {
  const [{ roams }, _] = useStateValue();

  console.log("roam list", roams);

  return (
    <View style={styles.container}>
      <Text>This is the My Roams FlatList.</Text>
      <Button onPress={() => navigation.navigate("Roam", { roam: "Black trumpet" })} title="Roam" />
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

export default RoamsList;
