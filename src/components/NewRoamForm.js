import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
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

import { setRoams, setMapRoams, setNotification, useStateValue } from "../context/AppState";
import dbService from "../services/database";
import WeatherMapApi from "../services/WeatherMapAPI";

import theme from "../theme";

const mushrooms = [
  { name: "Generic Mushroom", colorId: "generic" },
  { name: "Black Trumpet", colorId: "blacktrumpet" }, // musta torvisieni
  { name: "Chantarelle", colorId: "chantarelle" }, // kanttarelli
  { name: "Funnel", colorId: "funnel" }, // suppis
  { name: "Rufous Milkcap", colorId: "rufousmilkcap" }, // kangasrousku
  { name: "Porcini", colorId: "porcini" }, // herkkutatti
  { name: "Sheep Polypore", colorId: "sheeppolypore" }, // lampaankääpä
  { name: "Shiitake", colorId: "shiitake" }, // siitake
  { name: "Slimy Spike-cap", colorId: "slimyspikecap" }, // limanuljaska
  { name: "Velvet Bolete", colorId: "velvetboletet" }, // kangastatti
  { name: "Woolly Milkcap", colorId: "woollymilkcap" }, // karvarousku
];

const NewRoamForm = ({ navigation }) => {
  const [{ mapSnap, location, database }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [haul, setHaul] = useState("");
  const [mushroom, setMushroom] = useState(mushrooms[0]);
  const [vibes, setVibes] = useState("");
  const [rainfall, setRainfall] = useState(null);
  const [avgtemp, setAvgtemp] = useState(null);
  const [clouds, setClouds] = useState(null);

  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

  useEffect(() => {
    dispatch(setMapRoams(true));

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

        const cloudsArr = weatherData
          .map((data) => data.hourly.map((h) => h.clouds))
          .reduce((arr, e) => arr.concat(e));

        const rainArr = weatherData
          .map((data) => data.hourly.map((h) => h.rain))
          .reduce((arr, e) => arr.concat(e));

        setAvgtemp((tempsArr.reduce((sum, value) => sum + value, 0) / tempsArr.length).toFixed(1));

        setClouds((cloudsArr.reduce((sum, value) => sum + value, 0) / cloudsArr.length).toFixed(1));

        const rain = rainArr.reduce((sum, value) => sum + value, 0);
        setRainfall(!isNaN(rain) ? rain.toFixed(1) : -1);

        setLoading(false);
      } catch (e) {
        // console.error(e);
        setLoading(false);
      }
    })();
  }, []);

  const addRoam = async () => {
    // !! HOX: JÄRJESTYS TÄRKEÄ SQL QUERYÄ VARTEN !!
    const newRoam = {
      title,
      timestamp: Math.floor(Date.now() / 1000),
      date,
      mushroom: mushroom.name,
      haul: haul === "" ? 0 : parseFloat(haul),
      vibes,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      image: mapSnap,
      rainfall,
      avgtemp,
      clouds,
      colorid: mushroom.colorId,
    };

    const newRoams = await dbService.insertInto(database, newRoam);
    dispatch(setRoams(newRoams));
    dispatch(setNotification({ show: true, content: "New Roam added." }));
    navigation.navigate("Map");
  };

  const titleErrors = () => {
    return title === "" ? true : false;
  };

  const haulErrors = () => {
    return haul === "" ? true : false;
  };

  return (
    <>
      {location.coords ? (
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View style={styles.inputGroup}>
                <TextInput
                  label="Title for your Roam"
                  mode="outlined"
                  value={title}
                  activeOutlineColor={theme.colors.primary}
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
                  <Subheading>Loading weather..</Subheading>
                ) : (
                  <>
                    {rainfall && avgtemp && clouds ? (
                      <>
                        <Subheading>Weather from the past 5 days</Subheading>
                        <Text>Average temperature: {avgtemp} celcius</Text>
                        <Text>Cloud coverage: {clouds} &#37;</Text>
                        <Text>
                          {rainfall === -1
                            ? "No rain data available for this location"
                            : `Cumulative rain fall: ${rainfall} mm`}
                        </Text>
                      </>
                    ) : (
                      <Subheading>No weather data available.</Subheading>
                    )}
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
                  activeOutlineColor={theme.colors.primary}
                  onChangeText={(haul) => setHaul(haul)}
                  right={<TextInput.Affix text="baskets" />}
                />
                <HelperText type="info" visible={haulErrors()}>
                  Approximate your harvest volume in baskets, 0.5 for half a basket.
                </HelperText>
                <View style={styles.picker}>
                  <Picker
                    style={{ color: theme.colors.text }}
                    selectedValue={mushroom}
                    onValueChange={(itemValue, itemIndex) => setMushroom(itemValue)}>
                    {mushrooms.map((mushroom) => (
                      <Picker.Item key={mushroom.name} label={mushroom.name} value={mushroom} />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  label="Vibes"
                  mode="outlined"
                  multiline={true}
                  numberOfLines={5}
                  value={vibes}
                  activeOutlineColor={theme.colors.primary}
                  onChangeText={(vibes) => setVibes(vibes)}
                />
                <Button
                  mode="contained"
                  icon="content-save-outline"
                  color={theme.colors.primary}
                  style={styles.button}
                  onPress={() => addRoam()}
                  disabled={title === "" ? true : false}>
                  Save
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      ) : (
        <View style={styles.noLocation}>
          <Text>
            No permission to use device location. Grant permission in the device settings.
          </Text>
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  noLocation: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
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
    borderTopColor: theme.colors.text,
    borderBottomColor: theme.colors.text,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  image: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderColor: theme.colors.text,
    borderWidth: 2,
  },
  inputGroup: {
    alignSelf: "stretch",
    padding: 16,
  },
  picker: {
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 6,
    backgroundColor: theme.colors.backdrop,
  },
  button: {
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewRoamForm;
