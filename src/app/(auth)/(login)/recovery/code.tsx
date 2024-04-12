import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { EvilIcons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

export default function CodeScreen() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  return (
    <Container>
      <Stack.Screen
        options={{
          animation: "fade",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          title: "",
          headerLeft(props) {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                {/* <Image
                source={require("../../../../../assets/arrow-left-img.png")}
                style={{ width: 24, height: 24 }}
              /> */}
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-ful container grid min-h-screen bg-[#0C0C12] px-6 md:px-8 py-6">
        <View className="flex flex-col gap-2">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-medium text-white">
              Verification code
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <EvilIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-sm font-medium text-white/70">
            Enter verification code sent to +491 01983674
          </Text>
          <View className="mt-10 flex w-full flex-col items-center justify-center gap-3">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-[#3A4452]">Input code</Text>
              <Text className="text-[#F80F0F]">Resend code in 00 : 60s</Text>
            </View>
            <OtpInput
              numberOfDigits={6}
              focusColor="#18EAFF"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              theme={{
                // containerStyle: styles.container,
                // inputsContainerStyle: styles.inputsContainer,
                // pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: { color: "#18EAFF" },
                // focusStickStyle: styles.focusStick,
                // focusedPinCodeContainerStyle: styles.activePinCodeContainer
              }}
            />
            <View
              className="flex w-full flex-row items-center justify-end"
              style={{ marginVertical: 10 }}
            >
              <TouchableOpacity>
                <Text className="text-[#18EAFF]">Paste code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-1" />

        <Button
          style={{
            width: "100%",
            backgroundColor: "transparent",
            marginBottom: 20,
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowColor: "transparent",
          }}
        >
          <Text className="text-[#18EAFF]">Resent</Text>
        </Button>

        <Button onPress={() => router.push(`recovery/`)}>
          <Text>Verify code</Text>
        </Button>
      </View>
    </Container>
  );
}
