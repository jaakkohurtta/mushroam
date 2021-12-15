import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Modal, Subheading, Text } from "react-native-paper";

import { useStateValue, setNotification, setRoams } from "../context/AppState";
import dbService from "../services/database";

import theme from "../theme";

const SettingsModal = ({ showSettings, setShowSettings }) => {
  const [{ database }, dispatch] = useStateValue();
  const hideModal = () => setShowSettings(false);

  const handleDeleteData = () => {
    Alert.alert("Delete your Roams?", "This action can not be undone.", [
      {
        text: "Yes",
        onPress: () => {
          dbService.dropTable(database);
          dbService.init(database).then((response) => {
            dispatch(setRoams(response));
            dispatch(setNotification({ show: true, content: "User data permanently deleted." }));
            hideModal();
          });
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <Modal visible={showSettings} onDismiss={hideModal} contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mushroam</Text>
        <Subheading>version 0.1.0 / 17.12.2021</Subheading>
        <Text>Simple app to document yours mushrooming in the wild.</Text>
      </View>
      <View style={styles.content}>
        <Button
          mode="contained"
          icon="delete-outline"
          color={theme.colors.accent}
          onPress={() => handleDeleteData()}>
          Delete your data
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.backdrop,
    padding: 16,
    height: 300,
  },
  title: {
    fontSize: 48,
    fontFamily: "PermanentMarker_400Regular",
  },
  content: {
    alignItems: "center",
  },
});

export default SettingsModal;
