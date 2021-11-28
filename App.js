import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapScreen from "./components/MapScreen";
import MyRoamsScreen from "./components/MyRoamsScreen";
import NewRoamScreen from "./components/NewRoamScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
