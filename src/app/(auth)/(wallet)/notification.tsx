import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
// import Animated, { useSharedValue } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function EnableNotification() {
  const { width } = useSafeAreaFrame();
  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          title: "Encrypted QR code",
          headerRight(props) {
            return (
              <TouchableOpacity onPress={() => router.push("(wallet)/fee")}>
                <EvilIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full flex flex-col gap-8 items-center justify-center h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
        <Image
          source={require("../../../../assets/wallet/notification_speaker.png")}
          style={{
            width: 104,
            height: 102,
            marginTop: 150,
          }}
          contentFit="contain"
        />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "white",
            textAlign: "center",
            maxWidth: 250,
          }}
        >
          Turn of notification
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "400",
            color: "#3A4452",
            textAlign: "center",
            maxWidth: 200,
          }}
        >
          Get notified about important events and actions on your wallet
        </Text>

        <View className="flex-1" />

        <Button
          onPress={() => {
            router.push("(wallet)/face_id");
          }}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>Turn on</Text>
        </Button>
        <Button
          onPress={() => {
            router.push("(wallet)/face_id");
          }}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 10,
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ color: "#3A4452", fontSize: 14 }}>Skip</Text>
        </Button>
      </View>
    </Container>
  );
}
