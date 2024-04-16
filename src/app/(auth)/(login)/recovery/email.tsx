import { Input } from "@/components/input";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { Stack, router } from "expo-router";
import { Container } from "@/components/Container";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RecoveryEmail() {
  const { top } = useSafeAreaInsets();

  const [email, setEmail] = useState("");
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
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginHorizontal: 10 }}
              >
                <Image
                  source={require("../../../../../assets/back-arrow.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full min-h-screen px-6">
        <View className="flex flex-col items-start">
          <Text className="text-2xl font-medium text-white">
            Enter your Email
          </Text>
          <Text
            className="text-sm font-medium text-white/70"
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: "rgba(205, 190, 190, 1)",
            }}
          >
            The Email must match with the Email your registered your wallet with
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
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
            keyboardType="default"
            // prompt={
            //   <Text className="text-white">Username is available </Text>
            // }
          />

          <View className="flex-1" />

          <Button
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 8,
              backgroundColor: "rgba(18, 19, 27, 1)",
              padding: 10,
              paddingHorizontal: 20,
              marginVertical: 160,
            }}
          >
            <Text className="text-white">
              Import log in details using QR Code
            </Text>
            <View className="rounded-full bg-white p-2 border border-slate-700">
              <MaterialCommunityIcons
                name="line-scan"
                size={20}
                color="black"
              />
            </View>
          </Button>

          <View className="flex w-full items-end">
            <View className="grid w-1/2">
              <Button
                onPress={() => {
                  if (!email.length)
                    return Alert.alert("Please enter your email to continue");
                  router.push(
                    `(login)/confirm/${email ?? "miraclef60@gmail.com"}`,
                  );
                }}
              >
                <Text>Continue</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
}
