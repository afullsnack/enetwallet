import { Container } from "@/components/Container";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Auth, Wallet } from "@/utils/api";
import Loader from "@/components/loader";

export default function WalletSlider() {
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const carouselRef = useRef(null);
  const sliderTimer = useRef(null);
  const [indexTracker, setIndexTracker] = useState(0);

  // Loader
  const [loader, setLoader] = useState<boolean>(false);

  console.log(params, ":::params in slider");

  // Start slider
  // useEffect(() => {
  //   if (indexTracker < 3 && carouselRef.current !== null) {
  //     sliderTimer.current = setInterval(() => carouselRef.current.next(), 3000);
  //     // setIndexTracker((_prev) => _prev + 1);
  //   }

  //   return () => clearInterval(sliderTimer.current);
  // }, [indexTracker]);

  const slideCarouselManually = async () => {
    if (carouselRef.current.getCurrentIndex() >= 3) {
      return;
    }
    await sleep(4000);
    carouselRef.current.next();

    setTimeout(slideCarouselManually, 1000);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    slideCarouselManually();
  }, []);

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
          title: "",
          headerLeft(props) {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../../../assets/arrow-left-img.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full">
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width}
          // height={width / 2}
          autoPlay={false}
          pagingEnabled
          enabled={false}
          data={[...new Array(4).keys()]}
          onProgressChange={() => {}}
          scrollAnimationDuration={700}
          style={{ alignItems: "center", justifyContent: "center" }}
          onSnapToItem={async (index) => {
            console.log(`Current index of wallet slider: ${index}`);
          }}
          defaultIndex={0}
          renderItem={({ index }) => (
            <View
              className="flex flex-1 flex-col items-start justify-start px-[24px] pb-14"
              key={index}
            >
              <View className="my-6 flex flex-row items-center justify-center gap-1 overflow-hidden py-1">
                {/* Status bar */}
                {Array.from({ length: 4 }).map((_, idx) => (
                  <View
                    key={`${idx}-bar`}
                    className="h-1 max-h-2 w-1/4 rounded-full bg-[#49515D] opacity-50"
                    style={{
                      opacity: idx === index ? 1 : 0.5,
                      backgroundColor: idx === index ? "#18EAFF" : "#49515D",
                    }}
                  />
                ))}
              </View>

              {index === 0 && (
                <View
                  className="gap-4"
                  style={{
                    marginVertical: 100,
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Image
                    source={require("../../../../assets/wallet/wallet_slider_1.png")}
                    style={{
                      width: 230,
                      height: 230,
                      aspectRatio: 1,
                      // flex: 1,
                      alignSelf: "center",
                    }}
                    resizeMode="contain"
                    contentFit="contain"
                    contentPosition="center"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Generating Your Keys
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      color: "#3A4452",
                    }}
                  >
                    The encryption and security verification of your wallet is
                    successful, Your smart wallet is currently being created to
                    offer you the best user experience
                  </Text>
                  <View className="flex-1" />
                  <View className="flex flex-col items-center gap-2">
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Progress 5%, Estimated completion time: 2 minutes
                    </Text>
                    <Image
                      source={require("../../../../assets/wallet/slider_loader_1.png")}
                      contentFit="contain"
                      style={{ width: "100%", height: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Do not close the App during the creation process to
                      prevent wallet creation failure
                    </Text>
                  </View>
                </View>
              )}

              {index === 1 && (
                <View
                  style={{
                    marginVertical: 100,
                    flexDirection: "column",
                    width: "100%",
                  }}
                  className="gap-4"
                >
                  <Image
                    source={require("../../../../assets/wallet/wallet_slider_2.png")}
                    style={{
                      width: 230,
                      height: 230,
                      aspectRatio: 1,
                      // flex: 1,
                      alignSelf: "center",
                    }}
                    resizeMode="contain"
                    contentFit="contain"
                    contentPosition="center"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Verifying Your Wallet
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      color: "#3A4452",
                    }}
                  >
                    The encryption and security verification of your wallet is
                    successful, Your smart wallet is currently being created to
                    offer you the best user experience
                  </Text>
                  <View className="flex-1" />
                  <View className="flex flex-col items-center gap-2">
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Progress 55%, Estimated completion time: 1 minutes
                    </Text>
                    <Image
                      source={require("../../../../assets/wallet/slider_loader_2.png")}
                      contentFit="contain"
                      style={{ width: "100%", height: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Do not close the App during the creation process to
                      prevent wallet creation failure
                    </Text>
                  </View>
                </View>
              )}
              {index === 2 && (
                <View
                  style={{
                    marginVertical: 100,
                    flexDirection: "column",
                    width: "100%",
                  }}
                  className="gap-4"
                >
                  <Image
                    source={require("../../../../assets/wallet/wallet_slider_3.png")}
                    style={{
                      width: 230,
                      height: 208,
                      aspectRatio: 1,
                      // flex: 1,
                      alignSelf: "center",
                    }}
                    resizeMode="contain"
                    contentFit="contain"
                    contentPosition="center"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Encrypting Your Wallet keys
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      color: "#3A4452",
                    }}
                  >
                    The encryption and security verification of your wallet is
                    successful, Your smart wallet is currently being created to
                    offer you the best user experience
                  </Text>
                  <View className="flex-1" />
                  <View className="flex flex-col items-center gap-2">
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Progress 95%, Estimated completion time: 10 seconds
                    </Text>
                    <Image
                      source={require("../../../../assets/wallet/slider_loader_3.png")}
                      contentFit="contain"
                      style={{ width: "100%", height: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Do not close the App during the creation process to
                      prevent wallet creation failure
                    </Text>
                  </View>
                </View>
              )}

              {index >= 3 && (
                <View
                  className="gap-4"
                  style={{
                    marginVertical: 100,
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Image
                    source={require("../../../../assets/wallet/wallet_slider_4.png")}
                    style={{
                      width: 230,
                      height: 223,
                      aspectRatio: 1,
                      // flex: 1,
                      alignSelf: "center",
                    }}
                    resizeMode="contain"
                    contentFit="contain"
                    contentPosition="center"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Wallet Is Almost Ready
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      color: "#3A4452",
                    }}
                  >
                    The encryption and security verification of your wallet is
                    successful, Your smart wallet is currently being created to
                    offer you the best user experience
                  </Text>
                  <Button
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={async () => {
                      setLoader(true);
                      const privKeyResult = await Auth.createPrivateKey({
                        token: params?.token as string,
                        data: { upload_style: "cloud" },
                      });

                      if (!privKeyResult?.success) {
                        setLoader(false);
                        return Alert.alert("Create Private key");
                      }

                      // Call create wallet and show users their address on the next page
                      const result = await Wallet.create({
                        user_token: params?.token as string,
                      });

                      if (!result?.success) {
                        setLoader(false);
                        return Alert.alert("Wallet creation", result?.message);
                      }

                      setLoader(false);

                      router.replace({
                        pathname: "(wallet)/finish",
                        params: {
                          wallet_address: result?.data?.wallet_address,
                          ...params,
                        },
                      });
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Continue to create wallet
                    </Text>
                  </Button>
                  <View className="flex-1" />
                  <View className="flex flex-col items-center gap-2">
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Progress 95%, Estimated completion time: 10 seconds
                    </Text>
                    <Image
                      source={require("../../../../assets/wallet/slider_loader_3.png")}
                      contentFit="contain"
                      style={{ width: "100%", height: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        textAlign: "center",
                        color: "#3A4452",
                      }}
                    >
                      Do not close the App during the creation process to
                      prevent wallet creation failure
                    </Text>
                  </View>
                </View>
              )}

              {/* <View className="flex-1" />
              <Button
                title="Skip"
                onPress={() => router.push("(wallet)/finish")}
              /> */}
            </View>
          )}
        />
      </View>
      <Loader popupVisible={loader} setPopupVisible={setLoader} />
    </Container>
  );
}
