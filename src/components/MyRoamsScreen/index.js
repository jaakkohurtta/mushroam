import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RoamDetails from "../RoamDetails";
import RoamsList from "../RoamsList";

const ListStack = createStackNavigator();

const MyRoamsScreen = () => {
  return (
    <ListStack.Navigator screenOptions={() => ({})}>
      <ListStack.Screen name="My Roams" component={RoamsList} options={{ headerShown: false }} />
      <ListStack.Screen
        name="Roam Details"
        component={RoamDetails}
        options={({ route }) => ({ title: route.params.roam.title })}
      />
    </ListStack.Navigator>
  );
};

export default MyRoamsScreen;
