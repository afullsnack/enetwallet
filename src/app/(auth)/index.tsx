import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { authenticate } from "@/utils/localAuth";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Page() {
  return (
    <Container style={{}}>
      <View className="w-full min-h-screen h-screen bg-[#0C0C12] flex-1">
        <Slider />
      </View>
    </Container>
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
  const Pagination = ({ dotsLength, activeDotIndex }: any) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        marginVertical: 24,
      }}
    >
      {Array.from({ length: dotsLength }).map((dot, index) => (
        <View
          style={[
            {
              width: 10,
              height: 4,
              borderRadius: 4,
              marginHorizontal: 0,
              backgroundColor: "#18EAFF",
            },
            activeDotIndex !== index
              ? {
                  opacity: 0.8,
                  transform: [
                    {
                      scaleX: 0.8,
                    },
                  ],
                }
              : {
                  opacity: 1,
                  transform: [
                    {
                      scaleX: 1,
                    },
                  ],
                },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View className="h-full w-full">
      {/* <View> */}
      <View className="flex flex-col items-center justify-between gap-2 w-full">
        <HeroImage imagePath={imagePath} activeSlide={activeSlide} />
        <View className="px-4 w-full items-center">
          <Text
            role="heading"
            style={{
              fontSize: 40,
              fontWeight: "800",
              color: "white",
              letterSpacing: 2,
              marginBottom: 2,
            }}
            className="max-w-[170px] text-center tracking-tighter"
          >
            {title}
          </Text>
          <Text className="mx-auto max-w-[270px] text-center text-lg text-gray-400 dark:text-gray-400">
            {subText}
          </Text>

          <Pagination dotsLength={entriesCount} activeDotIndex={activeSlide} />

          {activeSlide >= 1 ? (
            <View className="flex flex-col items-center justify-center gap-3 w-full">
              <Button
                style={{
                  gap: 8,
                  width: "100%",
                }}
              >
                <Image
                  source={require("../../../assets/icons/apple-icon.png")}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                />
                <Text className="text-xl font-medium">Continue with Apple</Text>
              </Button>
              <View className="flex flex-row items-center justify-center gap-4 mt-2">
                <TouchableOpacity className="rounded-2xl border border-[#18EAFF]/30 p-2">
                  <Image
                    source={require("../../../assets/socials-1.png")}
                    style={{ width: 20, height: 20 }}
                    className="bg-contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-2xl border border-[#18EAFF]/30 p-2">
                  <Image
                    source={require("../../../assets/socials-2.png")}
                    style={{ width: 20, height: 20 }}
                    className="bg-contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <GetStartedSection />
          )}

          <View className="my-1 flex flex-row place-items-center items-center justify-center">
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
      {/* </View> */}
    </View>
  );
}

interface IHeroImageProps {
  imagePath: any;
  activeSlide: number;
}
const HeroImage: React.FC<IHeroImageProps> = ({ imagePath, activeSlide }) => {
  const { top } = useSafeAreaInsets();
  const { width } = useSafeAreaFrame();
  return (
    <View style={{ paddingTop: top }}>
      <Image
        source={imagePath}
        style={
          activeSlide === 0
            ? { width: 290, height: 376 }
            : { width, height: 376 }
        }
        contentFit="contain"
      />
    </View>
  );
};

function Slider() {
  const { width, height } = useSafeAreaFrame();
  const slideList = React.useMemo(
    () => [
      {
        imagePath: require("../../../assets/onboarding-1.png"),
        title: "Crypto at your Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
      {
        imagePath: require("../../../assets/onboarding-2.png"),
        title: "Crypto at your Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
    ],
    []
  );

  const carouselRef = useRef(null);

  return (
    <>
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        autoPlay={false}
        pagingEnabled
        scrollAnimationDuration={700}
        defaultIndex={0}
        data={slideList}
        renderItem={({ item, index }) => (
          <Content
            activeSlide={index}
            entriesCount={slideList.length}
            key={index}
            {...item}
          />
        )}
      />
    </>
  );
  {
    /* <Content {...slideList[0]} /> */
  }
  {
    /* <Text className="text-white">Shit</Text> */
  }
}

function GetStartedSection() {
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
        onPress={() => router.push("/(auth)/(register)/username")}
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
