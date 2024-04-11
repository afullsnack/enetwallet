import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { SheetModal } from "@/components/modal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRef } from "react";
import { Text, View } from "react-native";

export default function BackupPage() {
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Container>
        <View className="w-full h-full px-6 flex flex-col items-center justify-center">
          <View style={{ marginBottom: 10 }}>
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
              }}
            >
              Uploading your key to cloud will enable you to recover your
              wallet, if you lose your device or got a new device
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <Button
            title="Upload"
            onPress={() => sheetRef.current.snapToIndex(1)}
          />
        </View>
      </Container>
      <SheetModal ref={sheetRef}>
        <View className="w-full h-full flex flex-col items-center justify-center gap-4">
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: "white",
              textAlign: "center",
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
            onPress={() => {}}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
          <Button title="Skip" onPress={() => {}} />
          <Text
            style={{
              fontSize: 9,
              fontWeight: "400",
              color: "#3A4452",
              textAlign: "center",
            }}
          >
            We recommend encrypting your login details, as it is necessary for
            Next of kin information
          </Text>
        </View>
      </SheetModal>
    </>
  );
}
