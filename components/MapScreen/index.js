import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Mapper from "../Mapper";
import RoamDetails from "../RoamDetails";

import theme from "../../theme";

const MapStack = createStackNavigator();

const MapScreen = () => {
  return (
    <MapStack.Navigator
      screenOptions={() => ({
        headerTintColor: theme.colors.cultured,
        headerStyle: { backgroundColor: theme.colors.xanadu },
      })}>
      <MapStack.Screen name="Map" component={Mapper} />
      <MapStack.Screen name="Roam" component={RoamDetails} />
    </MapStack.Navigator>
  );
};

export default MapScreen;
