import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import RoamCard from "./RoamCard";

import { useStateValue } from "../context/AppState";
import theme from "../theme";

const RoamsList = ({ navigation }) => {
  const [{ roams }, _] = useStateValue();

  return (
    <>
      {roams.length > 0 ? (
        <View style={styles.container}>
          <Divider style={{ height: 2 }} />
          <FlatList
            data={roams}
            renderItem={({ item }) => (
              <RoamCard key={item.id} roam={item} navigation={navigation} />
            )}
            ItemSeparatorComponent={() => <Divider style={{ height: 2 }} />}
          />
          <Divider style={{ height: 2 }} />
        </View>
      ) : (
        <View style={styles.noContent}>
          <Text>
            You have not Roamed yet. Roams may be added via the map view by simply pressing the map.
          </Text>
          <Text>The map view can be found at the bottom bar.</Text>
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
  },
  noContent: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 32,
    paddingRight: 32,
  },
});

export default RoamsList;
