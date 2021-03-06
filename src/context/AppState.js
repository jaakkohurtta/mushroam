import React, { createContext, useContext, useReducer } from "react";
import * as SQLite from "expo-sqlite";

const initialState = {
  database: SQLite.openDatabase("myroams.db"),
  roams: [],
  location: {
    latitudeDelta: 0.032,
    longitudeDelta: 0.022,
  },
  mapSnap: null,
  mapRoams: true,
  notification: {
    show: false,
    content: null,
  },
};

export const AppContext = createContext([initialState, () => initialState]);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        location: {
          ...state.location,
          ...action.payload,
        },
      };
    case "SET_ROAMS":
      return {
        ...state,
        roams: action.payload,
      };
    case "SET_MAP_SNAP":
      return {
        ...state,
        mapSnap: action.payload,
      };
    case "SET_MAP_ROAMS":
      return {
        ...state,
        mapRoams: action.payload,
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

export const setLocation = (location) => {
  return {
    type: "SET_LOCATION",
    payload: location,
  };
};

export const setRoams = (roams) => {
  // console.log("roam action", roams);
  return {
    type: "SET_ROAMS",
    payload: roams,
  };
};

export const setMapSnap = (snap) => {
  return {
    type: "SET_MAP_SNAP",
    payload: snap,
  };
};

export const setMapRoams = (flag) => {
  return {
    type: "SET_MAP_ROAMS",
    payload: flag,
  };
};

export const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    payload: notification,
  };
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export const useStateValue = () => useContext(AppContext);
