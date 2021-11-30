import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Header, Overlay } from "react-native-elements";

import { useStateValue, setLocation, setRoams } from "./context/AppState";
import dbService from "./services/database";

import MapScreen from "./components/MapScreen";
import MyRoamsScreen from "./components/MyRoamsScreen";
import NewRoamScreen from "./components/NewRoamScreen";
import AlertOverlay from "./components/AlertOverlay";

import theme from "./theme";

const Tab = createBottomTabNavigator();

const App = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [{ database }, dispatch] = useStateValue();

  useEffect(() => {
    dbService.init(database).then((response) => dispatch(setRoams(response)));

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setOverlayVisible(true);
        return;
      }
      const loc = await Location.getCurrentPositionAsync();
      dispatch(setLocation(loc));
    })();
  }, []);

  const resetDatabase = () => {
    Alert.alert("Drop table?", "Really?", [
      {
        text: "Yes",
        onPress: () => dbService.reset(database),
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <NavigationContainer>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(!overlayVisible)}>
        <AlertOverlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
      </Overlay>
      <Header
        backgroundColor={theme.colors.dark}
        centerComponent={{
          text: "Mushroam",
          style: { letterSpacing: 2, fontSize: 24, color: theme.colors.light },
        }}
        rightComponent={
          <Button
            title="Reset"
            buttonStyle={{ backgroundColor: theme.colors.red }}
            onPress={() => resetDatabase()}
          />
        }
      />
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveBackgroundColor: theme.colors.medium,
          tabBarInactiveBackgroundColor: theme.colors.dark,
          tabBarInactiveTintColor: theme.colors.light,
          tabBarActiveTintColor: theme.colors.light,
          tabBarStyle: {
            height: 64,
          },
          tabBarLabelStyle: {
            marginTop: 2,
            padding: 6,
          },
        })}>
        <Tab.Screen options={{ headerShown: false }} name="Map Screen" component={MapScreen} />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="My Roams Screen"
          component={MyRoamsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
