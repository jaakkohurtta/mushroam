import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Divider, TextInput, Title, Subheading } from "react-native-paper";

import { setRoams, useStateValue } from "../../context/AppState";
import dbService from "../../services/database";

import theme from "../../theme";

const NewRoamScreen = ({ navigation }) => {
  const [{ mapSnap, location, database }, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [haul, setHaul] = useState("");

  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.image} source={{ uri: `data:image/png;base64,${mapSnap}` }} />
        <Title>{date}</Title>
        <Subheading>
          {location.coords.latitude} / {location.coords.longitude}
        </Subheading>
        <Divider />
        <View style={styles.inputGroup}>
          <TextInput
            label="Title"
            mode="outlined"
            value={title}
            onChangeText={(title) => setTitle(title)}
          />
          <TextInput
            label="Haul"
            mode="outlined"
            keyboardType="number-pad"
            value={haul}
            onChangeText={(haul) => setHaul(haul)}
            right={<TextInput.Affix text="buckets" />}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  image: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderColor: theme.colors.text,
    borderWidth: 1,
  },
  inputGroup: {
    alignSelf: "stretch",
    padding: 16,
  },
});

export default NewRoamScreen;
