import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";

import theme from "../theme";

const RoamCard = ({ roam, navigation }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        leftStyle={styles.left}
        left={() => <Avatar.Image source={{ uri: `data:image/png;base64,${roam.image}` }} />}
        right={() => (
          <IconButton
            icon="arrow-right"
            size={32}
            onPress={() => navigation.navigate("Roam Details", { roam })}
          />
        )}
        title={roam.title}
        subtitle={`half a bucket of ${roam.mushroom}s on ${roam.date}`}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 4,
  },
  left: {
    width: 64,
  },
});

export default RoamCard;
