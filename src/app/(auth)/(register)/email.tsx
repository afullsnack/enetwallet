import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Stack, router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);

  return (
    <>
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
      <Container>
        <View className="w-full grid min-h-screen px-6">
          <View className="flex flex-col gap-2">
            <Text className="text-2xl font-medium text-white">
              Enter your Email
            </Text>
            <Input
              ref={inputRef}
              outline={false}
              placeholder="Email address"
              placeholderTextColor="#ADB5BF"
              style={{
                color: "#01EAD4",
                // textDecorationColor: "#01EAD4",
                fontSize: 17,
                fontWeight: "500",
                height: 45,
              }}
              cursorColor="white"
              defaultValue={email}
              inputMode="email"
              onChangeText={(text) => setEmail(text)}
              keyboardType="default"
              // prompt={
              //   <Text className="text-white">Username is available </Text>
              // }
            />
          </View>
          <View className="flex-1" />

          <View className="flex w-full flex-1 flex-row items-center justify-center">
            <View className="flex-1">
              <Text className="text-[#BEE9E5]">Why we need your email.</Text>
            </View>
            <View className="grid w-1/3">
              <Button
                onPress={() => {
                  if (!email) {
                    return Alert.alert("Email valiue is required");
                  }

                  router.push(
                    `/(auth)/(register)/confirm/${
                      email ?? "miraclef60@gmail.com"
                    }`,
                  );
                }}
              >
                <Text>Continue</Text>
              </Button>
            </View>
          </View>
        </View>
      </Container>
    </>
  );
}
