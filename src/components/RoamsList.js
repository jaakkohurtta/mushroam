import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

import RoamCard from "./RoamCard";

import { useStateValue } from "../context/AppState";
import theme from "../theme";

const RoamsList = ({ navigation }) => {
  const [{ roams }, _] = useStateValue();

  return (
    <View style={styles.container}>
      <Divider style={{ height: 2 }} />
      <FlatList
        data={roams}
        renderItem={({ item }) => <RoamCard key={item.id} roam={item} navigation={navigation} />}
        ItemSeparatorComponent={() => <Divider style={{ height: 2 }} />}
      />
      <Divider style={{ height: 2 }} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
  },
  list: {
    marginTop: 4,
  },
});

export default RoamsList;
