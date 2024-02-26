import { Button } from "@/components/button";
import Input from "@/components/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const [text, setText] = useState("");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-ful container min-h-screen bg-[#0C0C12] px-6 md:px-8">
            <View className="flex flex-col gap-2">
              <Text className="text-2xl font-medium text-white">
                Enter Phone number
              </Text>
              <Text className="text-sm font-medium text-white/70">
                The number must match with the Phone number your registered your
                wallet
              </Text>
              <Input
                prefix={<Text className="text-white">+234</Text>}
                props={{
                  value: text,
                  placeholder: "Phone number",
                  onChangeText: setText,
                  style: { color: "white" },
                  keyboardType: "default",
                }}
              />
            </View>
            <View className="flex-1" />
            <View className="flex w-full flex-1">
              <TouchableOpacity className="flex w-full flex-row items-center justify-between rounded-xl bg-slate-600/30 p-4">
                <Text className="text-white">
                  Import log in details using QR Codee
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
                <Button onPress={() => router.push("/recovery/code")}>
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
