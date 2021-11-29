import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header, Overlay } from "react-native-elements";

import { CREATE_TABLE, SELECT_ALL } from "./sql";

import { useStateValue, setLocation, setRoams } from "./context/AppState";

import MapScreen from "./components/MapScreen";
import MyRoamsScreen from "./components/MyRoamsScreen";
import NewRoamScreen from "./components/NewRoamScreen";
import AlertOverlay from "./components/AlertOverlay";

import theme from "./theme";

const Tab = createBottomTabNavigator();

const App = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [{ database }, dispatch] = useStateValue();

  useEffect(() => {
    database.transaction(
      (tx) => {
        tx.executeSql(CREATE_TABLE);
      },
      null,
      selectAll
    );

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setOverlayVisible(true);
        return;
      }
      const loc = await Location.getCurrentPositionAsync();
      dispatch(setLocation(loc));
    })();
  }, []);

  const selectAll = () => {
    database.transaction((tx) => {
      tx.executeSql(SELECT_ALL, [], (_, { rows }) => dispatch(setRoams(rows._array)));
    });
  };

  return (
    <NavigationContainer>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(!overlayVisible)}>
        <AlertOverlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
      </Overlay>
      <Header
        backgroundColor={theme.colors.dark}
        centerComponent={{
          text: "Mushroam",
          style: { letterSpacing: 2, fontSize: 24, color: theme.colors.light },
        }}
      />
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveBackgroundColor: theme.colors.green,
          tabBarInactiveBackgroundColor: theme.colors.dark,
          tabBarInactiveTintColor: theme.colors.light,
          tabBarActiveTintColor: theme.colors.light,
          tabBarStyle: {
            height: 64,
          },
          tabBarLabelStyle: {
            marginTop: 2,
            padding: 6,
          },
        })}>
        <Tab.Screen options={{ headerShown: false }} name="Map Screen" component={MapScreen} />
        <Tab.Screen
          options={{ headerShown: false }}
          name="My Roams Screen"
          component={MyRoamsScreen}
        />
        <Tab.Screen
          options={{
            headerTintColor: theme.colors.light,
            headerStyle: { backgroundColor: theme.colors.medium },
            title: "Add new roam",
          }}
          name="New Roam Screen"
          component={NewRoamScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
