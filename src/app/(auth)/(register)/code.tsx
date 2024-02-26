import { Button } from "@/components/button";
import Input from "@/components/input";
import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";

export default function PinPage() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-ful container grid min-h-screen bg-[#0C0C12] px-6 md:px-8">
            <View className="flex flex-col gap-2">
              <Text className="text-2xl font-medium text-white">
                Verification code
              </Text>
              <Text className="text-sm font-medium text-white/70">
                Enter verification code sent to +491 01983674
              </Text>
              <View className="mt-10 flex w-full flex-col items-center justify-center gap-3">
                <View className="flex w-full flex-row items-center justify-between">
                  <Text className="text-gray-100/60">Input code</Text>
                  <Text className="text-[#F80F0F]">
                    Resend code in 00 : 60s
                  </Text>
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
              </View>
            </View>
            <View className="flex-1" />

            <View className="flex w-full flex-1 flex-col items-center justify-center gap-4">
              <View className="">
                <Text className="text-white">
                  Phone number is not correct?{" "}
                  <Link href="/(register)/phone" className="text-[#18EAFF]">
                    Edit
                  </Link>
                </Text>
              </View>
              <View className="grid w-full">
                <Button onPress={() => router.push(`/(register)/pin`)}>
                  <Text>Verify code</Text>
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
