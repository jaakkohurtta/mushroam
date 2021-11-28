import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const RoamsList = ({ navigation }) => {
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
