import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, View } from "react-native";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);

  return (
    <Container>
      <View className="w-ful container grid min-h-screen bg-[#0C0C12] px-6 md:px-8">
        <View className="flex flex-col gap-2">
          <Text className="text-2xl font-medium text-white">
            Enter your Email
          </Text>
          {/* <Text className="text-sm font-medium text-white/70">
                The Email must match with the Email your registered your wallet
                with
              </Text> */}
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
            textContentType="emailAddress"
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
              onPress={() =>
                router.push(
                  `/(auth)/(register)/confirm/${
                    email ?? "miraclef60@gmail.com"
                  }`
                )
              }
            >
              <Text>Continue</Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
}