import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ConfirmEmailPage() {
  const params = useLocalSearchParams();
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
      <View className="w-full grid min-h-screen h-screen px-6">
        <View
          style={{ paddingVertical: 60, marginBottom: "35%" }}
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
              We sent a confirmation code to your email.
            </Text>
            <Text className="text-sm font-medium text-white/80">
              {params?.email ?? (params?.data as Record<string, any>)?.email}
            </Text>
          </View>
        </View>

        {/* <View className="flex-1" /> */}

        <View className="flex flex-col w-full gap-4 items-center h-auto">
          <Button
            onPress={() =>
              router.push({
                pathname: "/(register)/password",
                params: {
                  data: {
                    ...(params?.data as Record<string, any>),
                  },
                },
              })
            }
            style={{ width: "100%" }}
          >
            <Text>Continue</Text>
          </Button>
          <Button
            style={{
              width: "100%",
              backgroundColor: "transparent",
              shadowOpacity: 0,
              shadowRadius: 0,
            }}
            onPress={() => {
              // TODO: carry out resend logic
            }}
          >
            <Text className="text-[#18EAFF]">Not received email?</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
