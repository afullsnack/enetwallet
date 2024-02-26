import { Button } from "@/components/button";
import Input from "@/components/input";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function LoginIndexPage() {
  // const { top } = useSafeAreaInsets();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-ful container min-h-screen bg-[#0C0C12] px-6 md:px-8">
            <View className="flex flex-col items-center gap-2">
              <View className="my-5 flex flex-row items-center justify-center">
                <View className="mr-1 h-1 w-1 rounded-full bg-white" />
                <Text className="text-xl font-medium leading-snug tracking-normal text-white">
                  EnetWallet{" "}
                </Text>
                <View className="h-1 w-1 rounded-full bg-white" />
              </View>
              <View className="my-4">
                <Image
                  source={require("../../../../assets/onboarding-1.png")}
                  style={{ width: 210, height: 226 }}
                  className="bg-contain"
                />
              </View>
              <Input
                props={{
                  value: identifier,
                  placeholder: "Phone or Email Address",
                  onChangeText: setIdentifier,
                  keyboardType: "default",
                }}
              />
              <Input
                props={{
                  value: password,
                  placeholder: "Password",
                  onChangeText: setPassword,
                  keyboardType: "default",
                }}
              />
              <Button
                onPress={() => {
                  console.log(identifier, password, ":::PAssword");
                }}
              >
                <Text>Login</Text>
              </Button>
              <Link href="/recovery/" className="mt-5">
                <Text className="text-[#18EAFF]">Forgot password?</Text>
              </Link>

              <View className="mt-4 grid gap-8">
                <View className="flex flex-row items-center justify-center gap-4">
                  <View className="h-0.5 w-full bg-white/60" />
                  <Text className="text-white">Get started</Text>
                  <View className="h-0.5 w-full bg-white/60" />
                </View>
                <View className="flex flex-row items-center justify-center gap-4">
                  <TouchableOpacity className="rounded-2xl border border-[#18EAFF] p-2">
                    <Image
                      source={require("../../../../assets/socials-1.png")}
                      style={{ width: 20, height: 20 }}
                      className="bg-contain"
                    />
                  </TouchableOpacity>
                  <View className="h-full w-0.5 bg-white/60" />
                  <TouchableOpacity className="rounded-2xl border border-[#18EAFF] p-2">
                    <Image
                      source={require("../../../../assets/socials-2.png")}
                      style={{ width: 20, height: 20 }}
                      className="bg-contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
