import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

import { useStateValue } from "../context/LocationState";

const Mapper = () => {
  const [{ location }, dispatch] = useStateValue();

  return (
    <>
      {location.coords && (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          }}></MapView>
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
});

export default Mapper;
