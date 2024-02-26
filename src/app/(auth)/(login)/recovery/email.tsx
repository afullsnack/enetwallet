import Input from "@/components/input";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { router } from "expo-router";

export default function LoginPage() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="container grid min-h-screen w-full bg-[#0C0C12] px-6 md:px-8">
            <View className="flex h-full flex-col gap-2 pb-4">
              <Text className="text-2xl font-medium text-white">
                Enter your Email
              </Text>
              <Text className="text-sm font-medium text-white/70">
                The Email must match with the Email your registered your wallet
                with
              </Text>
              <Input
                inputRef={inputRef}
                props={{
                  placeholder: "Email address",
                  style: { color: "white" },
                  defaultValue: text,
                  inputMode: "email",
                  onChangeText: setText,
                  keyboardType: "email-address",
                }}
              />
            </View>
            <View className="flex-1" />
            <View className="flex w-full flex-1">
              <TouchableOpacity className="flex w-full flex-row items-center justify-between rounded-xl bg-slate-600/30 p-4">
                <Text className="text-white">
                  Import log in details using QR Code
                </Text>
                <View className="rounded-full bg-white p-2">
                  <MaterialCommunityIcons
                    name="line-scan"
                    size={20}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex w-full flex-1 items-end">
              <View className="grid w-1/2">
                <Button
                  onPress={() =>
                    router.push(`/confirm/${text ?? "miraclef60@gmail.com"}`)
                  }
                >
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
