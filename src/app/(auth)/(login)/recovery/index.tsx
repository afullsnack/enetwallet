import { Container } from "@/components/Container";
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

export default function RecoveryPage() {
  return (
    <Container>
      <View className="container grid min-h-screen w-full bg-[#0C0C12] px-6 md:px-8">
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
        <View className="flex h-full flex-col items-center justify-center gap-2 pb-28">
          <View className="my-10 items-center gap-8" style={{ marginTop: 100 }}>
            <Image
              source={require("../../../../../assets/recovery.png")}
              style={{ width: 150, height: 150 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
              }}
            >
              Import recovery key{" "}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "white",
                maxWidth: 230,
                lineHeight: 17,
                textAlign: "center",
              }}
            >
              Your wallet will be available for use 2hrs after successful
              recovery
            </Text>
          </View>

          <View className="flex-1" />
          <View className="gap-4 w-full">
            <Button
              onPress={() => router.push("recovery/pin")}
              style={{
                width: "100%",
                backgroundColor: "rgba(24, 234, 255, 0.8)",
              }}
            >
              <Text>Start recovery process</Text>
            </Button>

            <Button
              style={{
                width: "100%",
                borderColor: "#49515D",
                borderWidth: 1,
                backgroundColor: "transparent",
              }}
            >
              <Text style={{ color: "#49515D" }}>
                Recover with encrypted keys
              </Text>
            </Button>
            <Button
              style={{
                width: "100%",
                borderColor: "#49515D",
                borderWidth: 1,
                backgroundColor: "transparent",
              }}
            >
              <Text style={{ color: "#49515D" }}>Restore with guardian</Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
}
