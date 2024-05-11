import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { MyBottomSheetModal, SheetModal } from "@/components/modal";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TextInputProps,
  FlatList,
  Alert,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { SwapTab } from "@/components/tab_view";
import SwapTokenPicker from "@/components/swap_token";
import { SwapNumpad } from "@/components/swap_numpad";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { CustomSwapSlider } from "@/components/swap_slider";
import { useSession } from "@/contexts/session";
import { Wallet } from "@/utils/api";

export default function Send() {
  const params = useLocalSearchParams();
  const { session } = useSession();
  const [toValue, setToValue] = useState<string>();
  const [fromValue, setFromValue] = useState<string>();

  // Current input
  const [swapInput, setSwapInput] = useState<"from" | "to" | null>(null);

  // Search
  const [tokenSearch, setTokenSearch] = useState<string>();
  const toSheetRef = useRef<BottomSheetMethods>(null);
  const fromSheetRef = useRef<BottomSheetMethods>(null);
  const numpadSheetRef = useRef<BottomSheetMethods>(null);
  const settingsSheetRef = useRef<BottomSheetMethods>(null);
  const tokenSheetSnapPoints = useMemo(() => ["75%"], []);
  // const settingsSheetRef = useRef<BottomSheetModal>(null);
  const recurringSheetSnapPoints = useMemo(() => ["35%"], []);

  const tabList = ["Swap", "Bridge", "Enetlab"];

  // Settings
  const [gasPriceIndex, setGasPriceIndex] = useState(0);
  const { height } = useSafeAreaFrame();

  // Numpad sheett
  const [isNumpadSheetOpen, setIsNumpadSheetOpen] = useState(false);

  // select change
  const [selectToChange, setSelectToChange] = useState({});
  const [selectFromChange, setSelectFromChange] = useState({});

  // Loader
  const [loader, setLoader] = useState<boolean>(false);
  const [tokenListFrom, setTokenListFrom] = useState([]);
  const [tokenListTo, setTokenListTo] = useState([]);
  const [selectedTokenFrom, setSelectedTokenFrom] =
    useState<Record<string, any>>();
  const [selectedTokenTo, setSelectedTokenTo] = useState<Record<string, any>>();

  const getTokenList = useMemo(
    () => async () => {
      // const result = await Wallet.getTokenList({ user_token: session?.token });
      const fromTokenListResult = await Wallet.getBalance({
        user_token: session?.token,
      });

      if (!fromTokenListResult?.success) {
        setLoader(false);
        Alert.alert("Fetch token list", fromTokenListResult?.message);
        return;
      }

      if (fromTokenListResult?.code === 401) {
        router.replace({ pathname: "/(auth)/(login)/main" });
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

      // To token list result
      // const result = await Wallet.getTokenList({ user_token: session?.token });
      const toTokenResult = await Wallet.getTokenList({
        user_token: session?.token,
      });

      if (toTokenResult?.code === 401) {
        router.replace({ pathname: "/(auth)/(login)/main" });
      }

      if (!toTokenResult?.success) {
        setLoader(false);
        Alert.alert("Fetch token list", toTokenResult?.message);
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

      // To list of tokens
      setSelectedTokenTo(toTokenResult?.data[0]);
      setTokenListTo(toTokenResult?.data);

      // From list of tokens
      setSelectedTokenFrom(fromTokenListResult?.data?.items[0]);
      setTokenListFrom(fromTokenListResult?.data?.items);
      setLoader(false);
    },
    [session],
  );

  useEffect(() => {
    setLoader(true);
    getTokenList();
  }, [getTokenList]);

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
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            title: "Swap",
            headerLeft(props) {
              return (
                <TouchableOpacity onPress={() => router.back()}>
                  <Image
                    source={require("../../../../../assets/back-arrow.png")}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              );
            },
            headerRight(props) {
              return <View />;
            },
          }}
        />

        <View className="w-full h-full">
          <SwapTab
            extra={
              <View
                style={{
                  flexDirection: "row",
                  gap: 18,
                  paddingHorizontal: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity style={{ width: 18, height: 18 }}>
                  <Image
                    source={require("../../../../../assets/icons/dashboard/clipboard.png")}
                    style={{ flex: 1 }}
                    contentFit="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: 18, height: 18 }}
                  onPress={() => settingsSheetRef.current.open()}
                >
                  <Image
                    source={require("../../../../../assets/icons/dashboard/swap/setting-2.png")}
                    style={{ flex: 1 }}
                    contentFit="contain"
                  />
                </TouchableOpacity>
              </View>
            }
            tabList={tabList}
            items={tabList.map((tab, index) => {
              if (tab === "Swap" || index === 0) {
                return (
                  <ScrollView
                    style={{ paddingHorizontal: 20, paddingBottom: 30 }}
                  >
                    <View className="flex flex-col gap-4 mt-0">
                      <SwapTokenPicker
                        toValue={toValue}
                        fromValue={fromValue}
                        handleToChange={(text) => setToValue(text)}
                        handleFromChange={(text) => setFromValue(text)}
                        toSheetRef={toSheetRef}
                        fromSheetRef={fromSheetRef}
                        onInputFocus={(isFocused, inputType) => {
                          // if (isFocused) {
                          //   setSwapInput(inputType);
                          //   numpadSheetRef.current.open();
                          // } else {
                          //   numpadSheetRef.current.close();
                          // }
                        }}
                        selectedTokenTo={selectedTokenTo}
                        selectedTokenFrom={selectedTokenFrom}
                        onToSelectTokenChange={(select) =>
                          setSelectToChange(select)
                        }
                        onFromSelectTokenChange={(select) =>
                          setSelectFromChange(select)
                        }
                      />

                      <View className="flex flex-row gap-2 w-full items-center justify-start mb-[30px]">
                        <Image
                          source={require("../../../../../assets/icons/dashboard/swap/swap_lr.png")}
                          style={{ width: 12, height: 12 }}
                          contentFit="contain"
                        />
                        <Text style={{ color: "white" }}>
                          1 DAI = 1.001 USDT
                        </Text>
                        <Text style={{ color: "#49515D" }}>($1.00)</Text>
                      </View>
                    </View>

                    <View className="flex-1" style={{ flex: 1 }} />

                    <View className="flex flex-col gap-2 w-full mt-20 items-start mb-5">
                      <View
                        className="flex flex-col p-3 w-full"
                        style={{
                          borderRadius: 11,
                          borderWidth: 1,
                          gap: 10,
                          borderColor: "#12131B",
                          borderStyle: "dashed",
                        }}
                      >
                        <View className="flex flex-row items-center justify-between w-full">
                          <Text
                            style={{
                              color: "#3A4452",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "left",
                            }}
                          >
                            Slippage
                          </Text>

                          <Text
                            style={{
                              color: "white",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "right",
                            }}
                          >
                            {"3% >"}
                          </Text>
                        </View>
                        <View className="flex flex-row items-center justify-between w-full">
                          <Text
                            style={{
                              color: "#3A4452",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "left",
                            }}
                          >
                            Minimum Received
                          </Text>

                          <Text
                            style={{
                              color: "#18EAFFCC",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "right",
                            }}
                          >
                            0.000000
                          </Text>
                        </View>
                        <View className="flex flex-row items-center justify-between w-full">
                          <Text
                            style={{
                              color: "#3A4452",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "left",
                            }}
                          >
                            Receiving address
                          </Text>

                          <Text
                            style={{
                              color: "white",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "right",
                            }}
                          >
                            0.000000
                          </Text>
                        </View>
                        <View className="flex flex-row items-center justify-between w-full">
                          <Text
                            style={{
                              color: "#3A4452",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "left",
                            }}
                          >
                            Price impact
                          </Text>
                          <Text
                            style={{
                              color: "#18EAFFCC",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "right",
                            }}
                          >
                            {"<0.5%"}
                          </Text>
                        </View>
                        <View className="flex flex-row items-center justify-between w-full">
                          <Text
                            style={{
                              color: "#3A4452",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "left",
                            }}
                          >
                            TX fee
                          </Text>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 12,
                              fontWeight: "400",
                              paddingHorizontal: 8,
                              textAlign: "right",
                            }}
                          >
                            0.51{" "}
                            <Text
                              style={{
                                color: "white",
                              }}
                            >
                              {" "}
                              USDT
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Button
                      onPress={() => {


                        // TODO: destructure selectedFromToken and selectedToToken to get currently selected tokens
                        console.log(selectedTokenTo, ":::The selected tokens:w");

                        const objWithPlatformAttr = selectedTokenTo?.hasOwnProperty('platform')


                        if (!objWithPlatformAttr) {
                          return Alert.alert("Cannot swap with token not on the supported chain");
                        }


                        const token0Address = selectedTokenFrom?.contract_address;
                        const token1Address = selectedTokenTo?.platform?.token_address;
                        const walletAddress = session?.wallet_address;
                        const amount = fromValue;
                        const chain_id = 1;
                        const token0Decimal = selectedTokenFrom?.contractDecimals;
                        const token1Decimal = 6;
                        const token0Symbol = selectedTokenFrom?.contract_symbols;
                        const token1Symbol = selectedTokenTo?.platform?.symbol ?? selectedTokenTo?.symbol;
                        const token0Name = selectedTokenFrom?.contractName;
                        const token1Name = selectedTokenTo?.name;


                        console.log(token0Address, token1Address, ":::Selected contract addresses, and values:::", fromValue, toValue);

                        router.push({
                          pathname: "(swap)/confirm",
                          params: {
                            ...params,
                            walletAddress, amount, chain_id, token0Address, token1Address, token0Decimal, token1Decimal, token0Symbol, token1Symbol, token0Name, token1Name,
                          },
                        });
                      }}
                      style={{ width: "100%" }}
                    >
                      <Text>Swipe to confirm transaction</Text>
                    </Button>
                  </ScrollView>
                );
              }

              if (tab === "Bridge" || index === 1) {
                return (
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 120,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 24 }}>
                      {tab} Coming soon...
                    </Text>
                  </View>
                );
              }
              if (tab === "Enetlab" || index === 2) {
                return (
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 120,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 24 }}>
                      {tab} Coming soon...
                    </Text>
                  </View>
                );
              }
            })}
          />
        </View>
      </Container>
      <MyBottomSheetModal
        ref={numpadSheetRef}
        height={"100%"}
        closeOnBackdropPress={false}
        android_closeOnBackPress={false}
        containerHeight={height * 0.42}
        customBackdropComponent={({ _animatedHeight }) => (
          <View style={{ backgroundColor: "#FFFFFF", height: 0 }} />
        )}
        backdropMaskColor={"transparent"}
        customBackdropPosition="behind"
        hideDragHandle
        onOpen={() => setIsNumpadSheetOpen(true)}
        onClose={() => setIsNumpadSheetOpen(false)}
      >
        <View style={{ width: "100%" }}>
          <View style={{ paddingHorizontal: 20 }}>
            <CustomSwapSlider />
          </View>
          <SwapNumpad
            onPinChange={(text) => console.log(text, ":::Pin input")}
            sheetRef={numpadSheetRef}
            currentValue={swapInput === "from" ? fromValue : toValue}
            isSheetOpen={isNumpadSheetOpen}
            onChange={(value) => {
              console.log(value, ":::Numpad entry change");

              // if (swapInput === "from") {
              //   setFromValue(value);
              // } else {
              //   setToValue(value);
              // }
            }}
          />
        </View>
      </MyBottomSheetModal>
      {/* From bottom sheet */}
      <MyBottomSheetModal
        ref={fromSheetRef}
        // snapPoints={tokenSheetSnapPoints}
        height={"75%"}
      // backgroundStyle={{
      //   backgroundColor: "#0C0C12",
      // }}
      // handleIndicatorStyle={{
      //   backgroundColor: "#18EAFF",
      // }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              backgroundColor: "#0C0C12",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "white",
                lineHeight: 19,
                textAlign: "center",
              }}
            >
              Select token
            </Text>
            <Input
              outline={false}
              containerStyle={{
                borderRadius: 15,
                borderColor: "#171925",
                width: "100%",
                minHeight: 35,
                marginTop: 10,
                backgroundColor: "#12131B",
              }}
              style={{ paddingHorizontal: 10 }}
              placeholderTextColor="#49515D"
              placeholder="Search Token"
              prefix={<Feather name="search" size={18} color="#49515D" />}
              defaultValue={tokenSearch}
              onChangeText={setTokenSearch}
            />
            <ScrollView
              style={{ width: "100%", flex: 1 }}
              nestedScrollEnabled
              scrollEnabled
            >
              <FlashList
                // style={{ width: "100%", backgroundColor: "transparent" }}
                scrollEnabled
                nestedScrollEnabled
                data={tokenListFrom}
                estimatedItemSize={200}
                renderItem={({ item, index }) => {
                  return (
                    <Button
                      onPress={() => {
                        setSelectedTokenFrom(item);
                        fromSheetRef?.current?.close();
                      }}
                      style={{
                        borderRadius: 10,
                        backgroundColor: "transparent",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                      }}
                    >
                      <View className="relative p-1">
                        <Image
                          source={
                            item
                              ? { uri: item?.logo_url }
                              : require("../../../../../assets/icons/dashboard/dai.png")
                          }
                          style={{ width: 35, height: 35, borderRadius: 9999 }}
                          contentFit="contain"
                        />

                        <Image
                          source={require("../../../../../assets/icons/dashboard/eth.png")}
                          style={{
                            width: 15,
                            height: 15,
                            position: "absolute",
                            bottom: 2,
                            right: 2,
                          }}
                          contentFit="contain"
                        />
                      </View>
                      <View className="flex flex-row flex-1 items-center justify-between">
                        <View className="flex flex-col">
                          <View className="flex flex-row items-center gap-1">
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "400",
                                color: "white",
                              }}
                            >
                              {item?.contract_symbols ?? "BNB"}
                            </Text>

                            {/* <Image
                              source={require("../../../../../assets/icons/carret.png")}
                              style={{ width: 20, height: 20 }}
                              contentFit="contain"
                            /> */}
                          </View>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: "400",
                              color: "#49515D",
                            }}
                          >
                            {"Ethereum"}
                          </Text>
                        </View>
                        <View className="flex flex-col items-end">
                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "400",
                                color: "#49515D",
                              }}
                            >
                              {item?.balance ?? "0.00"}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "400",
                              color: "white",
                            }}
                          >
                            ${item?.quote_rate ?? "0.00"}
                            {/* <Text style={{ color: "#49515D" }}>{"  "} DAI</Text> */}
                          </Text>
                        </View>
                      </View>
                    </Button>
                  );
                }}
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </MyBottomSheetModal>

      {/* To bottom sheet */}
      <MyBottomSheetModal
        ref={toSheetRef}
        // snapPoints={tokenSheetSnapPoints}
        height={"75%"}
      // backgroundStyle={{
      //   backgroundColor: "#0C0C12",
      // }}
      // handleIndicatorStyle={{
      //   backgroundColor: "#18EAFF",
      // }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              backgroundColor: "#0C0C12",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "white",
                lineHeight: 19,
                textAlign: "center",
              }}
            >
              Select token
            </Text>
            <Input
              outline={false}
              containerStyle={{
                borderRadius: 15,
                borderColor: "#171925",
                width: "100%",
                minHeight: 35,
                marginTop: 10,
                backgroundColor: "#12131B",
              }}
              style={{ paddingHorizontal: 10 }}
              placeholderTextColor="#49515D"
              placeholder="Search Token"
              prefix={<Feather name="search" size={18} color="#49515D" />}
              defaultValue={tokenSearch}
              onChangeText={setTokenSearch}
            />
            <ScrollView
              style={{ width: "100%", flex: 1 }}
              nestedScrollEnabled
              scrollEnabled
            >
              <FlashList
                // style={{ width: "100%", backgroundColor: "transparent" }}
                scrollEnabled
                nestedScrollEnabled
                data={tokenListTo}
                estimatedItemSize={200}
                renderItem={({ item, index }) => {
                  return (
                    <Button
                      onPress={() => {
                        console.log(item?.platform, ":::Tokens platform object");
                        setSelectedTokenTo(item);
                        toSheetRef?.current?.close();
                      }}
                      style={{
                        borderRadius: 10,
                        backgroundColor: "transparent",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                      }}
                    >
                      <View className="relative p-1">
                        <Image
                          source={
                            item
                              ? { uri: item?.logo }
                              : require("../../../../../assets/icons/dashboard/dai.png")
                          }
                          style={{ width: 35, height: 35, borderRadius: 9999 }}
                          contentFit="contain"
                        />

                        <Image
                          source={require("../../../../../assets/icons/dashboard/eth.png")}
                          style={{
                            width: 15,
                            height: 15,
                            position: "absolute",
                            bottom: 2,
                            right: 2,
                          }}
                          contentFit="contain"
                        />
                      </View>
                      <View className="flex flex-row flex-1 items-center justify-between">
                        <View className="flex flex-col">
                          <View className="flex flex-row items-center gap-1">
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "400",
                                color: "white",
                              }}
                            >
                              {item?.symbol ?? "BNB"}
                            </Text>

                            {/* <Image
                              source={require("../../../../../assets/icons/carret.png")}
                              style={{ width: 20, height: 20 }}
                              contentFit="contain"
                            /> */}
                          </View>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: "400",
                              color: "#49515D",
                            }}
                          >
                            {item?.name ?? "Ethereum"}
                          </Text>
                        </View>
                        <View className="flex flex-col items-end">
                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "400",
                                color: "#49515D",
                              }}
                            >
                              {item?.balance ?? "0.00"}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "400",
                              color: "white",
                            }}
                          >
                            ${item?.quote?.USD?.price ?? "0.00"}
                            {/* <Text style={{ color: "#49515D" }}>{"  "} DAI</Text> */}
                          </Text>
                        </View>
                      </View>
                    </Button>
                  );
                }}
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </MyBottomSheetModal>
      <MyBottomSheetModal
        ref={settingsSheetRef}
        // snapPoints={recurringSheetSnapPoints}
        height={"45%"}
        dragHandleStyle={{ backgroundColor: "#18EAFF", margin: 0, padding: 0 }}
        // backgroundStyle={{
        //   backgroundColor: "#0C0C12",
        // }}
        // handleIndicatorStyle={{
        //   backgroundColor: "#18EAFF",
        // }}
        style={{ backgroundColor: "#0C0C12" }}
      >
        <View
          style={{
            backgroundColor: "#0C0C12",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 10,
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "white",
              lineHeight: 19,
              textAlign: "center",
            }}
          >
            Settings
          </Text>
          <View
            style={{
              borderRadius: 8,
              borderColor: "#171925",
              borderWidth: 1,
              padding: 8,
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              // height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "white",
                lineHeight: 19,
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Slippage settings
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
                lineHeight: 19,
                textAlign: "left",
                marginBottom: 20,
              }}
            >
              Setting a higher slippage tolerance may help the transactions, but
              you might not get a good deal. Please proceed with caution
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                lineHeight: 19,
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Gas Price
            </Text>
            <View className="flex flex-row items-center justify-center gap-4">
              <View
                style={{
                  paddingVertical: 6,
                  flexDirection: "row",
                  backgroundColor: "#12131B",
                  width: "100%",
                  borderRadius: 11,
                  height: 52,
                  alignContent: "center",
                  justifyContent: "space-around",
                }}
              >
                {["Auto", "Slow", "Normal", "Fast"].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="flex items-center justify-center px-4 py-1"
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                      // borderBottomWidth: 1,
                      // borderBottomColor:
                      //   activeIndex === index ? "#18EAFF" : "transparent",
                    }}
                    onPress={() => {
                      console.log(index, "Index");
                      setGasPriceIndex(index);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: gasPriceIndex === index ? "#18EAFF" : "#49515D",
                      }}
                    >
                      {item}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: "400",
                        color: gasPriceIndex === index ? "#18EAFF" : "#49515D",
                      }}
                    >
                      {item == "Slow" && "$0.6"}
                      {item == "Normal" && "$1.6"}
                      {item == "Fast" && "$2.6"}
                    </Text>
                    <View
                      style={{
                        height: 2.2,
                        width: "75%",
                        borderRadius: 9999,
                        backgroundColor:
                          gasPriceIndex === index ? "#18EAFF" : "transparent",
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </MyBottomSheetModal>
    </>
  );
}
