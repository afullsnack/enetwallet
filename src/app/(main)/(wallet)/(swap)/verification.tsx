import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function SpendVerification() {
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
          headerTitleAlign: "left",
          title: "Verification Requirement",
          headerRight(props) {
            return (
              <TouchableOpacity {...props} onPress={() => router.back()}>
                <EvilIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            );
          },
          headerLeft(props) {
            return <View />;
          },
        }}
      />
      <View className="w-full flex flex-col items-start justify-start h-full pb-6 px-6 bg-[#0C0C12]">
        <Text
          style={{
            fontSize: 13,
            fontWeight: "500",
            color: "#49515D",
            textAlign: "left",
            maxWidth: 270,
          }}
        >
          Complete the verifications step to continue with your transactions
        </Text>

        <View
          style={{
            marginTop: "40%",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              color: "#18EAFF",
            }}
          >
            0/1
          </Text>
          <Button
            onPress={() => {
              router.push("(send)/finish");
            }}
            style={{
              borderRadius: 8,
              backgroundColor: "#12131B",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              width: "100%",
              padding: 5,
              paddingLeft: 15,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "#D3D3D3",
                textAlign: "left",
              }}
            >
              Verify with Biometris or security keys
            </Text>
            <View
              style={{
                width: 65,
                height: 65,
                backgroundColor: "#18EAFF",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              <Image
                source={require("../../../../../assets/icons/dashboard/spend/verification.png")}
                style={{
                  width: 35,
                  height: 35,
                }}
                contentFit="contain"
              />
            </View>
          </Button>
        </View>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "400",
            color: "#18EAFF",
            textAlign: "left",
            marginTop: 10,
          }}
        >
          Verification unavailable?
        </Text>
      </View>
    </Container>
  );
}
