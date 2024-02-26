import { Button } from "@/components/button";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmEmailPage() {
  const { email } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <View className="w-ful container min-h-screen bg-[#0C0C12] px-6">
        <View className="mt-12 flex flex-col items-center justify-center gap-8">
          <Image
            source={require("../../../../../assets/login-confirm-email.png")}
            style={{ width: 104, height: 123 }}
          />
          <View className="grid place-items-center items-center">
            <Text className="text-2xl font-medium text-white">
              Confirm your email
            </Text>
            <Text className="text-sm font-medium text-white/50">
              We sent you a link to your email.
            </Text>
            <Text className="text-sm font-medium text-white/80">{email}</Text>
          </View>
        </View>
        <View className="flex-1" />
        <View className="flex w-full flex-1 flex-col items-end gap-4">
          <Button onPress={() => {}}>
            <Text>Open email</Text>
          </Button>
          <Button secondary onPress={() => router.push("/(register)/phone")}>
            <Text className="text-[#18EAFF]">Not received email?</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
