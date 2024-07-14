import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import Loader from "@/components/loader";
import { useSession } from "@/contexts/session";
import { Wallet } from "@/utils/api";
import { authenticate } from "@/utils/localAuth";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";

export default function SpendVerification() {
  const params = useLocalSearchParams();
  const { session, isLoading } = useSession();

  const [loader, setLoader] = useState(false);

  // add side effect to check selected token type, on load
  const [tokenType, setTokenType] = useState<"native" | "tokens">("tokens");

  useEffect(() => {}, [params]);

  async function callSendTransaction() {
    setLoader(true);
    const result = await Wallet.transferInit({
      user_token: session?.token,
      data: {
        transactions: [
          tokenType === "tokens"
            ? {
                toAddress: params?.receipientAddress as string,
                // walletAddress: session?.wallet_address,
                amount: params?.amount as string,
                transfer_type: tokenType,
                token_address: params?.contract_symbols as string,
              }
            : {
                toAddress: params?.receipientAddress as string,
                // walletAddress: session?.wallet_address,
                amount: params?.amount as string,
                transfer_type: tokenType,
                // token_address: params?.contract_symbols as string,
              },
        ],
      },
    });

    if (!result?.success) {
      setLoader(false);
      throw result?.message;
    }
    // If all good
    setLoader(false);

    return result?.data;
  }

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
          headerTitleAlign: "left",
          title: "Verification Requirement",
          headerRight(props) {
            return (
              <TouchableOpacity {...props} onPress={() => router.back()}>
                <EvilIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            );
          },
          headerLeft(props) {
            return <View />;
          },
        }}
      />
      <View className="w-full flex flex-col items-start justify-start h-full pb-6 px-6 bg-[#0C0C12]">
        <Text
          style={{
            fontSize: 13,
            fontWeight: "500",
            color: "#49515D",
            textAlign: "left",
            maxWidth: 270,
          }}
        >
          Complete the verifications step to continue with your transactions
        </Text>

        <Button
          onPress={async () => {
            try {
              const isAuthed = await authenticate();
              console.log(isAuthed, "::::Authorization");
              // TODO: Call transaction init with a lader activated
              const data = await callSendTransaction();
              console.log(data, ":::Transaction data");
              router.push({ pathname: "(send)/finish", params: { ...params } });
            } catch (err: any) {
              console.log(err, ":::Error");
              Alert.alert(err);
            }
          }}
          style={{
            borderRadius: 8,
            backgroundColor: "#12131B",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 150,
            width: "100%",
            padding: 5,
            paddingLeft: 15,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#D3D3D3",
              textAlign: "left",
            }}
          >
            Verify with Biometris or security keys
          </Text>
          <View
            style={{
              width: 85,
              height: 85,
              backgroundColor: "#18EAFF",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../../../../../assets/icons/dashboard/spend/verification.png")}
              style={{
                width: 35,
                height: 35,
              }}
              contentFit="contain"
            />
          </View>
        </Button>
        <TouchableOpacity
          onPress={async () => {
            try {
              // TODO: Call transaction init with a lader activated
              const data = await callSendTransaction();
              console.log(data, ":::Transaction data");
              router.push({ pathname: "(send)/finish", params: { ...params } });
            } catch (err: any) {
              console.log(err, ":::Error");
              Alert.alert(err);
            }
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#18EAFF",
              textAlign: "left",
              marginTop: 10,
            }}
          >
            Verification unavailable?
          </Text>
        </TouchableOpacity>
      </View>
      <Loader popupVisible={loader} setPopupVisible={setLoader} />
    </Container>
  );
}
