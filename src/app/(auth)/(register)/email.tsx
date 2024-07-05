import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Auth } from "@/utils/api";
import Popup from "@/components/popup";

export default function EmailPage() {
  const params = useLocalSearchParams();
  const [email, setEmail] = useState<string>();
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const inputRef = useRef(null);

  console.log(params, ":::Params for register, email screen");

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
                onPress={async () => {
                  setRegisterLoading(true);
                  if (!email) {
                    setRegisterLoading(false);
                    return Alert.alert("Email value is required");
                  }

                  try {
                    const result = await Auth.register({
                      data: {
                        email,
                        ...params,
                      },
                    });

                    if (!result?.success) {
                      setRegisterLoading(false);
                      return Alert.alert("Register error", result?.message);
                    }

                    setRegisterLoading(false);

                    router.push({
                      pathname: "/(register)/code",
                      params: {
                        email,
                        ...params,
                      },
                    });
                  } catch (err: any) {
                    setRegisterLoading(false);
                    console.log(err, ":::Error in password");
                    Alert.alert(
                      "Register error",
                      err.message ?? err.toString(),
                    );
                  }

                  // router.push({
                  //   pathname: `/(auth)/(register)/confirm/${email}`,
                  //   params: {
                  //     email: email,
                  //     ...params,
                  //   },
                  // });
                }}
              >
                <Text>Continue</Text>
              </Button>
            </View>
          </View>
        </View>

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
    </>
  );
}
