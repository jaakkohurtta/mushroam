import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

import { useStateValue, setNotification } from "../context/AppState";
import theme from "../theme";

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
    backgroundColor: `${theme.colors.primary}e0`,
  },
});

export default Notification;
