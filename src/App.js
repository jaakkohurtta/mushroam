import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useStateValue, setLocation, setRoams } from "./context/AppState";
import dbService from "./services/database";

import Header from "./components/Header";
import MapScreen from "./components/MapScreen";
import MyRoamsScreen from "./components/MyRoamsScreen";
import Notification from "./components/Notification";

const Tab = createBottomTabNavigator();

const App = () => {
  const [{ database }, dispatch] = useStateValue();

  useEffect(() => {
    dbService.init(database).then((response) => dispatch(setRoams(response)));

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("No permission to use device location.");
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
    <>
      <NavigationContainer>
        <Notification />
        <Header title="Mushroam" resetDatabase={resetDatabase} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              height: 64,
            },
            tabBarIcon: ({ focused, color = "#000000", size = 48 }) => {
              let iconName;
              if (route.name === "Map Screen") {
                iconName = focused ? "map-marker" : "map-marker-outline";
              } else if (route.name === "My Roams Screen") {
                iconName = focused ? "view-list" : "view-list-outline";
              }
              return <MaterialCommunityIcons name={iconName} color="#000000" size={size} />;
            },
            tabBarShowLabel: false,
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
    </>
  );
};

export default App;
