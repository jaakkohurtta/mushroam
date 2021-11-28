import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header } from "react-native-elements";

import { useStateValue, setLocation } from "./context/LocationState";

import MapScreen from "./components/MapScreen";
import MyRoamsScreen from "./components/MyRoamsScreen";
import NewRoamScreen from "./components/NewRoamScreen";

import theme from "./theme";
import { Alert } from "react-native";

const Tab = createBottomTabNavigator();

const App = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("No permission to access device location.");
        return;
      }
      const loc = await Location.getCurrentPositionAsync();
      dispatch(setLocation(loc));
    })();
  }, []);

  return (
    <NavigationContainer>
      <Header
        backgroundColor={theme.colors.pineTree}
        centerComponent={{
          text: "Mushroam",
          style: { letterSpacing: 2, fontSize: 24, color: theme.colors.cultured },
        }}
      />
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveBackgroundColor: theme.colors.xanadu,
          tabBarInactiveBackgroundColor: theme.colors.pineTree,
          tabBarInactiveTintColor: theme.colors.cultured,
          tabBarActiveTintColor: theme.colors.cultured,
        })}>
        <Tab.Screen options={{ headerShown: false }} name="Map Screen" component={MapScreen} />
        <Tab.Screen
          options={{ headerShown: false }}
          name="My Roams Screen"
          component={MyRoamsScreen}
        />
        <Tab.Screen name="New Roam" component={NewRoamScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
