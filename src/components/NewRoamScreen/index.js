import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  Divider,
  HelperText,
  Subheading,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { setRoams, useStateValue } from "../../context/AppState";
import dbService from "../../services/database";
import WeatherMapApi from "../../services/WeatherMapAPI";

import theme from "../../theme";

const NewRoamScreen = ({ navigation }) => {
  const [{ mapSnap, location, database }, dispatch] = useStateValue();

  const [title, setTitle] = useState("");
  const [haul, setHaul] = useState("");
  const [mushroom, setMushroom] = useState("Generic Mushroom");
  const [vibes, setVibes] = useState("");
  const [rainfall, setRainfall] = useState(null);
  const [avgtemp, setAvgtemp] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

  useEffect(() => {
    (async () => {
      const lat = location.coords.latitude.toFixed(2);
      const lon = location.coords.longitude.toFixed(2);

      try {
        // Array of timestamps for past 5 days
        const timestamps = Array(5)
          .fill(86400)
          .map((t, index) => Math.floor(Date.now() / 1000 - index * t));

        // Map API calls into an array of promises
        const promises = timestamps.map(
          async (time) => await WeatherMapApi.getWeather(lat, lon, time)
        );

        // Await all promises
        const weatherData = await Promise.all(promises);

        // Parse temperatures and rein volumes from the data
        const tempsArr = weatherData
          .map((data) => data.hourly.map((h) => h.temp))
          .reduce((arr, e) => arr.concat(e));

        const rainArr = weatherData
          .map((data) => data.hourly.map((h) => h.rain))
          .reduce((arr, e) => arr.concat(e));

        setAvgtemp((tempsArr.reduce((sum, value) => sum + value, 0) / tempsArr.length).toFixed(1));

        const rain = rainArr.reduce((sum, value) => sum + value, 0);
        setRainfall(!isNaN(rain) ? rain.toFixed(1) : -1);

        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
  }, []);

  const addRoam = async () => {
    console.log(avgtemp, rainfall);

    const newRoam = {
      title,
      date,
      mushroom,
      vibes,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      image: mapSnap,
      rainfall,
      avgtemp,
    };

    const newRoams = await dbService.insertInto(database, newRoam);
    dispatch(setRoams(newRoams));
    navigation.navigate("Map");
  };

  const titleErrors = () => {
    return title === "" ? true : false;
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <TextInput
              label="Title for your Roam"
              mode="outlined"
              value={title}
              onFocus={() => (title === null ? setTitle("") : null)}
              onChangeText={(title) => setTitle(title)}
            />
            <HelperText type="info" visible={titleErrors()}>
              Title is required.
            </HelperText>
          </View>
          <Image style={styles.image} source={{ uri: `data:image/png;base64,${mapSnap}` }} />
          <Title>{date}</Title>
          <Subheading>
            {location.coords.latitude} / {location.coords.longitude}
          </Subheading>
          <View style={styles.weather}>
            {loading ? (
              <Text>Loading weather..</Text>
            ) : (
              <>
                <Subheading>Weather from last 5 days</Subheading>
                <Text>
                  {rainfall === -1
                    ? "No rain data available for this location"
                    : `Cumulative rain fall: ${rainfall} mm`}
                </Text>
                <Text>Average temperature: {avgtemp} celcius</Text>
              </>
            )}
          </View>
          <Divider />
          <View style={styles.inputGroup}>
            <TextInput
              label="Haul"
              mode="outlined"
              keyboardType="number-pad"
              value={haul}
              onChangeText={(haul) => setHaul(haul)}
              right={<TextInput.Affix text="buckets" />}
            />
            <View style={styles.picker}>
              <Picker
                style={{ color: theme.colors.placeholder }}
                selectedValue={mushroom}
                onValueChange={(itemValue, itemIndex) => setMushroom(itemValue)}>
                <Picker.Item label="Generic Mushroom" value="Generic Mushroom" />
                <Picker.Item label="Funnel" value="Funnel" />
                <Picker.Item label="Milk cap" value="Milk cap" />
              </Picker>
            </View>
            <TextInput
              label="Vibes"
              mode="outlined"
              multiline={true}
              numberOfLines={5}
              value={vibes}
              onChangeText={(vibes) => setVibes(vibes)}
            />
            <Button
              mode="contained"
              dark={true}
              icon="content-save-outline"
              style={styles.saveButton}
              onPress={() => addRoam()}
              disabled={title === "" ? true : false}>
              Save
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  weather: {
    marginTop: 16,
    padding: 16,
    backgroundColor: theme.colors.background,
    alignSelf: "stretch",
    borderTopColor: theme.colors.placeholder,
    borderBottomColor: theme.colors.placeholder,
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
  picker: {
    borderColor: theme.colors.placeholder,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 6,
    backgroundColor: theme.colors.background,
  },
  saveButton: {
    marginTop: 6,
  },
});

export default NewRoamScreen;
