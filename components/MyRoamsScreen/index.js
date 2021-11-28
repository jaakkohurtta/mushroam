import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RoamDetails from "../RoamDetails";
import RoamsList from "../RoamsList";

const ListStack = createNativeStackNavigator();

const MyRoamsScreen = () => {
  return (
    <ListStack.Navigator>
      <ListStack.Screen name="My Roams" component={RoamsList} />
      <ListStack.Screen name="Roam" component={RoamDetails} />
    </ListStack.Navigator>
  );
};

export default MyRoamsScreen;
