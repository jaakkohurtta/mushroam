import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { useStateValue, setRoams } from "../context/AppState";
import dbService from "../services/database";

const RoamDetails = ({ route, _ }) => {
  const [{ database }, dispatch] = useStateValue();
  const { roam } = route.params;

  const deleteRoam = async (id) => {
    const updatedRoams = await dbService.deleteById(database, id);
    dispatch(setRoams(updatedRoams));
  };

  return (
    <View style={styles.container}>
      <Text>
        This is Roam Details screen for {roam.title}(id: {roam.id}).
      </Text>
      <Button title="Delete" onPress={() => deleteRoam(roam.id)} />
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
