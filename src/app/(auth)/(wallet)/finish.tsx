import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
// import Animated, { useSharedValue } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function WalletFinish() {
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
      <View className="w-full flex flex-col gap-6 items-center justify-center h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
        <Image
          source={require("../../../../assets/wallet/wallet.png")}
          style={{
            width: 85,
            height: 90,
            marginTop: 100,
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
          Your Enetwallet has been created successfully
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
          Your Enetwallet (0x5a6...67dca) is available on these following chains
        </Text>

        <Image
          source={require("../../../../assets/wallet/networks.png")}
          style={{
            width: width,
            height: 188,
            marginBottom: 5,
            marginTop: 15,
          }}
          contentFit="contain"
        />

        <View className="flex-1" />

        <Button
          onPress={() => {
            router.push("(wallet)/notification");
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
          <Text style={{ color: "white", fontSize: 14 }}>Continue</Text>
        </Button>
      </View>
    </Container>
  );
}
