import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { SheetModal } from "@/components/modal";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function Receive() {
  const tokenSheetRef = useRef<BottomSheetModal>(null);
  const tokenSheetSnapPoints = useMemo(() => ["75%"], []);

  // Search
  const [tokenSearch, setTokenSearch] = useState<string>();

  const { width } = useSafeAreaFrame();

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
            headerTitleAlign: "center",
            title: "Receive",
            headerLeft(props) {
              return (
                <TouchableOpacity onPress={() => router.back()}>
                  <Image
                    source={require("../../../../../assets/arrow-left-img.png")}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              );
            },
          }}
        />
        <View className="w-full flex flex-col h-full pb-6 bg-[#0C0C12] px-6 md:px-8">
          <View className="flex flex-col items-center gap-4 mt-4 w-full">
            <SelectNetworkTrigger
              onPress={() => {
                tokenSheetRef.current.present();
              }}
            />

            <Text
              style={{
                marginTop: 20,
                fontSize: 13,
                fontWeight: "500",
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Scan QR code to receive DAI
            </Text>

            <View
              style={{
                backgroundColor: "white",
                marginTop: 15,
                padding: 3,
                borderRadius: 20,
                width: width * 0.75,
                height: width * 0.75,
                position: "relative",
              }}
            >
              <Image
                source={require("../../../../../assets/qr_code_sample.png")}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                contentFit="contain"
              />

              <Button
                style={{
                  backgroundColor: "#0C0C12",
                  position: "absolute",
                  bottom: 0,
                  shadowOpacity: 0,
                  shadowRadius: 0,
                  shadowColor: "none",
                  borderBottomEndRadius: 0,
                  borderBottomStartRadius: 0,
                  borderTopStartRadius: 11,
                  borderTopEndRadius: 11,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  left: (width * 0.75) / 3,
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>ID: Johcee12</Text>
                <Image
                  source={require("../../../../../assets/icons/dashboard/receive/copy.png")}
                  style={{
                    width: 12,
                    height: 12,
                  }}
                  contentFit="contain"
                />
              </Button>
            </View>

            <View
              className="flex flex-row items-center justify-center w-full"
              style={{
                borderWidth: 1,
                borderColor: "#18EAFF",
                borderRadius: 6,
                borderStyle: "dashed",
                padding: 8,
                marginTop: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#49515D",
                  textAlign: "center",
                }}
              >
                0x63802792790427902huhkfjkhjfhjf
              </Text>
            </View>

            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                color: "#49515D",
                textAlign: "center",
              }}
            >
              NOTE: Send only DAI to this wallet address. Sending other token
              from other public chains might result in permanent loss
            </Text>
          </View>
          <View className="flex-1" />

          <View className="flex flex-row w-full gap-4 items-center justify-center">
            <Button
              style={{
                backgroundColor: "#12131B",
                borderRadius: 8,
                flex: 1,
                gap: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Copy
              </Text>
              <Image
                source={require("../../../../../assets/icons/dashboard/receive/copy.png")}
                style={{
                  width: 17,
                  height: 17,
                }}
                contentFit="contain"
              />
            </Button>
            <Button
              style={{
                backgroundColor: "#12131B",
                borderRadius: 8,
                flex: 1,
                gap: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Share
              </Text>
              <Image
                source={require("../../../../../assets/icons/dashboard/receive/export.png")}
                style={{
                  width: 17,
                  height: 17,
                }}
                contentFit="contain"
              />
            </Button>
          </View>
        </View>
      </Container>
      <SheetModal
        ref={tokenSheetRef}
        snapPoints={tokenSheetSnapPoints}
        backgroundStyle={{
          backgroundColor: "#0C0C12",
        }}
        handleIndicatorStyle={{
          backgroundColor: "#18EAFF",
        }}
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
              Select token to Receive
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
                data={[...Array.from({ length: 15 })]}
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
                              BNB
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
                            BNB Chain
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
                            $0.00
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
      </SheetModal>
    </>
  );
}

export const SelectNetworkTrigger = ({
  onPress,
  network,
  tokenSymbol,
  tokenBalance,
}: any) => {
  return (
    <Button
      onPress={onPress}
      style={{
        borderRadius: 8,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#171925",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 10,
      }}
    >
      <View className="relative p-1">
        <Image
          source={require("../../../../../assets/icons/dashboard/dai.png")}
          style={{ width: 26, height: 26 }}
          contentFit="contain"
        />

        {/* <Image
          source={require("../../../../../assets/icons/dashboard/eth.png")}
          style={{
            width: 15,
            height: 15,
            position: "absolute",
            bottom: 2,
            right: 2,
          }}
          contentFit="contain"
        /> */}
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
          <Image
            source={require("../../../../../assets/icons/carret.png")}
            style={{ width: 28, height: 28 }}
            contentFit="contain"
          />
        </View>
      </View>
    </Button>
  );
};
