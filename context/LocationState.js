import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  location: {
    latitudeDelta: 0.032,
    longitudeDelta: 0.022,
  },
};

export const LocationContext = createContext([initialState, () => initialState]);

const locationReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        location: {
          ...state.location,
          ...action.payload,
        },
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

export const LocationState = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  return <LocationContext.Provider value={[state, dispatch]}>{children}</LocationContext.Provider>;
};

export const useStateValue = () => useContext(LocationContext);
