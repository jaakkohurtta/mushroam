import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MapView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is the Map.</Text>
      <Button onPress={() => navigation.navigate("Roam", { roam: "Yellowfoot" })} title="Roam" />
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

export default MapView;
