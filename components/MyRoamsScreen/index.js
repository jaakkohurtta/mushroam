import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RoamDetails from "../RoamDetails";
import RoamsList from "../RoamsList";

import theme from "../../theme";

const ListStack = createStackNavigator();

const MyRoamsScreen = () => {
  return (
    <ListStack.Navigator
      screenOptions={() => ({
        headerTintColor: theme.colors.light,
        headerStyle: { backgroundColor: theme.colors.medium },
      })}>
      <ListStack.Screen options={{ headerShown: false }} name="My Roams" component={RoamsList} />
      <ListStack.Screen name="Roam" component={RoamDetails} />
    </ListStack.Navigator>
  );
};

export default MyRoamsScreen;
