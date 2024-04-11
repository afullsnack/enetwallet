import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";

export default function DashboardTabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#18EAFF",
          headerShown: true,
          // tabBarActiveBackgroundColor: "#0C0C12",
          tabBarActiveBackgroundColor: "#0C0C12",
          tabBarInactiveBackgroundColor: "#0C0C12",
          headerBackgroundContainerStyle: {
            backgroundColor: "#0C0C12",
            borderBottomColor: "#0C0C12",
            borderColor: "#0C0C12",
            elevation: 0,
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#0C0C12",
            borderColor: "#0C0C12",
            paddingBottom: 20,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerStyle: {
              backgroundColor: "#0C0C12",
            },
            title: "Home",
            tabBarIcon: ({ color }) => (
              <View className="flex flex-col items-center justify-center gap-1">
                <Image
                  source={require("../../../../assets/icons/tab/tab_home.png")}
                  style={{
                    width: 20,
                    height: 20,
                    margin: 4,
                    // color: color
                  }}
                />
                <Text style={{ color: color }}>Home</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            headerStyle: {
              backgroundColor: "#0C0C12",
            },
            title: "Wallet",
            tabBarIcon: ({ color }) => (
              <View className="flex flex-col items-center justify-center gap-1">
                <Image
                  source={require("../../../../assets/icons/tab/tab_wallet.png")}
                  style={{
                    width: 20,
                    height: 20,
                    margin: 4,
                    // color: color
                  }}
                />
                <Text style={{ color: color }}>Wallet</Text>
              </View>
            ),
          }}
        />
      </Tabs>
      <StatusBar networkActivityIndicatorVisible translucent style="auto" />
    </>
  );
}
