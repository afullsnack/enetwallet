import { Container } from "@/components/Container";
import { View, Text, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import { useRef } from "react";
import { Button } from "@/components/button";
import { router } from "expo-router";

export default function WalletSlider() {
  const { width } = useWindowDimensions();
  const carouselRef = useRef(null);

  return (
    <Container>
      <View className="w-full">
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width}
          // height={width / 2}
          autoPlay={false}
          pagingEnabled
          data={[...new Array(4).keys()]}
          scrollAnimationDuration={700}
          style={{ alignItems: "center", justifyContent: "center" }}
          onSnapToItem={() => {
            /**/
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
                <View className="gap-4" style={{ marginVertical: 100 }}>
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
                </View>
              )}

              {index === 1 && (
                <View style={{ marginVertical: 100 }} className="gap-4">
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
                </View>
              )}
              {index === 2 && (
                <View style={{ marginVertical: 100 }} className="gap-4">
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
                </View>
              )}

              {index >= 3 && (
                <View className="gap-4" style={{ marginVertical: 100 }}>
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
                </View>
              )}

              <View className="flex-1" />
              <Button
                title="Skip"
                onPress={() => router.push("(wallet)/finish")}
              />
            </View>
          )}
        />
      </View>
    </Container>
  );
}
