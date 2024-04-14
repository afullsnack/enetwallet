import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

export default function WalletCreationFee() {
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
                  source={require("../../../../assets/back-arrow.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full flex flex-col items-center gap-4 h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
        <Text className="text-white text-center">Wallet creation fee</Text>
        <Button
          title="Pay later"
          onPress={() => {
            router.push("(wallet)/slider");
          }}
        />
      </View>
    </Container>
  );
}
