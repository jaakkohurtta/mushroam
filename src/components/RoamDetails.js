import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Caption, Subheading, Paragraph } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  getHaulDescription,
  getCloudIconName,
  getTempIconName,
  getRainIconName,
} from "../utils/descriptions";
import theme from "../theme";

const RoamDetails = ({ route, _ }) => {
  const { roam } = route.params;

  const cloudsIconName = getCloudIconName(roam.clouds);
  const tempIconName = getTempIconName(roam.avgtemp);
  const rainIconName = getRainIconName(roam.rainfal); // roam.rainfall === cumulative rainfall over the 5 days in mm
  const haulDescription = getHaulDescription(roam.haul);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Paragraph>
          On {roam.date} you harvested {haulDescription} {roam.mushroom}s
        </Paragraph>
        <Caption>{roam.vibes}</Caption>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={{ uri: `data:image/png;base64,${roam.image}` }}>
          <View style={styles.weatherContainer}>
            <View style={styles.weatherItem}>
              <MaterialCommunityIcons name={tempIconName} size={48} />
              <Subheading>{roam.avgtemp} &#8451;</Subheading>
            </View>
            <View style={styles.weatherItem}>
              <MaterialCommunityIcons name={cloudsIconName} size={48} />
              <Subheading>{roam.clouds} &#37;</Subheading>
            </View>
            <View style={styles.weatherItem}>
              <MaterialCommunityIcons name={rainIconName} size={48} />
              <Subheading>
                {roam.rainfall === -1 ? "No rain data." : `${roam.rainfall} mm`}
              </Subheading>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  weatherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: `${theme.colors.backdrop}d0`,
    padding: 16,
  },
  weatherItem: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: `${theme.colors.backdrop}d0`,
  },
  vibes: {},
});

export default RoamDetails;
