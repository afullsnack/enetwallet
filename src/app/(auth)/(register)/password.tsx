import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRef = useRef(null);

  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          title: "Create password",
          headerLeft(props) {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../../../assets/arrow-left-img.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full flex flex-col h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
        <View className="flex flex-col gap-4">
          <Text style={{ fontSize: 13, fontWeight: "400", color: "#F3F4F8" }}>
            We will generate a QR code that contains your encrypted key The QR
            code will be encrypted with the password you will define below
          </Text>
          <Input
            outline={true}
            label="Password"
            style={{
              color: "#01EAD4",
              // textDecorationColor: "#01EAD4",
              fontSize: 17,
              fontWeight: "500",
              height: 45,
            }}
            cursorColor="white"
            defaultValue={password}
            inputMode="email"
            textContentType="password"
            onChangeText={(text) => setPassword(text)}
            keyboardType="default"
          />
          <Input
            outline={true}
            label="Confirm password"
            style={{
              color: "#01EAD4",
              // textDecorationColor: "#01EAD4",
              fontSize: 17,
              fontWeight: "500",
              height: 45,
            }}
            cursorColor="white"
            defaultValue={confirmPassword}
            inputMode="email"
            textContentType="password"
            onChangeText={(text) => setConfirmPassword(text)}
            keyboardType="default"
          />
        </View>

        <PasswordValidation password={password} />
        <View className="flex-1" />

        <Button onPress={() => router.push("/phone")} style={{ width: "100%" }}>
          <Text>Continue</Text>
        </Button>
      </View>
    </Container>
  );
}

const checkPasswordStrength = (password: string): number => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

  if (password.length === 0) {
    return 0;
  } else if (password.length < 8) {
    return 20;
  } else if (!regex.test(password)) {
    return 40;
  } else {
    return 90;
  }
};

// Password strength measure
function PasswordValidation({ password }: { password: string }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = checkPasswordStrength(password);
  }, [password, progress]);

  return (
    // <GestureHandlerRootView className="w-full flex-1">
    <View className="flex w-full flex-col items-start justify-center gap-3">
      {/* Validate password strength here */}
      <Text className="text-black">Password strength</Text>
      <View className="flex w-full items-start justify-center bg-[#191F26]">
        <Animated.View
          style={{
            height: 3,
            backgroundColor: "#18EAFF",
            width: `${progress.value}%`,
          }}
        />
      </View>

      <View>
        <Text className="text-white">Rules:</Text>
        <Text className="text-[#3A4452]" style={{ color: "#3A4452" }}>
          Password should <Text className="text-red-600">NOT</Text> be the same
          with your registration password
        </Text>
      </View>

      <View className="mt-4 gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <View
            key={index}
            className="flex flex-row items-center justify-start gap-2"
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor:
                  index == 0 && password.length >= 8
                    ? "#18EAFF"
                    : index == 1 && /\d/.test(password)
                      ? "#18EAFF"
                      : index == 2 && /[!@#$%^&*]/.test(password)
                        ? "#18EAFF"
                        : "#F80F0F",
              }}
            ></View>

            <Text
              style={{ color: "#3A4452" }}
              className="text-[#3A4452] font-light"
            >
              {index === 0
                ? "Not shorter than 8 characters"
                : index === 1
                  ? "Should include 1 number"
                  : "Should include 1 special character"}
            </Text>
          </View>
        ))}
      </View>
    </View>
    // </GestureHandlerRootView>
  );
}