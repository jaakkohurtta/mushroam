import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import RoamCard from "./RoamCard";

import { useStateValue } from "../context/AppState";
import theme from "../theme";

const Separator = () => <View style={{ height: 4, backgroundColor: theme.colors.dark }} />;

const RoamsList = ({ navigation }) => {
  const [{ roams }, _] = useStateValue();

  return (
    <View style={styles.container}>
      <FlatList
        data={roams}
        renderItem={({ item }) => <RoamCard key={item.id} roam={item} navigation={navigation} />}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
    justifyContent: "center",
  },
  list: {
    marginTop: 4,
  },
});

export default RoamsList;
