import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import Animated, { useSharedValue } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function QRCode() {
  const { width } = useSafeAreaFrame();
  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          title: "Encrypted QR code",
          headerRight(props) {
            return (
              <TouchableOpacity onPress={() => router.push("(wallet)/fee")}>
                <EvilIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full flex flex-col items-center justify-center h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
        <View
          style={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 20,
            width: width * 0.95,
            height: width * 0.95,
          }}
        >
          <Image
            source={require("../../../../assets/qr_code_sample.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="contain"
          />
        </View>

        <View className="flex-1" />

        <Image
          source={require("../../../../assets/icons/shield.png")}
          style={{
            width: 35,
            height: 35,
            marginBottom: 5,
          }}
          contentFit="contain"
        />
        <View className="flex flex-col items-center justify-center w-full place-items-center">
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 24, color: "#CB5050" }}>{"\u2022"}</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                color: "#CB5050",
              }}
            >
              Never share your QR code with anyone
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 24, color: "#CB5050" }}>{"\u2022"}</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                color: "#CB5050",
              }}
            >
              Anybody with this info, can have full access to your funds
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 24, color: "#CB5050" }}>{"\u2022"}</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                color: "#CB5050",
              }}
            >
              You are responsible for the safety of your funds
            </Text>
          </View>
        </View>

        <Button
          onPress={() => {}}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Text>Download QR code</Text>
          <Image
            source={require("../../../../assets/icons/scan.png")}
            style={{
              width: 20,
              height: 20,
            }}
            contentFit="contain"
          />
        </Button>
      </View>
    </Container>
  );
}
