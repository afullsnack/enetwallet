import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function QRCode() {
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
              <TouchableOpacity onPress={() => router.push("")}>
                <EvilIcons name="close" size={24} color="whiee" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full flex flex-col h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../../../assets/qr_code_sample.png")}
            style={{
              width: "100%",
              height: 410,
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
          }}
          contentFit="contain"
        />
        <View className="flex flex-col gap-2 items-center justify-center">
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
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
              className="font-[nunito]"
            >
              Never share your QR code with anyone
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
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
              className="font-[nunito]"
            >
              Anybody with this info, can have full access to your funds
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
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
              className="font-[nunito]"
            >
              You are responsible for the safety of your funds
            </Text>
          </View>
        </View>

        <Button
          onPress={() => router.push("/qrcode")}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
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
