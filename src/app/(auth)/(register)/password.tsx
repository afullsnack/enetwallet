import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Popup from "@/components/popup";
import { Auth } from "@/utils/api";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function Password() {
  const params = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const inputRef = useRef(null);

  console.log(params, ":::Register params, password screen");

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
          title: "Create password",
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "position" : "position"}
      >
        <View className="w-full flex flex-col h-full pb-28 bg-[#0C0C12] px-6">
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
              // inputMode="email"
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

          <Button
            onPress={async () => {
              setRegisterLoading(true);
              if (!password || !confirmPassword) {
                setRegisterLoading(false);
                return Alert.alert("Register error", "Password is required");
              }

              try {
                const result = await Auth.setPassword({
                  token: params?.token as string,
                  data: {
                    new_password: password,
                    confirm_password: confirmPassword,
                    phone_number: params?.phone_number as string,
                  },
                });

                if (!result?.success) {
                  setRegisterLoading(false);
                  return Alert.alert("Register error", result?.message);
                }

                setRegisterLoading(false);

                router.push({
                  pathname: "/pin",
                  params: { password, confirmPassword, ...params },
                });
              } catch (err: any) {
                setRegisterLoading(false);
                console.log(err, ":::Error in password");
                Alert.alert("Register error", err.message ?? err.toString());
              }
            }}
            style={{ width: "100%" }}
          >
            <Text>Continue</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
      <Popup
        isPopupVisible={isRegisterLoading}
        setPopupVisible={setRegisterLoading}
        tapToClose={false}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 40,
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={"#18EAFFCC"} />
        </View>
      </Popup>
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
