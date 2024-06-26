import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ConfirmEmailPage() {
  const { email } = useLocalSearchParams();
  return (
    <Container>
      <Stack.Screen
        options={{
          animation: "slide_from_right",
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
                  source={require("../../../../../assets/back-arrow.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full h-full px-6">
        <View
          style={{ marginVertical: 115 }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <Image
            source={require("../../../../../assets/login-confirm-email.png")}
            style={{ width: 104, height: 123 }}
          />
          <View className="grid place-items-center items-center gap-2">
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

        <View className="flex w-full mb-10 flex-col items-end gap-4">
          <Button
            onPress={() => router.push("/(login)/recovery/phone")}
            style={{ width: "100%" }}
          >
            <Text>Open email</Text>
          </Button>
          <Button
            style={{ width: "100%", backgroundColor: "transparent" }}
            onPress={() => {}}
          >
            <Text className="text-[#18EAFF]">Not received email?</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
