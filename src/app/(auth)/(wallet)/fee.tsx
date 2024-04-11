import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function WalletCreationFee() {
  return (
    <Container>
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
