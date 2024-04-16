import { Container } from "@/components/Container";
import { Numpad } from "@/components/numpad";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

const CODE_LENGTH = 6;

export default function PinPage() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(CODE_LENGTH).fill(0);

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
          title: "Nice to see you again",
          headerTitleAlign: "center",
          headerLeft(props) {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../../../../assets/back-arrow.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full h-full">
        <View className="flex flex-col items-center justify-center px-6 gap-2">
          <View className="mt-10 flex w-full flex-col items-center justify-center gap-3">
            <Image
              source={require("../../../../../assets/avatar.png")}
              style={{ width: 70, height: 70 }}
              className="border border-[#18EAFF]"
            />
            <Text
              style={{
                fontWeight: "500",
                fontSize: 17,
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              @Johcee
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: 300,
              }}
            >
              {codeLength.map((_, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor:
                      code[index] || code[index] === 0
                        ? "#18EAFF"
                        : "transparent",
                    borderWidth: 1,
                    borderColor:
                      code[index] || code[index] === 0 ? "#18EAFF" : "#3A4452",
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    marginHorizontal: 5,
                  }}
                />
              ))}
            </View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              Use face ID or Enter PIN code
            </Text>
          </View>
        </View>
        <View className="flex-1" />

        <View className="flex w-full flex-row items-center bg-[#0B0B0E] px-6 pb-24 justify-center">
          <Numpad
            type="recovery"
            onConfirmPressed={() => {
              router.push("/(main)/(tabs)/");
            }}
            onPinChange={(pin) => setText(pin)}
            onEntryComplete={(pin) => console.log(pin, ":::Complete pin digit")}
            code={code}
            setCode={setCode}
          />
        </View>
      </View>
    </Container>
  );
}
