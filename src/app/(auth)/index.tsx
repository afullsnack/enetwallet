import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { authenticate } from "@/utils/localAuth";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Env } from "env";


WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};


export default function Page() {
  return (
    <Container style={{ backgroundColor: "#0C0C12" }}>
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
      {Array.from({ length: dotsLength }).map((_, index) => (
        <View
          key={index}
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


  const clientId = Env.GOOGLE_CLIENT_ID;
  // const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUrl = Env.CALLBACK_URL;
  const [code, setCode] = useState<string>();

  const redirectUri = makeRedirectUri({
    // native: "com.enetminer.enet/",
    // scheme: "org.enetwallet.enet",
    // path: "/(auth)/",
    // isTripleSlashed: true,
    native: redirectUrl
    // queryParams: {
    //   userId: params?.userId as Id<"user">,
    // },
  });

  // Twitter auth test
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      redirectUri,
      usePKCE: true,
      scopes: [
        "offline",
        "profiel",
        "email"
      ],
    },
    discovery,
  );


  console.log(request, response, redirectUri, clientId, ":::request, response, redirectUri", redirectUri);


  // TODO: called when google icon is pressed;
  const googleAuth = async (e: any) => {
    e.preventDefault();

    console.log("Google auth button", redirectUri);

    await promptAsync({
      dismissButtonStyle: "close",
    });

  }


  return (
    <View className="grid items-center justify-between gap-2 w-full">
      <HeroImage imagePath={imagePath} activeSlide={activeSlide} />
      <View className="w-full items-center">
        <Text
          role="heading"
          style={{
            fontSize: 40,
            fontWeight: "800",
            color: "white",
            letterSpacing: 2,
            marginBottom: 2,
          }}
          className="max-w-sm text-center tracking-tighter"
        >
          {title}
        </Text>
        <Text className="mx-auto max-w-[270px] text-center text-lg text-gray-400 dark:text-gray-400">
          {subText}
        </Text>
      </View>
      <Pagination dotsLength={entriesCount} activeDotIndex={activeSlide} />
      <View className="flex-1" />

      {activeSlide >= 1 ? (
        <View className="flex flex-col items-center justify-center gap-3 w-full px-3">
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
            <TouchableOpacity className="rounded-2xl border border-[#18EAFF]/30 p-2" onPress={googleAuth}>
              <Image
                source={require("../../../assets/socials-1.png")}
                style={{ width: 20, height: 20 }}
                className="bg-contain"
                alt="Google authentication"
              />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-2xl border border-[#18EAFF]/30 p-2">
              <Image
                source={require("../../../assets/socials-2.png")}
                style={{ width: 20, height: 20 }}
                className="bg-contain"
                alt="Email authentication"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <GetStartedSection />
      )}

      <View
        style={{ marginTop: 20 }}
        className="flex flex-row place-items-center items-center justify-center"
      >
        <Text className="text-white">
          I have an account?{" "}
          {/*<Link push href="/(auth)/(login)/main" className="text-[#18EAFF]">
            Login
          </Link>*/}
          <TouchableOpacity onPress={() => router.push("/(login)/main")}>
            <Text className="text-[#18EAFF]">Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
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
    <View style={{ paddingTop: top, maxHeight: 300 }}>
      <Image
        source={imagePath}
        style={activeSlide === 0 ? { flex: 1, width: 290 } : { width, flex: 1 }}
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
        title: "Crypto \n at your \n Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
      {
        imagePath: require("../../../assets/onboarding-2.png"),
        title: "Crypto \n at your \n Fingertips",
        subText:
          "Over 10,000+ Coins in your pocket Send, Receive, Pay, Exchange different currencies Anytime, Anywhere",
      },
    ],
    [],
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
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Please create an account or login, to explore");
          // router.push("/(main)/")
        }}
        className="flex flex-row place-items-center items-center justify-center"
      >
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
      </TouchableOpacity>
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
          style={{ width: 25, height: 25 }}
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
