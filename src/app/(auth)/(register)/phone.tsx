import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PhonePage() {
  const [phone, setPhone] = useState("");

  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          title: "",
          headerLeft(props) {
            return (
              <TouchableOpacity {...props} onPress={() => router.back()}>
                <Image
                  source={require("../../../../assets/arrow-left-img.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
          headerRight(props) {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  router.push("/code");
                }}
              >
                <Text className="text-[#BEE9E5]">Skip</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="container min-h-screen w-full flex-1 bg-[#0C0C12] px-6 md:px-8">
        <View className="flex flex-col gap-2">
          <Text className="text-2xl font-medium text-white">
            Enter Phone number
          </Text>
          {/* <Text className="text-sm font-medium text-white/70">
                The number must match with the Phone number your registered your
                wallet
              </Text> */}
          <Input
            outline={false}
            prefix={
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "700",
                  marginRight: 5,
                }}
              >
                🇳🇬 +234
              </Text>
            }
            style={{
              color: "#01EAD4",
              // textDecorationColor: "#01EAD4",
              fontSize: 17,
              fontWeight: "500",
              height: 45,
            }}
            cursorColor="white"
            defaultValue={phone}
            inputMode="numeric"
            onChangeText={(text) => setPhone(text)}
            keyboardType="number-pad"
          />
        </View>
        <View className="flex-1" />

        <View className="flex w-full flex-1 flex-row items-center justify-center">
          <View className="flex-1">
            <Text className="text-[#BEE9E5]">
              Why we need your phone number.
            </Text>
          </View>
          <View className="grid w-1/3">
            <Button
              onPress={() => {
                router.push("/code");
              }}
            >
              <Text>Continue</Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
}
