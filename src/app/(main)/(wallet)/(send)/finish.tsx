import { Container } from "@/components/Container";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Button } from "@/components/button";
import { Stack, router, useLocalSearchParams } from "expo-router";

export default function Finish() {
  const params = useLocalSearchParams();

  return (
    <Container>
      <Stack.Screen
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <View className="w-full flex flex-col items-center justify-start h-full pb-6 px-6 bg-[#0C0C12]">
        <View
          style={{
            position: "relative",
            height: 300,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
          }}
        >
          <Image
            source={require("../../../../../assets/congrats_checkmark.png")}
            style={{
              width: 216,
              height: 216,
              // position: "absolute",
              // top: 0,
              // bottom: 0,
            }}
            resizeMode="contain"
          />
          <Image
            source={require("../../../../../assets/square.png")}
            style={{
              width: 16,
              height: 16,
              position: "absolute",
              top: 90,
              left: 40,
              // bottom: 0,
            }}
            resizeMode="contain"
          />
          <Image
            source={require("../../../../../assets/square.png")}
            style={{
              width: 24,
              height: 24,
              position: "absolute",
              bottom: 60,
              left: 30,
              // bottom: 0,
            }}
            resizeMode="contain"
          />
          <Image
            source={require("../../../../../assets/square.png")}
            style={{
              width: 24,
              height: 24,
              position: "absolute",
              top: 90,
              right: 30,
              // bottom: 0,
            }}
            resizeMode="contain"
          />
          <Image
            source={require("../../../../../assets/square.png")}
            style={{
              width: 14,
              height: 14,
              position: "absolute",
              bottom: 110,
              right: 40,
              // bottom: 0,
            }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#18EAFF",
            textAlign: "center",
          }}
        >
          Transaction Successful
        </Text>

        <View className="flex-1" />

        <View className="flex flex-row gap-4 items-center justify-center w-full">
          <Button
            style={{ flex: 1 }}
            onPress={() =>
              router.push({ pathname: "(send)/details", params: { ...params } })
            }
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "black",
              }}
            >
              View Details
            </Text>
          </Button>
          <Button
            style={{
              flex: 1,
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#18EAFF",
            }}
            onPress={() => router.replace("(main)/(tabs)/")}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#18EAFF",
              }}
            >
              Close
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
