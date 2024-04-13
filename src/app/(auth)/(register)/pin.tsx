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
          animation: "slide_from_right",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          title: "",
          headerLeft(props) {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../../../assets/arrow-left-img.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-ful container grid min-h-screen bg-[#0C0C12] px-6">
        <View className="flex flex-col items-center justify-center gap-2">
          {/* <Text className="text-2xl font-medium text-white">
                Create Pin
              </Text> */}

          <View className="mt-10 flex w-full flex-col items-center justify-center gap-3">
            <Image
              source={require("../../../../assets/avatar.png")}
              style={{ width: 70, height: 70 }}
              className="border border-[#18EAFF]"
            />
            <Text className="mb-4 text-center text-sm font-medium text-white/70">
              You will need this pin to login and confirm transactions Make sure
              it is difficult for others to guess and easy for you to remember
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
                  // marginHorizontal: 2,
                },
                pinCodeTextStyle: { color: "#18EAFF" },
                focusStickStyle: { width: 4, height: 4 },
                // focusedPinCodeContainerStyle: styles.activePinCodeContainer
              }}
            />
            <Text className="mb-4 text-center text-sm font-medium text-white/70">
              Enter a 6-digit pin
            </Text>
          </View>
        </View>
        {/* <View className="flex-1" /> */}

        <View className="flex w-full flex-1 flex-row items-center justify-center">
          <Numpad
            onConfirmPressed={() => {
              router.push("(backup)/upload");
            }}
            onPinChange={(pin) => setText(pin)}
          />
        </View>
      </View>
    </Container>
  );
}
