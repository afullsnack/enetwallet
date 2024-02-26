import { Button } from "@/components/button";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecoveryPage() {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="container grid min-h-screen w-full bg-[#0C0C12] px-6 md:px-8">
            <Stack.Screen
              options={{
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
                        source={require("../../../../../assets/arrow-left-img.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </TouchableOpacity>
                  );
                },
              }}
            />
            <View className="flex h-full flex-col items-center justify-center gap-2 pb-20">
              <View className="my-10 items-center gap-4">
                <Image
                  source={require("../../../../../assets/recovery.png")}
                  style={{ width: 150, height: 150 }}
                />
                <Text className="text-xl font-medium text-white">
                  Import recovery key{" "}
                </Text>
                <Text className="max-w-[300px] text-center text-sm font-light text-white">
                  Your wallet will be available for use 2hrs after successful
                  recovery
                </Text>
              </View>

              <View className="flex-1" />
              <View className="gap-4">
                <Button onPress={() => router.push("/email")}>
                  <Text>Start recovery process</Text>
                </Button>
                <Button secondary outline>
                  <Text className="text-[#18EAFF]">Restore with guardian</Text>
                </Button>
                <Button secondary outline>
                  <Text className="text-[#18EAFF]">
                    Recover with encrypted keys
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
