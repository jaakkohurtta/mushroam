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
