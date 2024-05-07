import { Container } from "@/components/Container";
import { SubTab, TabView } from "@/components/tab_view";
import { router } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Button } from "@/components/button";
import { Balance } from ".";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Wallet } from "@/utils/api";
import { useSession } from "@/contexts/session";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Area, CartesianChart, Line, Pie, PolarChart } from "victory-native";
import {
  DATA_LINE_CHART,
  DONUT_CHART_DATA,
  calculateGradientPoints,
} from "@/utils/digits";
import { LinearGradient } from "expo-linear-gradient";
import { vec } from "@shopify/react-native-skia";

export default function WalletScreen() {
  const tabList = ["Overview", "Crypto", "NFT", "Earn", "Card"];
  const cryptoTabList = ["Assets", "NFT"];

  const { session, signOut } = useSession();
  const [userSession, setUserSession] = useState<Record<string, any>>();
  const [balance, setBalance] = useState<string>();
  const [assets, setAssets] = useState([]);

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

      const totalBalance = result?.data?.items?.reduce(
        (cur, obj) => cur + Number(obj?.balance),
        0,
      );

      setBalance(totalBalance);
      setAssets(result?.data?.items);
    }
  }, [userSession]);

  useEffect(() => {
    if (session) {
      setUserSession(session);
    }
  }, [session]);

  // Carousel
  const carouselRef = useRef(null);
  const { width, height } = useSafeAreaFrame();
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
  const [donutChartData, setDonutChartData] = useState([]);

  useEffect(() => {
    setDonutChartData(DONUT_CHART_DATA());
  }, []);

  return (
    <Container>
      <View className="w-full h-full" style={{ height: "100%", width: "100%" }}>
        <View
          className="flex flex-col items-center justify-start gap-2 pt-5"
          style={{ paddingHorizontal: 0 }}
        >
          <TabView
            tabList={tabList}
            items={tabList.map((tab, index) => (
              <ScrollView
                key={index}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 140,
                }}
                contentInsetAdjustmentBehavior="always"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                scrollEnabled
                style={{
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  touchSoundDisabled
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {index === 0 && tab.toLowerCase() === "overview" && (
                    <View
                      style={{
                        flex: 1,
                        paddingTop: 20,
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <View
                        className="flex flex-row items-center justify-between w-full"
                        style={{ paddingHorizontal: 20 }}
                      >
                        <Balance balance={balance ? Number(balance) : 0} />

                        <View style={{}}>
                          <View></View>
                        </View>
                      </View>
                      {/* Slider with donut chart and line chart */}
                      {/* start of incoming portfolio slider */}
                      <View
                        style={{
                          width: "100%",
                          marginVertical: 40,
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "700",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          Portfolio
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor:
                                currentPortfolioIndex === 0
                                  ? "#18EAFF"
                                  : "#49515D",
                              height: currentPortfolioIndex === 0 ? 3 : 2,
                              width: currentPortfolioIndex === 0 ? 16 : 8,
                              borderRadius: 4,
                            }}
                          />
                          <View
                            style={{
                              backgroundColor:
                                currentPortfolioIndex === 1
                                  ? "#18EAFF"
                                  : "#49515D",
                              height: currentPortfolioIndex === 1 ? 3 : 2,
                              width: currentPortfolioIndex === 1 ? 16 : 8,
                              borderRadius: 4,
                            }}
                          />
                        </View>
                        <View style={{ height: 210 }}>
                          <Carousel
                            ref={carouselRef}
                            loop={false}
                            width={width}
                            // height={width / 2}
                            autoPlay={false}
                            pagingEnabled
                            data={[...new Array(2).keys()]}
                            onProgressChange={() => {}}
                            scrollAnimationDuration={800}
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              // paddingHorizontal: 20,
                            }}
                            onSnapToItem={async (index) =>
                              setCurrentPortfolioIndex(index)
                            }
                            defaultIndex={currentPortfolioIndex}
                            renderItem={({ index }) => {
                              if (index === 0) {
                                return (
                                  <View
                                    style={{
                                      height: 200,
                                      paddingHorizontal: 20,
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <PolarChart
                                      data={donutChartData} // 👈 specify your data
                                      labelKey={"label"} // 👈 specify data key for labels
                                      valueKey={"value"} // 👈 specify data key for values
                                      colorKey={"color"} // 👈 specify data key for color
                                      containerStyle={{
                                        width: 150,
                                        height: 150,
                                        flex: 1,
                                      }}
                                      canvasStyle={{
                                        width: 150,
                                        height: 150,
                                      }}
                                    >
                                      <Pie.Chart innerRadius={"70%"} />
                                    </PolarChart>

                                    <View
                                      style={{
                                        flex: 1,
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "flex-start",
                                        gap: 10,
                                      }}
                                    >
                                      {donutChartData.map((data, index) => (
                                        <View
                                          key={index}
                                          style={{
                                            width: "100%",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              // flex: 1,
                                              backgroundColor: `${data?.color}`,
                                              height: 3,
                                              width: 16,
                                              borderRadius: 4,
                                            }}
                                          />

                                          <Text
                                            style={{
                                              flex: 1,
                                              fontSize: 12,
                                              color: "white",
                                              fontWeight: "400",
                                            }}
                                          >
                                            {data?.label}
                                          </Text>
                                          <Text
                                            style={{
                                              flex: 1,
                                              fontSize: 12,
                                              color: "white",
                                              fontWeight: "400",
                                              textAlign: "right",
                                            }}
                                          >
                                            {data?.value}%
                                          </Text>
                                        </View>
                                      ))}
                                    </View>
                                  </View>
                                );
                              }

                              return (
                                <View style={{ height: 200 }}>
                                  <CartesianChart
                                    data={DATA_LINE_CHART} // 👈 specify your data
                                    xKey="day" // 👈 specify data key for x-axis
                                    yKeys={["lowTmp", "highTmp"]} // 👈 specify data keys used for y-axis
                                    axisOptions={{
                                      isNumericalData: true,
                                    }} // 👈 we'll generate axis labels using given font.
                                  >
                                    {/* 👇 render function exposes various data, such as points. */}
                                    {({ points, chartBounds }) => (
                                      // 👇 and we'll use the Line component to render a line path.
                                      // <Line
                                      //   points={points.highTmp}
                                      //   color="red"
                                      //   strokeWidth={3}
                                      // />

                                      //👇 pass a PointsArray to the Line component, y0, as well as options.
                                      <Area
                                        points={points.highTmp}
                                        y0={chartBounds.bottom}
                                        color="#18EAFF"
                                        animate={{
                                          type: "timing",
                                          duration: 300,
                                        }}
                                        connectMissingData
                                        curveType="catmullRom0"
                                        opacity={0.6}
                                        blendMode="luminosity"
                                        antiAlias
                                      />
                                    )}
                                  </CartesianChart>
                                </View>
                              );
                            }}
                          />
                        </View>
                      </View>
                      {/* end of incoming portfolio slider */}

                      {/* Begining of grid */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "auto",
                          flexWrap: "wrap",
                          gap: 10,
                          paddingHorizontal: 10,
                        }}
                      >
                        <LinearGradient
                          // Button Linear Gradient
                          colors={["#33FF99", "#24A464", "#0C0C0C"]}
                          style={{
                            minWidth: "45%",
                            maxWidth: "48%",
                            borderRadius: 5,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            minHeight: 114,
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 21,
                              fontWeight: "500",
                              color: "white",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            Crypto Assets
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              color: "#2DDB84",
                              textAlign: "right",
                              width: "100%",
                            }}
                          >
                            ${balance}{" "}
                            <Text style={{ color: "#3A4452" }}>USD</Text>
                          </Text>
                        </LinearGradient>
                        <LinearGradient
                          // Button Linear Gradient
                          colors={["#5D00F4", "#0C0C0C"]}
                          style={{
                            minWidth: "45%",
                            maxWidth: "48%",
                            borderRadius: 5,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            minHeight: 114,
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 21,
                              fontWeight: "500",
                              color: "white",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            NFT
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              color: "#4902BD",
                              textAlign: "right",
                              width: "100%",
                            }}
                          >
                            Coming soon
                          </Text>
                        </LinearGradient>
                        <LinearGradient
                          // Button Linear Gradient
                          colors={["#062DF9", "#0C0C0C"]}
                          style={{
                            minWidth: "45%",
                            maxWidth: "48%",
                            borderRadius: 5,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            minHeight: 114,
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 21,
                              fontWeight: "500",
                              color: "white",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            EnetCard
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              color: "#062AEC",
                              textAlign: "right",
                              width: "100%",
                            }}
                          >
                            Coming soon
                          </Text>
                        </LinearGradient>
                        <LinearGradient
                          // Button Linear Gradient
                          colors={["#03EED8", "#0C0C0C"]}
                          style={{
                            minWidth: "45%",
                            maxWidth: "48%",
                            borderRadius: 5,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            minHeight: 114,
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 21,
                              fontWeight: "500",
                              color: "white",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            Staking
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              color: "#03E7D1",
                              textAlign: "right",
                              width: "100%",
                            }}
                          >
                            Coming soon
                          </Text>
                        </LinearGradient>
                        <LinearGradient
                          // Button Linear Gradient
                          colors={["#FFA98C", "#0C0C0C"]}
                          style={{
                            minWidth: "45%",
                            maxWidth: "48%",
                            borderRadius: 5,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            minHeight: 114,
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 21,
                              fontWeight: "500",
                              color: "white",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            Farming
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              color: "#FFA98C",
                              textAlign: "right",
                              width: "100%",
                            }}
                          >
                            Coming soon
                          </Text>
                        </LinearGradient>
                        <LinearGradient
                          // Button Linear Gradient
                          colors={["#9EA12F", "#0C0C0C"]}
                          style={{
                            minWidth: "45%",
                            maxWidth: "48%",
                            borderRadius: 5,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            minHeight: 114,
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 21,
                              fontWeight: "500",
                              color: "white",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            Nodes
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              color: "#9EA12F",
                              textAlign: "right",
                              width: "100%",
                            }}
                          >
                            Coming soon
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
                  )}
                  {index === 1 && tab.toLowerCase() === "crypto" && (
                    <View
                      style={{ flex: 1, paddingTop: 20, paddingHorizontal: 20 }}
                    >
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
                          items={cryptoTabList.map((tab, index) => {
                            if (index === 0) {
                              return (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                    height: "auto",
                                    flexWrap: "wrap",
                                    gap: 10,
                                    paddingHorizontal: 10,
                                  }}
                                >
                                  {assets?.map((asset, index) => (
                                    <TouchableOpacity
                                      key={index}
                                      style={{
                                        backgroundColor: "#12131B",
                                        minWidth: "45%",
                                        maxWidth: "48%",
                                        borderRadius: 12,
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingHorizontal: 10,
                                        paddingVertical: 20,
                                        minHeight: 114,
                                        flex: 1,
                                      }}
                                    >
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          justifyContent: "flex-start",
                                          gap: 10,
                                        }}
                                      >
                                        <Image
                                          source={{ uri: asset?.logo_url }}
                                          style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 9999,
                                          }}
                                          contentFit="contain"
                                        />
                                        <View style={{ flex: 1 }}>
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              fontWeight: "500",
                                              color: "white",
                                            }}
                                          >
                                            {asset?.contractName}
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 9,
                                              fontWeight: "500",
                                              color: "#49515D",
                                            }}
                                          >
                                            ${asset?.quote_rate}
                                          </Text>
                                        </View>

                                        <View
                                          style={{
                                            backgroundColor: "#49515D",
                                            opacity: 0.4,
                                            width: 16,
                                            height: 16,
                                            borderRadius: 9999,
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <SimpleLineIcons
                                            name="arrow-right"
                                            size={8}
                                            color="#18EAFF"
                                          />
                                        </View>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          justifyContent: "flex-start",
                                          gap: 10,
                                        }}
                                      >
                                        {/* <Image
                                      source={{ uri: asset?.logo_url }}
                                      style={{
                                        width: 25,
                                        height: 25,
                                        borderRadius: 9999,
                                      }}
                                      contentFit="contain"
                                    /> */}
                                        <View style={{ flex: 1 }}>
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              fontWeight: "500",
                                              color: "white",
                                            }}
                                          >
                                            {asset?.balance}
                                            {"  "}
                                            <Text
                                              style={{
                                                fontSize: 10,
                                                fontWeight: "500",
                                                color: "#49515D",
                                              }}
                                            >
                                              {asset?.contract_symbols}
                                            </Text>
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 9,
                                              fontWeight: "500",
                                              color: "#49515D",
                                            }}
                                          >
                                            ~${asset?.quote_rate}
                                          </Text>
                                        </View>

                                        <View
                                          style={{
                                            backgroundColor: "#0C0C12",
                                            opacity: 0.4,
                                            width: "auto",
                                            // height: 16,
                                            borderRadius: 9999,
                                            padding: 5,
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Text
                                            style={{
                                              color: "#18EAFF",
                                              fontSize: 9,
                                            }}
                                          >
                                            {Number(
                                              asset?.quote_rate_24h,
                                            ).toLocaleString("en-US", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            })}
                                          </Text>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  ))}
                                </View>
                              );
                            }

                            return (
                              <View>
                                <Text style={{ color: "white" }}>
                                  Coming soon...
                                </Text>
                              </View>
                            );
                          })}
                        />
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
                </TouchableOpacity>
              </ScrollView>
            ))}
          />
        </View>
      </View>
    </Container>
  );
}
