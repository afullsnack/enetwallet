import { Link } from "expo-router";
import React, { useRef } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";

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
}: {
  imagePath: string;
  title: string;
  subText: string;
}) {
  return (
    <View className="h-full w-full flex-1">
      <View className="py-0 dark:bg-black dark:text-white">
        <View className="container px-4 md:px-6">
          <View className="grid items-center justify-center gap-8 text-center">
            <HeroImage imagePath={imagePath} />
            <Text
              role="heading"
              className="native:text-5xl max-w-[200px] text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {title}
            </Text>
            <Text className="mx-auto max-w-[330px] text-center text-lg text-gray-400 md:text-xl dark:text-gray-400">
              {subText}
            </Text>

            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row place-items-center items-center justify-center">
                <Image
                  source={require("../../assets/arrow-left-img.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text className="text-white">Explore</Text>
                <Image
                  source={require("../../assets/arrow-left-img-small.png")}
                  contentFit="cover"
                  contentPosition="center"
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <View className="mx-5 flex flex-col place-items-center items-center gap-2">
                <Image
                  source={require("../../assets/face-id.png")}
                  contentFit="cover"
                  contentPosition="center"
                  style={{ width: 40, height: 40 }}
                />
                <Text className="text-white">Sign in</Text>
              </View>
              <View className="flex flex-row place-items-center items-center justify-center">
                <Image
                  source={require("../../assets/arrow-right-img-small.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text className="text-white">Get started</Text>
                <Image
                  source={require("../../assets/arrow-right-img.png")}
                  style={{ width: 45, height: 50 }}
                />
              </View>
            </View>

            <View className="mb-12 flex flex-row place-items-center items-center justify-center">
              <Text className="text-white">
                I have an account?{" "}
                <Link href="/(auth)/" className="text-[#18EAFF]">
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
        style={{ width: 260, height: 276 }}
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
        imagePath: require("../../assets/onboarding-1.png"),
        title: "Crypto at your Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
      {
        imagePath: require("../../assets/onboarding-1.png"),
        title: "Crypto at your Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
    ],
    [],
  );

  // const sliderRef = useRef();

  return (
    <View style={{ width, height, minHeight: 200, minWidth: 200 }}>
      {/* <FlashList
        showsHorizontalScrollIndicator={false}
        data={slideList}
        renderItem={({ item }) => <Content {...item} />}
        horizontal
        estimatedItemSize={6}
        className="w-full"
      /> */}
      <Content {...slideList[0]} />
      {/* <Text className="text-white">Shit</Text> */}
    </View>
  );
}
