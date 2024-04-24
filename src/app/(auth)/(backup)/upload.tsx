import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { MyBottomSheetModal, SheetModal } from "@/components/modal";
import Popup from "@/components/popup";
import { Auth } from "@/utils/api";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo, useRef } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BackupPage() {
  const params = useLocalSearchParams();
  const sheetRef = useRef<BottomSheetMethods>(null);
  const { top } = useSafeAreaInsets();

  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <>
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
        <View className="w-full h-full px-6 gap-4 flex flex-col items-center justify-center">
          <View style={{ marginBottom: 10, marginVertical: 100 }}>
            <Image
              source={require("../../../../assets/upload-key.png")}
              style={{
                width: 223,
                height: 120,
              }}
              contentFit="contain"
            />
          </View>
          <View className="flex flex-col items-center justify-center gap-3">
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "white",
              }}
            >
              Upload your key{" "}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "white",
                textAlign: "center",
              }}
            >
              Uploading your key to cloud will enable you to recover your
              wallet, if you lose your device or got a new device
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <Button
            style={{ width: "100%" }}
            title="Upload"
            onPress={() => sheetRef.current.open()}
          />
        </View>
      </Container>
      <MyBottomSheetModal
        ref={sheetRef}
        // snapPoints={snapPoints}
        height={"75%"}
        // backgroundStyle={{
        //   backgroundColor: "#0C0C12",
        // }}
        // handleIndicatorStyle={{
        //   backgroundColor: "#18EAFF",
        // }}
      >
        <View
          className="w-full h-full flex flex-col items-center justify-between p-6 gap-4"
          style={{ backgroundColor: "#0C0C12" }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              maxWidth: 200,
            }}
          >
            Would you like to encrypt your key details in a QR Code?
          </Text>
          <Image
            source={require("../../../../assets/qr-encrypt.png")}
            style={{
              width: 122,
              height: 140,
            }}
            contentFit="contain"
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "white",
              textAlign: "center",
            }}
          >
            Never share your encrypted QR code with anyone Anyone can have
            access to your wallet with this QR code
          </Text>

          <Button
            onPress={() => {
              sheetRef.current.close();
              router.push({
                pathname: "(backup)/qrcode",
                params: { ...params },
              });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: 46,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Encrypt key details in a QR code
            </Text>

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
          </Button>
          <Button
            title="Skip"
            style={{ width: "60%" }}
            onPress={async () => {
              const result = await Auth.storePrivateKey({
                data: { upload_style: "cloud" },
                token: params?.token as string,
              });

              if (!result?.message) {
                return Alert.alert("Private key", result?.message);
              }
              sheetRef.current.close();
              router.push("/(wallet)/slider");
            }}
          />
          <Text
            style={{
              fontSize: 9,
              fontWeight: "400",
              color: "#3A4452",
              textAlign: "center",
              maxWidth: 250,
            }}
          >
            We recommend encrypting your login details, as it is necessary for
            Next of kin information
          </Text>
        </View>
      </MyBottomSheetModal>
    </>
  );
}
