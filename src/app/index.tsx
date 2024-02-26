import { router } from "expo-router";
import { Button, View } from "react-native";

export default function RootIndexPage() {
  return (
    <View className="h-full min-h-screen w-full flex-1">
      <View className="min-h-screen bg-[#0C0C12]  py-0 dark:bg-[#0C0C12] dark:text-white">
        <View className="container flex flex-col items-center justify-center px-4 py-20">
          <Button onPress={() => router.push("/(auth)/")} title="Go to auth" />
        </View>
      </View>
    </View>
  );
}
