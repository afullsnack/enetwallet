import { MMKV } from "react-native-mmkv";
import * as React from "react";
import { Platform } from "react-native";

export const secureStorage = new MMKV({
  id: "enetwallet-app",
  // encryptionKey: process.env.LOCAL_STORE_ENC_KEY,
});

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

// Custom use state hook to listen for loading effects when storing data
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export function setStorageItem(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      secureStorage.delete(key);
    } else {
      secureStorage.set(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      const value = secureStorage.getString(key);
      setState(value);
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItem(key, value);
    },
    [key],
  );

  return [state, setValue];
}
