import React from "react";
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
            tabBarIcon: ({ color, focused }) => (
              <View className="flex flex-col items-center justify-center gap-1">
                {focused ? (
                  <Image
                    source={require("../../../../assets/icons/tab/home_active.png")}
                    style={{
                      width: 20,
                      height: 20,
                      margin: 4,
                      // color: color
                    }}
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/icons/tab/home.png")}
                    style={{
                      width: 20,
                      height: 20,
                      margin: 4,
                      // color: color
                    }}
                  />
                )}
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
            headerShown: false,
            title: "Wallet",
            tabBarIcon: ({ color, focused }) => (
              <View className="flex flex-col items-center justify-center gap-1">
                {focused ? (
                  <Image
                    source={require("../../../../assets/icons/tab/wallet_active.png")}
                    style={{
                      width: 20,
                      height: 20,
                      margin: 4,
                      // color: color
                    }}
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/icons/tab/wallet.png")}
                    style={{
                      width: 20,
                      height: 20,
                      margin: 4,
                      // color: color
                    }}
                  />
                )}
                <Text style={{ color: color }}>Wallet</Text>
              </View>
            ),
          }}
        />
      </Tabs>
      <StatusBar
        networkActivityIndicatorVisible={true}
        translucent
        hidden={false}
        backgroundColor="#0C0C12"
        style="auto"
      />
    </>
  );
}
