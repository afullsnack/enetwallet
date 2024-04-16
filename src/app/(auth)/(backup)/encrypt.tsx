import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function EncryptDetails() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          headerTitleAlign: "center",
          title: "Encrypt your QR code",
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
      <ScrollView className="w-full flex flex-col items-center gap-4 min-h-screen pb-6 px-6">
        <View
          className="flex flex-col gap-4 items-center justify-center"
          style={{ alignItems: "flex-start" }}
        >
          <View className="rounded-full border border-[#2C1C40] bg-white p-3">
            <Image
              source={require("../../../../assets/icons/scan.png")}
              style={{
                width: 20,
                height: 20,
              }}
              contentFit="contain"
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#EEEFFF",
              textAlign: "center",
            }}
          >
            Encrypt your Key in a QR code
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "400",
              color: "#F3F4F8",
              textAlign: "center",
            }}
          >
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

        <Image
          source={require("../../../../assets/icons/lock.png")}
          style={{
            width: 35,
            height: 35,
          }}
          contentFit="contain"
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#F80F0F",
            textAlign: "center",
          }}
        >
          Remember to use password you CANNOT forget
        </Text>

        <Button
          onPress={() => router.push("(backup)/qrcode")}
          style={{ width: "100%" }}
        >
          <Text>Continue</Text>
        </Button>
      </ScrollView>
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
        <Text className="text-[#3A4452]">
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
              className={`h-2 w-2 rounded-full border`}
              style={{
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

            <Text className="text-[#3A4452] font-light">
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
