import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Paragraph } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import ViewShot from "react-native-view-shot";

import { useStateValue, setLocation, setMapSnap, setMapRoams } from "../context/AppState";

import CustomMarker from "./CustomMarker";

import theme from "../theme";

const Mapper = ({ navigation }) => {
  const [{ location, roams, mapRoams }, dispatch] = useStateValue();
  const mapRef = useRef();

  const handleMapPress = () => {
    dispatch(setMapRoams(false));
    mapRef.current.capture().then((snap) => {
      dispatch(setMapSnap(snap));
      navigation.navigate("New Roam");
    });
  };

  const handleMarkerPress = (roam) => {
    navigation.navigate("My Roams Screen", { screen: "Roam Details", params: { roam } });
  };

  const handleDragEnd = (coordinate) => {
    dispatch(setLocation({ coords: coordinate }));
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
              }}
              mapType="terrain"
              onPress={() => handleMapPress()}>
              {mapRoams && (
                <>
                  {roams.map((roam) => (
                    <Marker
                      key={roam.timestamp}
                      coordinate={{ latitude: roam.latitude, longitude: roam.longitude }}
                      onPress={() => handleMarkerPress(roam)}>
                      <CustomMarker color={theme.mushrooms[roam.colorid]} />
                    </Marker>
                  ))}
                </>
              )}
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                draggable
                onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate)}
                pinColor={theme.colors.primary}
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
