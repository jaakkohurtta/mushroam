export const getHaulDescription = (haul) => {
  let desc = "";

  if (haul === 0) {
    desc = "Some";
  } else if (haul < 0.2) {
    desc = "a handful of";
  } else if (haul < 0.4) {
    desc = "two handfuls of";
  } else if (haul < 0.7) {
    desc = "half a basket of";
  } else if (haul < 1) {
    desc = "almost a full basket of";
  } else {
    desc = `${Math.floor(haul)} basket${haul >= 2 ? "s" : ""} of`;
  }

  return desc;
};

export const getCloudIconName = (clouds) => {
  let icon = "";

  if (clouds >= 75) {
    icon = "weather-cloudy";
  } else if (clouds >= 25) {
    icon = "weather-partly-cloudy";
  } else {
    icon = "weather-sunny";
  }

  return icon;
};

export const getTempIconName = (avgtemp) => {
  let icon = "";

  if (avgtemp > 15) {
    icon = "thermometer-high";
  } else if (avgtemp > 5) {
    icon = "thermometer";
  } else {
    icon = "thermometer-low";
  }

  return icon;
};

export const getRainIconName = (rainfall) => {
  let icon = "";

  if (rainfall > 20) {
    icon = "weather-pouring";
  } else if (rainfall >= 0) {
    icon = "weather-rainy";
  } else {
    icon = "help-circle-outline";
  }

  return icon;
};
