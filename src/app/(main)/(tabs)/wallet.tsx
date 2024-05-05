import { Container } from "@/components/Container";
import { SubTab, TabView } from "@/components/tab_view";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Button } from "@/components/button";
import { Balance } from ".";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Wallet } from "@/utils/api";
import { useSession } from "@/contexts/session";

export default function WalletScreen() {
  const tabList = ["Overview", "Crypto", "NFT", "Earn", "Card"];
  const cryptoTabList = ["Assets", "NFT"];

  const { session, signOut } = useSession();
  const [userSession, setUserSession] = useState<Record<string, any>>();
  const [balance, setBalance] = useState<string>();

  console.log(typeof userSession, typeof session, ":::User session");

  useEffect(() => {
    // Get user balance and wallet address
    if (userSession) {
      getUserBalance()
        .then(() => console.log("Fetched balance"))
        .catch((error) => console.log(error, ":::Balance error"));
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
  }, [userSession]);

  useEffect(() => {
    if (session) {
      const parsed = JSON.parse(session);
      setUserSession(parsed);
    }
  }, [session]);

  return (
    <Container>
      <View className="w-full h-full">
        <View className="flex flex-col items-center justify-start px-6 gap-2 pt-5">
          <TabView
            tabList={tabList}
            items={tabList.map((tab, index) => (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {index <= 1 && tab.toLowerCase() === "overview" && (
                  <View style={{ flex: 1, paddingTop: 20 }}>
                    <View className="flex flex-row items-center justify-between w-full">
                      <Balance balance={balance ? Number(balance) : 0} />

                      <View />
                    </View>

                    {/* incoming portfolio slider */}
                  </View>
                )}
                {index <= 1 && tab.toLowerCase() === "crypto" && (
                  <View style={{ flex: 1, paddingTop: 20 }}>
                    <View className="flex flex-row items-center justify-between w-full">
                      <Balance balance={balance ? Number(balance) : 0} />

                      <View />
                    </View>

                    <View className="flex flex-row items-center justify-between my-16 w-full">
                      <TouchableOpacity
                        className="flex flex-col items-center justify-center gap-1"
                        onPress={() => router.push("/(main)/(send)/entry")}
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
                          router.push({ pathname: "/(main)/(receive)/entry" })
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
                      <TouchableOpacity
                        className="flex flex-col items-center justify-center gap-1"
                        onPress={() =>
                          router.push({ pathname: "/(main)/(swap)/entry" })
                        }
                      >
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

                    <View
                      style={{
                        // width: "100%",
                        flex: 1,
                        // backgroundColor: "red",
                        paddingVertical: 10,
                        borderTopEndRadius: 26,
                        borderTopStartRadius: 26,
                        // borderTopColor: "#FFFFFF",
                        // borderTopWidth: 1,
                        shadowColor: "#FFFFFF",
                        shadowOpacity: 0.5,
                        shadowOffset: { width: 0, height: -10 },
                        shadowRadius: 4,
                      }}
                    >
                      <SubTab
                        extra={
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                              width: "auto",
                              justifyContent: "center",
                              gap: 14,
                              height: "auto",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "auto",
                                justifyContent: "center",
                                gap: 14,
                                height: "auto",
                              }}
                            >
                              <TouchableOpacity>
                                <Image
                                  source={require("../../../../assets/icons/dashboard/wallet/setting.png")}
                                  style={{
                                    width: 14,
                                    height: 14,
                                  }}
                                  contentFit="contain"
                                />
                              </TouchableOpacity>
                              <TouchableOpacity>
                                <Feather
                                  name="search"
                                  size={14}
                                  color="white"
                                />
                              </TouchableOpacity>
                              <TouchableOpacity>
                                <AntDesign
                                  name="plus"
                                  size={14}
                                  color="white"
                                />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "auto",
                                justifyContent: "center",
                                gap: 8,
                                height: "auto",
                              }}
                            >
                              <View
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: 9999,
                                  backgroundColor: "#18EAFF",
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 9,
                                  fontWeight: "400",
                                  color: "#49515D",
                                }}
                              >
                                Hide small amount
                              </Text>
                            </TouchableOpacity>
                          </View>
                        }
                        tabList={cryptoTabList}
                        items={cryptoTabList.map((tab, index) => (
                          <View></View>
                        ))}
                      ></SubTab>
                    </View>
                  </View>
                )}

                {index > 1 && (
                  <Text
                    style={{
                      fontSize: 34,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {tab} Coming soon...
                  </Text>
                )}
              </View>
            ))}
          />
        </View>
      </View>
    </Container>
  );
}
