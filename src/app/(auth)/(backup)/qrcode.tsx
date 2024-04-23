import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import Popup from "@/components/popup";
import { Auth } from "@/utils/api";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import Animated, { useSharedValue } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function QRCode() {
  const params = useLocalSearchParams();
  const { width } = useSafeAreaFrame();
  const [qrCodeData, setQRCodeData] = useState<string>();

  const [downloadPopupVisible, setDonwloadPopupVisible] = useState(false);

  useEffect(() => {
    setPrivKey()
      .then(() => console.log("fetched"))
      .catch((error) => console.log(error));
    async function setPrivKey() {
      const result = await Auth.storePrivateKey({
        data: { upload_style: "qr_code" },
        token: params?.token as string,
      });

      if (!result?.message) {
        return Alert.alert("Private key", result?.message);
      }

      setQRCodeData(result?.data); // Set the base64 data image
    }
  }, []);

  console.log(qrCodeData, ":::QR Code data");

  return (
    <Container>
      <Stack.Screen
        options={{
          animation: "slide_from_right",
          headerShown: true,
          statusBarStyle: "auto",
          statusBarHidden: false,
          statusBarColor: "#0C0C12",
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          title: "Encrypted QR code",
          headerRight(props) {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "(wallet)/slider",
                    params: { ...params },
                  })
                }
              >
                <EvilIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full flex flex-col items-center justify-center h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
        <View
          style={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 20,
            width: width * 0.95,
            height: width * 0.95,
            overflow: "hidden",
          }}
        >
          <Image
            source={
              qrCodeData
                ? { uri: qrCodeData }
                : require("../../../../assets/qr_code_sample.png")
            }
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="contain"
          />
        </View>

        <View className="flex-1" />

        <Image
          source={require("../../../../assets/icons/shield.png")}
          style={{
            width: 35,
            height: 35,
            marginBottom: 5,
          }}
          contentFit="contain"
        />
        <View className="flex flex-col items-center justify-center w-full place-items-center">
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 24, color: "#CB5050" }}>{"\u2022"}</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                color: "#CB5050",
              }}
            >
              Never share your QR code with anyone
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 24, color: "#CB5050" }}>{"\u2022"}</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                color: "#CB5050",
              }}
            >
              Anybody with this info, can have full access to your funds
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 24, color: "#CB5050" }}>{"\u2022"}</Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                color: "#CB5050",
              }}
            >
              You are responsible for the safety of your funds
            </Text>
          </View>
        </View>

        <Button
          onPress={async () => {
            // TODO: download
            setDonwloadPopupVisible(true);

            setTimeout(() => setDonwloadPopupVisible(false), 3000);
          }}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Text>Download QR code</Text>
          <Image
            source={require("../../../../assets/icons/scan.png")}
            style={{
              width: 20,
              height: 20,
            }}
            contentFit="contain"
          />
        </Button>
      </View>
      <Popup
        isPopupVisible={downloadPopupVisible}
        setPopupVisible={setDonwloadPopupVisible}
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
