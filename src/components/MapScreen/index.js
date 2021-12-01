import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Mapper from "../Mapper";
import RoamDetails from "../RoamDetails";
import NewRoamScreen from "../NewRoamScreen";

const MapStack = createStackNavigator();

const MapScreen = () => {
  return (
    <MapStack.Navigator screenOptions={() => ({})}>
      <MapStack.Screen options={{ headerShown: false }} name="Map" component={Mapper} />
      <MapStack.Screen name="Roam" component={RoamDetails} />
      <MapStack.Screen name="New Roam" component={NewRoamScreen} />
    </MapStack.Navigator>
  );
};

export default MapScreen;
