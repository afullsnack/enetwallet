import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import Loader from "@/components/loader";
import { SessionProvider, useSession } from "@/contexts/session";
import { Wallet } from "@/utils/api";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";

export default function SpendVerification() {
  const params = useLocalSearchParams();
  const { session } = useSession();

  const [loader, setLoader] = useState(false);

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

        <View
          style={{
            marginTop: "40%",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              color: "#18EAFF",
            }}
          >
            0/1
          </Text>
          <Button
            onPress={async () => {
              // TODO: call swap function
              setLoader(true);

              const result = await Wallet.swapInit({
                user_token: session?.token, data: {
                  walletAddress: params?.walletAddress as string,
                  amount: params?.amount as string,
                  chain_id: Number(params?.chain_id as string),
                  token0Address: params?.token0Address as string,
                  token1Address: params?.token1Address as string,
                  token0Decimals: Number(params?.token0Decimal as string),
                  token1Decimals: Number(params?.token1Decimal as string),
                  token0Symbol: params?.token0Symbol as string,
                  token1Symbol: params?.token1Symbol as string,
                  token0Name: params?.token0Name as string,
                  token1Name: params?.token1Name as string,
                }
              });

              if (!result?.success) {
                return Alert.alert("Swap error", result?.message)
              }

              router.push({ pathname: "(send)/finish", params: { ...params } });
            }}
            style={{
              borderRadius: 8,
              backgroundColor: "#12131B",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
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
                width: 65,
                height: 65,
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
        </View>
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
      </View>
      <Loader popupVisible={loader} setPopupVisible={setLoader} />
    </Container>
  );
}
