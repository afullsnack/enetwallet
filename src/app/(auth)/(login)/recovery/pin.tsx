import { Container } from "@/components/Container";
import { Numpad } from "@/components/numpad";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

export default function PinPage() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  return (
    <Container>
      <Stack.Screen
        options={{
          animation: "fade",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          title: "Nice to see you again",
          headerTitleAlign: "center",
          headerLeft(props) {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../../../../assets/arrow-left-img.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-ful container grid min-h-screen h-screen">
        <View className="flex flex-col items-center justify-center px-6 gap-2">
          <View className="mt-10 flex w-full flex-col items-center justify-center gap-3">
            <Image
              source={require("../../../../../assets/avatar.png")}
              style={{ width: 70, height: 70 }}
              className="border border-[#18EAFF]"
            />
            <Text
              style={{
                fontWeight: "500",
                fontSize: 17,
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              @Johcee
            </Text>
            <OtpInput
              numberOfDigits={6}
              focusColor="#18EAFF"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              theme={{
                containerStyle: { justifyContent: "center" },
                inputsContainerStyle: { justifyContent: "center", gap: 8 },
                pinCodeContainerStyle: {
                  width: 12,
                  height: 12,
                  overflow: "hidden",
                  padding: 0,
                  marginTop: 80,
                  marginBottom: 30,
                },
                pinCodeTextStyle: { color: "#18EAFF" },
                focusStickStyle: { width: 4, height: 4 },
                // focusedPinCodeContainerStyle: styles.activePinCodeContainer
              }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              Use face ID or Enter PIN code
            </Text>
          </View>
        </View>
        <View className="flex-1" />

        <View className="flex w-full flex-row items-center bg-[#0B0B0E] px-6 pb-24 justify-center">
          <Numpad
            type="recovery"
            onConfirmPressed={() => {
              router.push("(main)/(tabs)/");
            }}
            onPinChange={(pin) => setText(pin)}
          />
        </View>
      </View>
    </Container>
  );
}
