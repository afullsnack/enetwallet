import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { authenticate } from "@/utils/localAuth";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
// import Animated, { useSharedValue } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function EnableFaceId() {
  const params = useLocalSearchParams();
  const { width } = useSafeAreaFrame();
  return (
    <Container>
      <Stack.Screen
        options={{
          animation: "slide_from_right",
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
          source={require("../../../../assets/wallet/face_id.png")}
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
          Enable Face ID
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
          Enable face ID to easily facilitate more convenient Login
          verifications, complete transactions
        </Text>

        <View className="flex-1" />

        <Button
          onPress={async () => {
            const authenticationResult = await authenticate();
            if (authenticationResult.success) {
              Alert.alert("Biometric enabled!");
            } else {
              Alert.alert("Biometric authentication failed!");
            }

            router.replace({
              pathname: "/(auth)/(login)/main",
              params: { ...params },
            });
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
          <Text style={{ color: "white", fontSize: 14 }}>Activate Now</Text>
        </Button>
        <Button
          onPress={() => {
            router.replace({
              pathname: "/(auth)/(login)/main",
              params: { ...params },
            });
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
          <Text style={{ color: "#3A4452", fontSize: 14 }}>Activate Later</Text>
        </Button>
      </View>
    </Container>
  );
}
