import { Container } from "@/components/Container";
import { Numpad } from "@/components/numpad";
import Popup from "@/components/popup";
import { Auth } from "@/utils/api";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CODE_LENGTH = 6;

export default function PinPage() {
  const params = useLocalSearchParams();
  const [text, setText] = useState<string>();
  const inputRef = useRef(null);
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(CODE_LENGTH).fill(0);

  const [isPinLoading, setIsPinLoading] = useState(false);

  console.log(params, ":::Register params, pin screen");

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
      <View className="w-ful container grid min-h-screen bg-[#0C0C12] px-6">
        <View className="flex flex-col items-center justify-center gap-2">
          {/* <Text className="text-2xl font-medium text-white">
                Create Pin
              </Text> */}

          <View className="mt-10 flex w-full flex-col items-center justify-center gap-3">
            <Image
              source={require("../../../../assets/avatar.png")}
              style={{ width: 70, height: 70 }}
              className="border border-[#18EAFF]"
            />
            <Text className="mb-4 text-center text-sm font-medium text-white/70">
              You will need this pin to login and confirm transactions Make sure
              it is difficult for others to guess and easy for you to remember
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
            <Text className="mb-4 text-center text-sm font-medium text-white/70">
              Enter a 6-digit pin
            </Text>
          </View>
        </View>
        {/* <View className="flex-1" /> */}

        <View className="flex w-full flex-1 flex-row items-center justify-center">
          <Numpad
            onConfirmPressed={async () => {
              setIsPinLoading(true);
              if (!text) {
                setIsPinLoading(false);
                return Alert.alert("Pin is required");
              }

              try {
                const result = await Auth.setPin({
                  new_pin: text,
                  confirm_pin: text,
                  token: params?.token as string,
                });

                // if (!result?.success) {
                //   return Alert.alert("Set pin", result?.message);
                // }

                setIsPinLoading(false);

                router.push({
                  pathname: "(backup)/upload",
                  params: { ...params },
                });
              } catch (err: any) {
                setIsPinLoading(false);
                console.log(err, ":::Error in pin screen");
                return Alert.alert(
                  "Unexpected error occurred while creating pin",
                );
              }
            }}
            onPinChange={(pin: string) => setText(pin)}
            onEntryComplete={(pin: string) => setText(pin)}
            code={code}
            setCode={setCode}
          />
        </View>
      </View>
      <Popup
        isPopupVisible={isPinLoading}
        setPopupVisible={setIsPinLoading}
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
