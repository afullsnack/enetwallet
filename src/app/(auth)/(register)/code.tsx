import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { EvilIcons } from "@expo/vector-icons";
import {
  Link,
  Stack,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Image } from "expo-image";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Auth } from "@/utils/api";
import Popup from "@/components/popup";

export default function CodeScreen() {
  const params = useLocalSearchParams();
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const { height } = useSafeAreaFrame();
  const { top } = useSafeAreaInsets();

  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

  console.log(params, ":::Register params, code screen");
  // console.table(params, ":::Table outlining all params")

  return (
    <Container style={{ marginTop: top }}>
      <Stack.Screen
        options={{
          animation: "slide_from_right",
          headerShown: false,
          statusBarStyle: "auto",
          statusBarHidden: false,
          statusBarColor: "#0C0C12",
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
      <View
        className="w-full flex flex-col min-h-screen h-screen bg-[#0C0C12] px-6 pb-28"
        style={{ height }}
      >
        <View className="flex flex-col gap-2">
          <View
            style={{ marginTop: 20 }}
            className="flex flex-row items-center justify-between"
          >
            <Text className="text-2xl font-medium text-white">
              Verification code
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <EvilIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-sm font-medium text-white/70">
            Enter verification code sent to {params?.email as string}
          </Text>
          <View className="mt-10 flex w-full flex-col items-center justify-center gap-3">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-[#3A4452]">Input code</Text>
              <CountdownTimer onTimerEnd={() => console.log("Timer ended!")} />
            </View>
            <OtpInput
              numberOfDigits={6}
              focusColor="#18EAFF"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => setText(text)}
              theme={{
                // containerStyle: styles.container,
                // inputsContainerStyle: styles.inputsContainer,
                // pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: { color: "#18EAFF" },
                // focusStickStyle: styles.focusStick,
                // focusedPinCodeContainerStyle: styles.activePinCodeContainer
              }}
            />
            <View
              className="flex w-full flex-row items-center justify-end"
              style={{ marginVertical: 10 }}
            >
              <TouchableOpacity>
                <Text className="text-[#18EAFF]">Paste code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-1" />

        <View className="flex w-full flex-col items-center justify-center gap-4">
          <View className="">
            <Text className="text-white">
              Email is not correct?{" "}
              <Link href="/(register)/email" className="text-[#18EAFF]">
                Edit
              </Link>
            </Text>
          </View>
          <View className="grid w-full">
            <Button
              onPress={async () => {
                setIsVerifyLoading(true);
                // TODO: verify code logic
                try {
                  const result = await Auth.verifyEmail({
                    email: params?.email as string,
                    otp: text,
                  });

                  console.log(result?.data, ":::Result from verified email");

                  if (!result?.success) {
                    setIsVerifyLoading(false);
                    return Alert.alert("Verify email", result?.message);
                  }

                  setIsVerifyLoading(false);

                  router.push({
                    pathname: `/(register)/pin`,
                    params: {
                      token: result?.data?.token,
                      ...params,
                    },
                  });
                } catch (err: any) {
                  setIsVerifyLoading(false);
                  console.log(err, ":::Error in code screen");
                  return Alert.alert(err.message ?? err.toString());
                }
              }}
            >
              <Text>Verify code</Text>
            </Button>
          </View>
        </View>
      </View>
      <Popup
        isPopupVisible={isVerifyLoading}
        setPopupVisible={setIsVerifyLoading}
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

const CountdownTimer = ({ onTimerEnd }) => {
  const [seconds, setSeconds] = useState(60);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalRef.current);
      // clearTimeout(intervalRef.current);
      onTimerEnd();
    }
  }, [seconds, onTimerEnd]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View>
      <Text className="text-[#F80F0F]">Resend code in 00 : {seconds}s</Text>
    </View>
  );
};
