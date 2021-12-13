import React from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import RoamDetails from "../RoamDetails";
import RoamsList from "../RoamsList";

const ListStack = createStackNavigator();

const MyRoamsScreen = () => {
  return (
    <ListStack.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <IconButton icon="delete" onPress={() => console.log(route.params.roam.id)} />
        ),
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
