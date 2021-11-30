import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider, Image, Input, Button } from "react-native-elements";

import { setRoams, useStateValue } from "../../context/AppState";
import dbService from "../../services/database";

import theme from "../../theme";

const NewRoamScreen = ({ navigation }) => {
  const [{ mapSnap, location, database }, dispatch] = useStateValue();
  const today = new Date();

  const [date, setDate] = useState(
    `${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`
  );
  const [title, setTitle] = useState("");

  const addRoam = async () => {
    const newRoam = {
      title,
      date,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      image: mapSnap,
    };

    const newRoams = await dbService.insertInto(database, newRoam);
    dispatch(setRoams(newRoams));
    navigation.navigate("Map");
  };

  return (
    <View style={styles.container}>
      {mapSnap && (
        <Image style={styles.image} source={{ uri: `data:image/png;base64,${mapSnap}` }} />
      )}
      <Divider orientation="horizontal" height={16} />
      <Text>{date}</Text>
      <Text>{location.coords.latitude}</Text>
      <Text>{location.coords.longitude}</Text>
      <Divider orientation="horizontal" height={16} />
      <Input label="Title" value={title} onChangeText={setTitle} />
      <Button
        title="Add"
        type="outline"
        raised={true}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={() => addRoam()}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 16,
  },
  image: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderColor: theme.colors.medium,
    borderWidth: 4,
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

export default NewRoamScreen;
