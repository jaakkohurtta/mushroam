import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { useStateValue, setRoams } from "../context/AppState";
import dbService from "../services/database";
import theme from "../theme";

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
      <Button mode="contained" onPress={() => deleteRoam(roam.id)}>
        Delete
      </Button>
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
  button: {
    backgroundColor: theme.colors.paleBlue,
    width: 150,
  },
  buttonTitle: {
    color: theme.colors.light,
    fontWeight: "bold",
  },
});

export default RoamDetails;
