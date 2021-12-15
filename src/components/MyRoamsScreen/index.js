import React from "react";
import { Alert, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import { setRoams, setNotification, useStateValue } from "../../context/AppState";
import dbService from "../../services/database";

import RoamDetails from "../RoamDetails";
import RoamsList from "../RoamsList";

import theme from "../../theme";

const ListStack = createStackNavigator();

const MyRoamsScreen = ({ navigation }) => {
  const [{ database }, dispatch] = useStateValue();

  const handleDeleteRoam = async (id) => {
    Alert.alert("Delete Roam?", "Are you sure? This can not be undone.", [
      {
        text: "Yes",
        onPress: async () => {
          const updatedRoams = await dbService.deleteById(database, id);
          dispatch(setRoams(updatedRoams));
          dispatch(setNotification({ show: true, content: "Roam deleted." }));
          navigation.navigate("My Roams");
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };

  return (
    <ListStack.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <IconButton icon="delete" onPress={() => handleDeleteRoam(route.params.roam.id)} />
        ),
      })}
      initialRouteName="My Roams">
      <ListStack.Screen name="My Roams" component={RoamsList} options={{ headerShown: false }} />
      <ListStack.Screen
        name="Roam Details"
        options={({ route }) => ({
          title: route.params.roam.title,
          headerStyle: styles.header,
        })}
        component={RoamDetails}
      />
    </ListStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.backdrop,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
});

export default MyRoamsScreen;
