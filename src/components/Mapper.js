import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import ViewShot from "react-native-view-shot";

import { useStateValue, setMapSnap } from "../context/AppState";

import theme from "../theme";

const Mapper = ({ navigation }) => {
  const [{ location }, dispatch] = useStateValue();
  const mapRef = useRef();

  const addNewRoam = () => {
    mapRef.current.capture().then((snap) => {
      dispatch(setMapSnap(snap));
      navigation.navigate("New Roam");
    });
  };

  return (
    <>
      {location.coords ? (
        <>
          <ViewShot style={{ flex: 1 }} ref={mapRef} options={{ result: "base64" }}>
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
                pinColor={theme.colors.primary}
                onPress={() => addNewRoam()}
              />
            </MapView>
          </ViewShot>
        </>
      ) : (
        <Paragraph>
          No permission to use device location. Grant permission in the device settings.
        </Paragraph>
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
