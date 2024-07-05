import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import Loader from "@/components/loader";
import { TabView } from "@/components/tab_view";
import { useSession } from "@/contexts/session";
import { Wallet } from "@/utils/api";
import { checkNumber, isPositive } from "@/utils/digits";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const { session, signOut, defaultChainId } = useSession();
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
        chainId: defaultChainId
      });


      if (result?.code === 401) {
        router.replace({ pathname: "/(auth)/(login)/main" })
      }


      if (!result?.success) {
        return Alert.alert("Balance error", result?.message);
      }


      console.log(result?.data?.items[0], "First asset balance");

      const totalBalance = result?.data?.items?.reduce(
        (cur, obj) => cur + Number(obj?.balance),
        0,
      );

      setBalance(totalBalance);
    }
    async function getWalletAddress() {
      const result = await Wallet.getAddress({
        user_token: userSession?.token,
      });

      if (result?.code === 401) {
        router.replace({ pathname: "/(auth)/(login)/main" })
      }


      if (!result?.success) {
        if (result?.code === 401) router.replace("/(auth)/(login)/main");
        return Alert.alert("Address error", result?.message);
      }

      console.log(result?.data, ":::Address result from API");

      setAddress(result?.data);
    }
  }, [userSession, session]);

  useEffect(() => {
    if (session) {
      setUserSession(session);
    }
  }, [session]);

  // Tab list
  const tabList = ["Trending", "Favorites", "New", "Hot", "Gainers", "Losers"];

  // Loader
  const [loader, setLoader] = useState<boolean>(false);
  // Tokens
  const [tokenList, setTokenList] = useState([]);
  const [selectedToken, setSelectedToken] = useState();
  const getTokenList = useMemo(
    () => async () => {
      if (session) {
        // const result = await Wallet.getTokenList({ user_token: session?.token });
        const result = await Wallet.getTokenList({
          user_token: session?.token,
        });

        if (!result?.success) {
          setLoader(false);
          Alert.alert("Fetch token list", result?.message);
          return;
        }

        // const filteredListWithTokenAddress = result?.data?.filter(
        //   (obj) => obj?.hasOwnProperty("platform") && obj["platform"] !== null,
        // );

        // console.log(
        //   filteredListWithTokenAddress,
        //   ":::Filtered prop",
        //   filteredListWithTokenAddress.length,
        // );

        setSelectedToken(result?.data[0]);
        setTokenList(result?.data);
        setLoader(false);
      }
    },
    [session, tokenList],
  );

  useEffect(() => {
    setLoader(true);
    getTokenList();
  }, [getTokenList, tokenList]);

  const { height } = useSafeAreaFrame();

  return (
    <Container style={{ padding: 24, borderColor: "#0C0C12" }}>
      <Stack.Screen
        options={{
          animation: "fade",
          statusBarColor: "#0C0C12",
          statusBarHidden: false,
          statusBarStyle: "auto",
          headerShadowVisible: false,
          headerLargeTitleShadowVisible: false,
          headerStyle: {
            backgroundColor: "#0C0C12",
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
                    Hello,{" "}
                    {userSession?.user_name ??
                      userSession?.full_name ??
                      "Guest"}
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

        <View
          className="flex flex-row items-center justify-between"
          style={{ marginVertical: 40 }}
        >
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
          <TouchableOpacity
            className="flex flex-col items-center justify-center gap-1"
            onPress={() =>
              router.push({
                pathname: "/(main)/(swap)/entry",
                params: { ...params, address: address },
              })
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

        {/* Tabs with token list details */}

        <TabView
          tabList={tabList}
          items={tabList.map((tab, index) => (
            <ScrollView
              key={index}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 260,
              }}
              contentInsetAdjustmentBehavior="always"
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              scrollEnabled
              style={{
                flexDirection: "column",

                width: "100%",
                height: height * 0.75,
              }}
            >
              {index <= 0 && tab.toLowerCase() === "trending" && (
                <TouchableOpacity
                  activeOpacity={1}
                  touchSoundDisabled
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    // paddingHorizontal: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{ flex: 3, color: "#49515D", fontSize: 14 }}>
                      Coin
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        color: "#49515D",
                        fontSize: 14,
                        textAlign: "right",
                      }}
                    >
                      Last price
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        color: "#49515D",
                        fontSize: 14,
                        textAlign: "right",
                      }}
                    >
                      24h chg%
                    </Text>
                  </View>
                  {tokenList.map((token, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        paddingTop: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        marginBottom: 8,
                      }}
                    >
                      <View
                        className="flex flex-col items-start justify-center"
                        style={{ flex: 3 }}
                      >
                        <Text style={{ color: "white", fontSize: 16 }}>
                          {token?.symbol ?? "DAI"}
                        </Text>
                        <Text style={{ color: "#49515D", fontSize: 14 }}>
                          ${checkNumber(Number(token?.quote?.USD?.volume_24h))}
                        </Text>
                      </View>
                      <View
                        className="flex flex-col items-end justify-center"
                        style={{ flex: 2 }}
                      >
                        <Text style={{ color: "white", fontSize: 16 }}>
                          $
                          {(token?.quote?.USD?.price ?? 0).toLocaleString(
                            "en-US",
                            {
                              maximumFractionalDigits: 2,
                              minimuFractionalDigits: 2,
                            },
                          )}
                        </Text>
                        <Text style={{ color: "#49515D", fontSize: 14 }}>
                          0
                        </Text>
                      </View>

                      <View
                        className="flex flex-col items-end justify-center"
                        style={{ flex: 1.5 }}
                      >
                        <View
                          style={{
                            width: "100%",
                            height: 28,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 6,
                            backgroundColor: isPositive(
                              Number(token?.quote?.USD?.volume_change_24h),
                            )
                              ? "#15BDCFCC"
                              : "#F80F0F",
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "400",
                            }}
                          >
                            {isPositive(
                              Number(token?.quote?.USD?.volume_change_24h),
                            )
                              ? "+"
                              : ""}
                            {(
                              token?.quote?.USD?.volume_change_24h ?? 0
                            ).toLocaleString("en-US", {
                              maximumFractionalDigits: 2,
                              minimumFractionalDigits: 2,
                            })}
                          </Text>
                        </View>
                      </View>

                      {/* incoming portfolio slider */}
                    </View>
                  ))}
                </TouchableOpacity>
              )}

              {index > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Text style={{ color: "white", padding: 20, fontSize: 18 }}>
                    {tab} Comming soon...
                  </Text>
                </View>
              )}
            </ScrollView>
          ))}
        />
      </View>
      <Loader
        popupVisible={loader && tokenList.length <= 0}
        setPopupVisible={setLoader}
      />
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
