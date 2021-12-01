import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";

import theme from "../theme";

const RoamCard = ({ roam, navigation }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        leftStyle={styles.avatar}
        left={() => <Avatar.Image source={{ uri: `data:image/png;base64,${roam.image}` }} />}
        right={() => (
          <IconButton
            icon="arrow-right"
            size={32}
            onPress={() => navigation.navigate("Roam Details", { roam })}
          />
        )}
        title={roam.title}
        subtitle={`half a bucket of chantarels on ${roam.date}`}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 4,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 28,
    backgroundColor: theme.colors.text,
  },
});

export default RoamCard;
