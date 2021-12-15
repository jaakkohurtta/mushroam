import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { IconButton, Text, Title, Subheading } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { getHaulDescription } from "../utils/descriptions";

import theme from "../theme";

const RoamCard = ({ roam, navigation }) => {
  const haulDescription = getHaulDescription(roam.haul);

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[theme.mushrooms[roam.colorid], theme.colors.surface, theme.colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.left}>
          <Image style={styles.image} source={{ uri: `data:image/png;base64,${roam.image}` }} />
        </View>
        <View style={styles.center}>
          <Title>{roam.title}</Title>
          <Subheading>{roam.date}</Subheading>
          <Text>
            {haulDescription} {roam.mushroom}s
          </Text>
        </View>
        <View style={styles.right}>
          <IconButton
            icon="arrow-right"
            size={32}
            color={theme.mushrooms[roam.colorid]}
            onPress={() => navigation.navigate("Roam Details", { roam })}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: "100%",
  },
  gradient: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 4,
    paddingRight: 4,
  },
  image: {
    width: 72,
    height: 72,
    borderWidth: 4,
    borderColor: theme.colors.surface,
    borderRadius: 36,
  },
  left: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 4,
  },
  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RoamCard;
