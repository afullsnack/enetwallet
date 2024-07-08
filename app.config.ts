import type {
  ConfigContext, ExpoConfig
} from "@expo/config";

import {
  ClientEnv, Env
} from "./env";



export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  "scheme": "org.enetwallet.enet",
  "userInterfaceStyle": "automatic",
  "orientation": "default",
  "icon": "./assets/icon.png",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#0B0B0E"
  },
  "backgroundColor": "#0C0C12",
  "web": {
    "output": "static",
    "bundler": "metro"
  },
  "plugins": [
    [
      "expo-build-properties",
      {
        "android": {
          "usesCleartextTraffic": true
        },
        "ios": {}
      }
    ],
    [
      "expo-router",
      {
        "origin": "https://n"
      }
    ],
    [
      "expo-local-authentication",
      {
        "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID."
      }
    ]
  ],
  "name": "enetwallet",
  "slug": "enetwallet",
  "android": {
    "package": "org.enetwallet.enet",
    "permissions": [
      "android.permission.USE_BIOMETRIC",
      "android.permission.USE_FINGERPRINT"
    ]
  },
  "ios": {
    "bundleIdentifier": Env.BUNDLE_ID ?? "org.enetwallet.enet",
    "supportsTablet": false,
    "infoPlist": {
      "NSFaceIDUsageDescription": "Allow $(PRODUCT_NAME) to use Face ID."
    }
  },
  "runtimeVersion": {
    "policy": "appVersion"
  },
  "owner": "fullsnack_mimi",
  "extra": {
    ...ClientEnv,
    "router": {
      "origin": "https://n"
    },
    "eas": {
      "projectId": "a26b4804-aade-45d1-b362-6369527cfdfd"
    }
  },
  "updates": {
    "url": "https://u.expo.dev/a26b4804-aade-45d1-b362-6369527cfdfd",
    requestHeaders: {
      "expo-channel-name": "preview",
    },

  }
});
