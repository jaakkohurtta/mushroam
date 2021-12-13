import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

import { useStateValue, setNotification } from "../context/AppState";

const Notification = () => {
  const [{ notification }, dispatch] = useStateValue();

  const handleDismiss = () => dispatch(setNotification({ show: false, content: null }));

  return (
    <Snackbar
      visible={notification.show}
      onDismiss={handleDismiss}
      duration={4000}
      style={styles.snack}>
      {notification.content}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snack: {
    marginBottom: 70,
    backgroundColor: "#000000d0",
  },
});

export default Notification;
