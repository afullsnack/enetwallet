import { useRef } from "react";
import { AppState } from "react-native";

export const AppStateProvider = ({ children }: any) => {
  // Get app state and store it with ref object
  const appState = useRef(AppState.currentState);
  console.log(AppState.currentState, ":::AppState");

  return children;
};
