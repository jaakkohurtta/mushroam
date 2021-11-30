import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Mapper from "../Mapper";
import RoamDetails from "../RoamDetails";
import NewRoamScreen from "../NewRoamScreen";

import theme from "../../theme";

const MapStack = createStackNavigator();

const MapScreen = () => {
  return (
    <MapStack.Navigator
      screenOptions={() => ({
        headerTintColor: theme.colors.light,
        headerStyle: { backgroundColor: theme.colors.medium },
      })}>
      <MapStack.Screen options={{ headerShown: false }} name="Map" component={Mapper} />
      <MapStack.Screen name="Roam" component={RoamDetails} />
      <MapStack.Screen name="New Roam" component={NewRoamScreen} />
    </MapStack.Navigator>
  );
};

export default MapScreen;
