import ModalSheet from "@/components/bottom-sheet";
import { Button } from "@/components/button";
import Input from "@/components/input";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhonePage() {
  const [text, setText] = useState("");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <GestureHandlerRootView className="flex-1 bg-red-400">
            <View className="container min-h-screen w-full flex-1 bg-[#0C0C12] px-6 md:px-8">
              <View className="flex flex-col gap-2">
                <Text className="text-2xl font-medium text-white">
                  Enter Phone number
                </Text>
                {/* <Text className="text-sm font-medium text-white/70">
                The number must match with the Phone number your registered your
                wallet
              </Text> */}
                <Input
                  props={{
                    value: text,
                    placeholder: "Phone number",
                    onChangeText: setText,
                    style: { color: "white" },
                    inputMode: "numeric",
                    keyboardType: "number-pad",
                  }}
                />
              </View>
              <View className="flex-1" />

              <View className="flex w-full flex-1 flex-row items-center justify-center">
                <View className="flex-1">
                  <Text className="text-white">
                    Why we need your phone number.
                  </Text>
                </View>
                <View className="grid w-1/3">
                  <Button
                    onPress={() => {
                      router.push("/code");
                    }}
                  >
                    <Text>Continue</Text>
                  </Button>
                </View>
              </View>
            </View>
          </GestureHandlerRootView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
