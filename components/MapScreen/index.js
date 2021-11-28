import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapView from "../MapView";
import RoamDetails from "../RoamDetails";

const MapStack = createNativeStackNavigator();

const MapScreen = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Map" component={MapView} />
      <MapStack.Screen name="Roam" component={RoamDetails} />
    </MapStack.Navigator>
  );
};

export default MapScreen;
