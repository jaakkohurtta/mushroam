import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import theme from "../theme";

const AlertOverlay = ({ overlayVisible, setOverlayVisible }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textField}>No permission to use device location.</Text>
      <Button
        buttonStyle={{
          backgroundColor: theme.colors.paleBlue,
          paddingLeft: 16,
          paddingRight: 16,
        }}
        title="OK"
        onPress={() => setOverlayVisible(!overlayVisible)}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textField: {
    marginBottom: 16,
  },
});

export default AlertOverlay;
