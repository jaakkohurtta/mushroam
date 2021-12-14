import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Mapper from "../Mapper";
import NewRoamForm from "../NewRoamForm";
import theme from "../../theme";

const MapStack = createStackNavigator();

const MapScreen = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen options={{ headerShown: false }} name="Map" component={Mapper} />
      <MapStack.Screen
        options={{
          headerStyle: styles.header,
          headerTitleStyle: { fontFamily: "Quicksand_600SemiBold" },
        }}
        name="New Roam"
        component={NewRoamForm}
      />
    </MapStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.backdrop,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
});

export default MapScreen;
