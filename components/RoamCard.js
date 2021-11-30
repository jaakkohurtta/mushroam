import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image, ListItem, Icon } from "react-native-elements";

import theme from "../theme";

const RoamCard = ({ roam, navigation }) => {
  return (
    <ListItem containerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: `data:image/png;base64,${roam.image}` }} />
      <ListItem.Content>
        <ListItem.Title sty le={styles.title}>
          {roam.title}
        </ListItem.Title>
        <View style={styles.subtitle}>
          <Text>{roam.date}</Text>
          <Text>Haul</Text>
          <Text>Type</Text>
        </View>
      </ListItem.Content>
      <Icon
        name="arrow-forward"
        type="ionicon"
        size={32}
        color={theme.colors.medium}
        onPress={() => navigation.navigate("Roam Details", { roam })}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderColor: theme.colors.medium,
    borderWidth: 2,
  },
});

export default RoamCard;
