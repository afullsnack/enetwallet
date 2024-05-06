import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { MyBottomSheetModal, SheetModal } from "@/components/modal";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Loader from "@/components/loader";
import { Wallet } from "@/utils/api";
import { useSession } from "@/contexts/session";

export default function Send() {
  const { isLoading, session } = useSession();
  const [receipientAddress, setReceipientAddress] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [addBeneficiary, setAddBeneficiary] = useState<boolean>(true);
  const [memo, setMemo] = useState<string>();

  // Search
  const [tokenSearch, setTokenSearch] = useState<string>();

  const tokenSheetRef = useRef<BottomSheetModal>(null);
  const sheetRef = useRef<BottomSheetMethods>(null);
  const recurringSheetRef = useRef<BottomSheetMethods>(null);
  const tokenSheetSnapPoints = useMemo(() => ["75%"], []);

  const recurringSheetSnapPoints = useMemo(() => ["35%"], []);
  const [tokenList, setTokenList] = useState([]);
  const getTokenList = useMemo(
    () => async () => {
      const result = await Wallet.getTokenList({ user_token: session?.token });

      if (!result?.success) {
        setLoader(false);
        Alert.alert("Fetch token list", result?.message);
        return;
      }

      setTokenList(result?.data);
      setLoader(false);
    },
    [session],
  );

  // Loader
  const [loader, setLoader] = useState<boolean>(false);

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
            headerTitleStyle: { color: "white" },
            title: "Send",
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
              return (
                <TouchableOpacity
                  className="flex flex-row gap-2"
                  onPress={() => {}}
                  style={{
                    backgroundColor: "#000000",
                    padding: 8,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#12131B",
                  }}
                >
                  <Image
                    source={require("../../../../../assets/icons/logout.png")}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text
                    style={{ fontSize: 11, fontWeight: "500", color: "white" }}
                  >
                    Batch transfer
                  </Text>
                </TouchableOpacity>
              );
            },
          }}
        />

        <View className="w-full h-full">
          <ScrollView style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
            <View className="flex flex-col gap-4 mt-4">
              <SelectNetworkTrigger
                onPress={() => {
                  // tokenSheetRef.current.present();
                  sheetRef?.current?.open();
                }}
              />

              <View className="flex flex-col gap-2 w-full items-center mb-[30px]">
                <View className="flex flex-row items-center justify-between w-full">
                  <Text
                    style={{
                      color: "#49515D",
                      fontSize: 12,
                      fontWeight: "400",
                      paddingHorizontal: 8,
                      textAlign: "left",
                    }}
                  >
                    Paste recipient details
                  </Text>

                  <TouchableOpacity
                    className="flex flex-row items-center justify-center"
                    onPress={() => recurringSheetRef.current.open()}
                  >
                    <Text
                      style={{
                        color: "#49515D",
                        fontSize: 12,
                        fontWeight: "400",
                        paddingHorizontal: 8,
                        textAlign: "right",
                      }}
                    >
                      Recurring transfer
                    </Text>
                    <Image
                      source={require("../../../../../assets/icons/dashboard/spend/recurring.png")}
                      style={{ width: 23, height: 23 }}
                      contentFit="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Input
                  outline={true}
                  style={{
                    color: "#01EAD4",
                    // textDecorationColor: "#01EAD4",
                    fontSize: 13,
                    fontWeight: "500",
                    height: 45,
                    borderRadius: 6,
                    flexWrap: "wrap",
                  }}
                  placeholder="Enet ID / Phone number / ENS / Email / Wallet Address"
                  placeholderTextColor="#49515D"
                  cursorColor="white"
                  defaultValue={receipientAddress}
                  inputMode="email"
                  textContentType="password"
                  onChangeText={(text) => setReceipientAddress(text)}
                  keyboardType="default"
                  suffix={
                    <View className="flex flex-row gap-3 items-center justify-center">
                      <TouchableOpacity>
                        <Image
                          source={require("../../../../../assets/icons/contact.png")}
                          style={{ width: 22, height: 22 }}
                          contentFit="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={require("../../../../../assets/icons/scan_spend.png")}
                          style={{ width: 22, height: 22 }}
                          contentFit="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
                <View className="flex flex-row items-center justify-between w-full">
                  <View className="flex flex-row items-center justify-center">
                    <Text
                      style={{
                        color: "#18EAFFCC",
                        fontSize: 12,
                        fontWeight: "400",
                        paddingHorizontal: 8,
                        textAlign: "left",
                      }}
                    >
                      Recent transaction
                    </Text>
                    <Image
                      source={require("../../../../../assets/icons/carret.png")}
                      style={{ width: 14, height: 14 }}
                      contentFit="contain"
                    />
                  </View>

                  <View className="flex flex-row items-center gap-3 justify-center">
                    <Text
                      style={{
                        color: "#18EAFFCC",
                        fontSize: 13,
                        fontWeight: "400",
                        paddingHorizontal: 8,
                        textAlign: "left",
                      }}
                    >
                      Add to Beneficiary
                    </Text>
                    <Switch
                      style={{
                        width: 29,
                        height: 15,
                      }}
                      trackColor={{ false: "#767577", true: "#18EAFFCC" }}
                      thumbColor={addBeneficiary ? "#000000" : "#000000"}
                      ios_backgroundColor="#18EAFFCC"
                      onValueChange={(value) => setAddBeneficiary(value)}
                      value={addBeneficiary}
                    />
                  </View>
                </View>
              </View>
              <View className="flex flex-col w-full gap-2 mb-[30px]">
                <Text
                  style={{
                    color: "#49515D",
                    fontSize: 12,
                    fontWeight: "400",
                    paddingHorizontal: 8,
                    textAlign: "left",
                  }}
                >
                  Enter Amount
                </Text>
                <Input
                  outline={true}
                  style={{
                    color: "#01EAD4",
                    // textDecorationColor: "#01EAD4",
                    fontSize: 17,
                    fontWeight: "500",
                    height: 45,
                    borderRadius: 6,
                    flexWrap: "wrap",
                    textAlign: "right",
                  }}
                  prefix={
                    <Text
                      style={{
                        color: "#49515D",
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      DAI
                    </Text>
                  }
                  placeholder="$0.00"
                  placeholderTextColor="#49515D"
                  cursorColor="white"
                  defaultValue={amount}
                  inputMode="numeric"
                  textContentType="password"
                  onChangeText={(text) => setAmount(text)}
                  keyboardType="number-pad"
                  suffix={
                    <View className="flex flex-row items-center justify-center">
                      {/* <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#49515D",
                    }}
                  ></Text> */}
                      <View
                        style={{
                          backgroundColor: "#49515D",
                          width: 1.6,
                          borderColor: "#49515D",
                          height: "100%",
                          minHeight: 20,
                          marginHorizontal: 10,
                          borderRadius: 999,
                        }}
                      />
                      <TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: "#18EAFFCC",
                          }}
                        >
                          MAX
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                />
              </View>
              <View className="flex flex-col gap-2 w-full items-start">
                <Text
                  style={{
                    color: "#49515D",
                    fontSize: 12,
                    fontWeight: "400",
                    paddingHorizontal: 8,
                    textAlign: "left",
                  }}
                >
                  Memo
                </Text>
                <Input
                  outline={true}
                  style={{
                    color: "#01EAD4",
                    // textDecorationColor: "#01EAD4",
                    fontSize: 17,
                    fontWeight: "500",
                    height: 45,
                    borderRadius: 6,
                    flexWrap: "wrap",
                    // textAlign: "right",
                  }}
                  placeholder="Enter memo"
                  placeholderTextColor="#49515D"
                  cursorColor="white"
                  defaultValue={memo}
                  inputMode="text"
                  textContentType="password"
                  onChangeText={(text) => setMemo(text)}
                  keyboardType="default"
                />
              </View>
            </View>

            <View className="flex-1" />

            <View className="flex flex-col gap-2 w-full items-start mb-5">
              <Text
                style={{
                  color: "#49515D",
                  fontSize: 12,
                  fontWeight: "400",
                  paddingHorizontal: 8,
                  textAlign: "left",
                }}
              >
                Summary
              </Text>
              <View
                className="flex flex-col p-3 w-full"
                style={{
                  borderRadius: 11,
                  borderWidth: 1,
                  gap: 10,
                  borderColor: "#49515D",
                  borderStyle: "dashed",
                }}
              >
                <View className="flex flex-row items-center justify-between w-full">
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "400",
                      paddingHorizontal: 8,
                      textAlign: "left",
                    }}
                  >
                    Gas fee
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
                    13.61GWEI
                  </Text>
                </View>
                <View className="flex flex-row items-center justify-between w-full">
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "400",
                      paddingHorizontal: 8,
                      textAlign: "left",
                    }}
                  >
                    Total Est. Time
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
                    5 Mins
                  </Text>
                </View>
                <View className="flex flex-row items-center justify-between w-full">
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "400",
                      paddingHorizontal: 8,
                      textAlign: "left",
                    }}
                  >
                    Receive amount
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
                    0.00{" "}
                    <Text
                      style={{
                        color: "#49515D",
                      }}
                    >
                      {"  "} DAI
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <Button
              onPress={() => {
                router.push("(send)/confirm");
              }}
              style={{ width: "100%" }}
            >
              <Text>Swipe to confirm transaction</Text>
            </Button>
          </ScrollView>
        </View>

        <Loader popupVisible={loader} setPopupVisible={setLoader} />
      </Container>
      <MyBottomSheetModal
        ref={sheetRef}
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
              Select token to send
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
                data={tokenList}
                estimatedItemSize={200}
                renderItem={({ item, index }) => {
                  return (
                    <Button
                      onPress={() => {}}
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
                            item?.logo
                              ? { uri: item?.logo }
                              : require("../../../../../assets/icons/dashboard/dai.png")
                          }
                          style={{ width: 35, height: 35 }}
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
                            {item?.name ?? "BNB Chain"}
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
                              0.00
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
        ref={recurringSheetRef}
        // snapPoints={recurringSheetSnapPoints}
        height={"35%"}
        // backgroundStyle={{
        //   backgroundColor: "#0C0C12",
        // }}
        // handleIndicatorStyle={{
        //   backgroundColor: "#18EAFF",
        // }}
      >
        <View
          style={{
            backgroundColor: "#0C0C12",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
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
            Recurring transfer
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: "#49515D",
              lineHeight: 19,
              textAlign: "center",
            }}
          >
            Recurring transfer allows you to transfer a fixed amount of currency
            from your account to a designated account/s on a set schedule
          </Text>

          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: "#18EAFF",
              lineHeight: 15,
              textAlign: "center",
            }}
          >
            Would you like to set up a recurring transfer?
          </Text>
          <View className="flex flex-row items-center justify-center gap-4">
            <Button
              style={{
                borderColor: "#18EAFF",
                borderWidth: 1,
                backgroundColor: "transparent",
                flex: 1,
              }}
              onPress={() => recurringSheetRef.current.close()}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Cancel
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: "#18EAFF",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
              >
                Yes
              </Text>
            </Button>
          </View>
        </View>
      </MyBottomSheetModal>
    </>
  );
}

const SelectNetworkTrigger = ({
  onPress,
  network,
  tokenSymbol,
  tokenBalance,
}: any) => {
  return (
    <Button
      onPress={onPress}
      style={{
        borderRadius: 10,
        backgroundColor: "#12131B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <View className="relative p-1">
        <Image
          source={require("../../../../../assets/icons/dashboard/dai.png")}
          style={{ width: 35, height: 35 }}
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
              DAI
            </Text>
            <Image
              source={require("../../../../../assets/icons/carret.png")}
              style={{ width: 20, height: 20 }}
              contentFit="contain"
            />
          </View>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#49515D",
            }}
          >
            Ehtereum
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
              Available
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "white",
            }}
          >
            600,000.89
            <Text style={{ color: "#49515D" }}>{"  "} DAI</Text>
          </Text>
        </View>
      </View>
    </Button>
  );
};
