import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { useStateValue } from "../context/AppState";

import theme from "../theme";

const RoamCard = ({ roam, navigation }) => {
  const [{ location }, _] = useStateValue();

  return (
    <ListItem>
      <View style={styles.map}></View>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{roam.title}</ListItem.Title>
        <View style={styles.subtitle}>
          <Text>Pvm</Text>
          <Text>Haul</Text>
          <Text>Type</Text>
        </View>
      </ListItem.Content>
      <Icon
        name="arrow-forward"
        type="ionicon"
        size={24}
        color={theme.colors.medium}
        onPress={() => navigation.navigate("Roam Details", { roam })}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  subtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  map: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.dark,
  },
});

export default RoamCard;

/*
    <Pressable onPress={() => navigation.navigate("Roam Details", { roam })}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{roam.title}</Text>
          <Text style={styles.header}>2.10.2021</Text>
        </View>
      </View>
    </Pressable>

*/
