import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Stack, router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

export default function ReferralPage() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

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
      <View className="w-ful container grid min-h-screen bg-[#0C0C12] px-6 md:px-8">
        <View className="flex flex-col gap-2">
          <Text className="text-2xl font-medium text-white">
            Referral code <Text className="text-[#B08BFF]">(optional)</Text>
          </Text>
          {/* <Text className="text-sm font-medium text-white/70">
                The Email must match with the Email your registered your wallet
                with
              </Text> */}
          <Input
            ref={inputRef}
            // placeholder="Username"
            outline={false}
            style={{
              color: "#01EAD4",
              // textDecorationColor: "#01EAD4",
              fontSize: 17,
              fontWeight: "500",
              height: 45,
            }}
            cursorColor="white"
            defaultValue={text}
            inputMode="text"
            onChangeText={(text) => setText(text)}
            keyboardType="default"
          />
        </View>
        <View className="flex-1" />

        <View className="flex w-full flex-1 flex-row items-center justify-center">
          <View className="flex-1">
            {/* <Text className="text-white">
                  By pressing continue, you agree to our Terms & Conditions and
                  Policy
                </Text> */}
          </View>
          <View className="grid w-1/3">
            <Button onPress={() => router.push(`/email`)}>
              <Text>Skip</Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
}
