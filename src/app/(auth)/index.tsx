import { Link, router } from "expo-router";
import React, { useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { FontAwesome } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Image } from "expo-image";
import { Button } from "@/components/button";
import { authenticate } from "@/utils/localAuth";

export default function Page() {
  return (
    <SafeAreaView>
      <View className="w-ful min-h-screen bg-[#0C0C12]">
        <Slider />
      </View>
    </SafeAreaView>
  );
}

function Content({
  imagePath,
  title,
  subText,
  entriesCount,
  activeSlide,
}: {
  imagePath: string;
  title: string;
  subText: string;
  entriesCount: number;
  activeSlide: number;
}) {
  return (
    <View className="h-full w-full flex-1">
      <View className="py-0 dark:bg-black dark:text-white">
        <View className="container px-4">
          <View className="grid items-center justify-center gap-4 text-center">
            <HeroImage imagePath={imagePath} />
            <Text
              role="heading"
              className="native:text-4xl max-w-[170px] text-center text-3xl font-bold tracking-tighter text-white"
            >
              {title}
            </Text>
            <Text className="mx-auto max-w-[330px] text-center text-lg text-gray-400 dark:text-gray-400">
              {subText}
            </Text>

            <View className="flex w-full">
              <Pagination
                dotsLength={entriesCount}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                dotStyle={{
                  width: 10,
                  height: 4,
                  borderRadius: 4,
                  marginHorizontal: 0,
                  backgroundColor: "#18EAFF",
                }}
                inactiveDotStyle={
                  {
                    // Define styles for inactive dots here
                  }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
              />
            </View>

            {activeSlide >= 1 ? (
              <View className="flex flex-col items-center justify-center gap-3">
                <Button>
                  <Text className="text-xl font-medium">
                    Continue with Apple
                  </Text>
                </Button>
                <View className="flex flex-row items-center justify-center gap-4">
                  <TouchableOpacity className="rounded-2xl border border-[#18EAFF] p-2">
                    <Image
                      source={require("../../../assets/socials-1.png")}
                      style={{ width: 20, height: 20 }}
                      className="bg-contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity className="rounded-2xl border border-[#18EAFF] p-2">
                    <Image
                      source={require("../../../assets/socials-2.png")}
                      style={{ width: 20, height: 20 }}
                      className="bg-contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <GetStartedSestion />
            )}

            <View className="mb-0 flex flex-row place-items-center items-center justify-center">
              <Text className="text-white">
                I have an account?{" "}
                <Link href="/(auth)/(login)/main" className="text-[#18EAFF]">
                  Login
                </Link>
              </Text>
            </View>

            {/* <View className="gap-4">
              <Link
                suppressHighlighting
                className="web:focus-visible:outline-none web:focus-visible:ring-1 flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:ring-gray-950 active:bg-gray-400/90 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Explore
              </Link>
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
}

interface IHeroImageProps {
  imagePath: any;
}
const HeroImage: React.FC<IHeroImageProps> = ({ imagePath }) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <Image
        source={imagePath}
        style={{ width: 210, height: 226 }}
        className="bg-contain"
      />
    </View>
  );
};

function Slider() {
  const { width, height } = useWindowDimensions();
  const slideList = React.useMemo(
    () => [
      {
        imagePath: require("../../../assets/onboarding-1.png"),
        title: "Crypto at your Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
      {
        imagePath: require("../../../assets/onboarding-1.png"),
        title: "Crypto at your Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
    ],
    [],
  );

  const carouselRef = useRef(null);

  return (
    <View style={{ minHeight: 200, minWidth: 200, height }}>
      <Carousel
        ref={carouselRef}
        showsHorizontalScrollIndicator={false}
        data={slideList}
        renderItem={({ item, index }) => (
          <Content
            activeSlide={index}
            entriesCount={slideList.length}
            key={index}
            {...item}
          />
        )}
        horizontal
        itemWidth={width}
        sliderWidth={width}
        className="w-full"
      />
      {/* <Content {...slideList[0]} /> */}
      {/* <Text className="text-white">Shit</Text> */}
    </View>
  );
}

function GetStartedSestion() {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row place-items-center items-center justify-center">
        <Image
          source={require("../../../assets/arrow-left-img.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text className="text-white">Explore</Text>
        <Image
          source={require("../../../assets/arrow-left-img-small.png")}
          contentFit="cover"
          contentPosition="center"
          style={{ width: 40, height: 40 }}
        />
      </View>
      <TouchableOpacity
        onPress={async () => {
          const result = await authenticate();

          console.log(result.success, result, ":::Local auth result");
        }}
        className="mx-5 flex flex-col place-items-center items-center gap-2"
      >
        <Image
          source={require("../../../assets/face-id.png")}
          contentFit="cover"
          contentPosition="center"
          style={{ width: 40, height: 40 }}
        />
        <Text className="text-white">Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("(auth)/(register)/username")}
        className="flex flex-row place-items-center items-center justify-center"
      >
        <Image
          source={require("../../../assets/arrow-right-img-small.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text className="text-white">Get started</Text>
        <Image
          source={require("../../../assets/arrow-right-img.png")}
          style={{ width: 45, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
