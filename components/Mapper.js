import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useStateValue } from "../context/AppState";

import theme from "../theme";

const Mapper = ({ navigation }) => {
  const [{ location }, _] = useStateValue();

  return (
    <>
      {location.coords ? (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          }}>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Roaming"
            pinColor={theme.colors.paleGreen}
            onPress={() => navigation.navigate("New Roam Screen")}
          />
        </MapView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.textField}>No permission to use device location.</Text>
          <Text style={styles.textField}>Grant permission in the device settings.</Text>
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    marginBottom: 16,
  },
});

export default Mapper;
