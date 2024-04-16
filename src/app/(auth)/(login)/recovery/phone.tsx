import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PhonePage() {
  const [phone, setPhone] = useState("");

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
              <TouchableOpacity {...props} onPress={() => router.back()}>
                <Image
                  source={require("../../../../../assets/back-arrow.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
          // headerRight(props) {
          //   return (
          //     <TouchableOpacity
          //       {...props}
          //       onPress={() => {
          //         router.push("/code");
          //       }}
          //     >
          //       <Text className="text-[#BEE9E5]">Skip</Text>
          //     </TouchableOpacity>
          //   );
          // },
        }}
      />
      <View className="w-full h-full px-6">
        <View className="flex flex-col gap-2">
          <Text className="text-2xl font-medium text-white">
            Enter Phone number
          </Text>

          <Input
            outline={false}
            prefix={
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "700",
                  marginRight: 5,
                }}
              >
                🇳🇬 +234
              </Text>
            }
            style={{
              color: "#01EAD4",
              // textDecorationColor: "#01EAD4",
              fontSize: 17,
              fontWeight: "500",
              height: 45,
            }}
            cursorColor="white"
            defaultValue={phone}
            inputMode="numeric"
            onChangeText={(text) => setPhone(text)}
            keyboardType="number-pad"
          />
        </View>
        <View className="flex-1" />

        <Button
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 8,
            backgroundColor: "rgba(18, 19, 27, 1)",
            padding: 10,
            paddingHorizontal: 20,
            marginVertical: 160,
          }}
        >
          <Text className="text-white">
            Import log in details using QR Code
          </Text>
          <View className="rounded-full bg-white p-2 border border-slate-700">
            <MaterialCommunityIcons name="line-scan" size={20} color="black" />
          </View>
        </Button>

        <View className="flex w-full items-end mb-10">
          <View className="grid w-1/2">
            <Button
              onPress={() => {
                router.push(`(login)/recovery/code`);
              }}
            >
              <Text>Continue</Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
}
