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
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReferralPage() {
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
                Referral code (optional)
              </Text>
              {/* <Text className="text-sm font-medium text-white/70">
                The Email must match with the Email your registered your wallet
                with
              </Text> */}
              <Input
                inputRef={inputRef}
                props={{
                  placeholder: "Username",
                  style: { color: "white" },
                  defaultValue: text,
                  inputMode: "text",
                  onChangeText: setText,
                  keyboardType: "default",
                }}
                // prompt={
                //   <Text className="text-white">Username is available </Text>
                // }
              />
            </View>
            <View className="flex-1" />

            <View className="flex w-full flex-1 flex-row items-center justify-center">
              <View className="flex-1">
                {/* <Text className="text-white">
                  By pressing continue, you agree to our Terms & Conditions and
                  Policy
                </Text> */}
              </View>
              <View className="grid w-1/3">
                <Button onPress={() => router.push(`/(register)/email`)}>
                  <Text>Continue</Text>
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
