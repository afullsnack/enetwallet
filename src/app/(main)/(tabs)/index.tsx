import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { useSession } from "@/contexts/session";
import { Wallet } from "@/utils/api";
import { Image } from "expo-image";
import { Stack, Tabs, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const { session, signOut } = useSession();
  const [userSession, setUserSession] = useState<Record<string, any>>();
  const [balance, setBalance] = useState<string>();
  const [address, setAddress] = useState<string>();

  console.log(typeof userSession, typeof session, ":::User session");

  useEffect(() => {
    // Get user balance and wallet address
    if (userSession) {
      getUserBalance()
        .then(() => console.log("Fetched balance"))
        .catch((error) => console.log(error, ":::Balance error"));
      getWalletAddress()
        .then(() => console.log("Fetched address"))
        .catch((error) => console.log(error, ":::Address error"));
    }
    async function getUserBalance() {
      const result = await Wallet.getBalance({
        user_token: userSession?.token,
      });

      if (!result?.success) {
        return Alert.alert("Balance error", result?.message);
      }

      setBalance(result?.data?.usdcBalanceFromSmartAccount);
    }
    async function getWalletAddress() {
      const result = await Wallet.getAddress({
        user_token: userSession?.token,
      });

      if (!result?.success) {
        return Alert.alert("Address error", result?.message);
      }

      console.log(result?.data, ":::Address result from API");

      setAddress(result?.data);
    }
  }, [userSession]);

  useEffect(() => {
    if (session) {
      const parsed = JSON.parse(session);
      setUserSession(parsed);
    }
  }, [session]);

  return (
    <Container style={{ padding: 24, borderColor: "#0C0C12" }}>
      <Stack.Screen
        options={{
          animation: "fade",
          statusBarColor: "#0C0C12",
          statusBarHidden: false,
          statusBarStyle: "auto",
          headerStyle: {
            elevation: 0,
            backgroundColor: "#0C0C12",
            // borderColor: "#0C0C12",
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          title: "",
          headerLeft(props) {
            return (
              <View
                {...props}
                className="flex flex-row items-center justify-center gap-3 mx-4"
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Image
                    source={require("../../../../assets/icons/dashboard/streetview.png")}
                    style={{
                      width: 20,
                      height: 20,
                      margin: 4,
                    }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontWeight: "500",
                    }}
                  >
                    Hello, {userSession?.first_name ?? "Guest"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          },
          headerRight(props) {
            return (
              <View
                {...props}
                className="flex flex-row items-center justify-center gap-3 mx-4"
              >
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/icons/dashboard/scanner.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/icons/dashboard/notification.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/icons/dashboard/clipboard.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    signOut();
                    router.replace("/(auth)/(login)/main");
                  }}
                >
                  <Image
                    source={require("../../../../assets/icons/dashboard/network.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <View className="w-full h-full">
        <View className="flex flex-row items-center justify-between">
          <Balance balance={balance ? Number(balance) : 0} />

          <Button
            style={{
              paddingVertical: 5,
              paddingHorizontal: 20,
              backgroundColor: "#15BDCF",
              opacity: 0.7,
            }}
          >
            <Text>Menu</Text>
            <Image
              source={require("../../../../assets/icons/dashboard/menu.png")}
              style={{
                width: 20,
                height: 20,
                margin: 4,
              }}
            />
          </Button>
        </View>

        <View className="flex flex-row items-center justify-between mt-20">
          <TouchableOpacity
            className="flex flex-col items-center justify-center gap-1"
            onPress={() =>
              router.push({
                pathname: "/(main)/(send)/entry",
                params: { ...params },
              })
            }
          >
            <Image
              source={require("../../../../assets/icons/dashboard/actions/send.png")}
              style={{
                width: 55,
                height: 55,
              }}
            />
            <Text
              style={{
                color: "#49515D",
                fontSize: 10.7,
                fontWeight: "500",
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-col items-center justify-center gap-1"
            onPress={() =>
              router.push({
                pathname: "/(main)/(receive)/entry",
                params: { ...params, address: address },
              })
            }
          >
            <Image
              source={require("../../../../assets/icons/dashboard/actions/receive.png")}
              style={{
                width: 55,
                height: 55,
              }}
            />
            <Text
              style={{
                color: "#49515D",
                fontSize: 10.7,
                fontWeight: "500",
              }}
            >
              Receive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center gap-1">
            <Image
              source={require("../../../../assets/icons/dashboard/actions/swap.png")}
              style={{
                width: 55,
                height: 55,
              }}
            />
            <Text
              style={{
                color: "#49515D",
                fontSize: 10.7,
                fontWeight: "500",
              }}
            >
              Swap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center gap-1">
            <Image
              source={require("../../../../assets/icons/dashboard/actions/trade.png")}
              style={{
                width: 55,
                height: 55,
              }}
            />
            <Text
              style={{
                color: "#49515D",
                fontSize: 10.7,
                fontWeight: "500",
              }}
            >
              Trade
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

export const Balance = ({ balance }: { balance: number }) => {
  return (
    <View className="flex flex-col items-start justify-center gap-1">
      <TouchableOpacity>
        <Text
          style={{
            color: "#B6B6B6",
            fontSize: 10,
            fontWeight: "400",
          }}
        >
          Total Balance
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "700",
          flexDirection: "row",
        }}
      >
        $
        {balance.toLocaleString("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#49515D",
            marginLeft: 10,
          }}
        >
          {"  "}USD
        </Text>
      </Text>
    </View>
  );
};
