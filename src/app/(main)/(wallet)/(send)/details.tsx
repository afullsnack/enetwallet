import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function SpendDetails() {
  const params = useLocalSearchParams();

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
          headerTitleAlign: "center",
          title: "Details",
          headerRight(props) {
            return (
              <TouchableOpacity {...props} onPress={() => {}}>
                <Image
                  source={require("../../../../../assets/icons/dashboard/spend/send-2.png")}
                  style={{
                    width: 17,
                    height: 17,
                  }}
                  contentFit="contain"
                />
              </TouchableOpacity>
            );
          },
          headerLeft(props) {
            return (
              <TouchableOpacity {...props} onPress={() => router.back()}>
                <EvilIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View className="w-full flex flex-col items-center h-full pb-6 bg-[#0C0C12]">
        <View className="px-6 flex flex-col items-center justify-center gap-6">
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "white",
            }}
          >
            Transfered
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#FFFFFF",
            }}
          >
            -
            {Number(params?.amount ?? 0).toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                color: "#49515D",
              }}
            >
              {"  "}
              {params?.contract_symbols ?? "USDT"}
            </Text>
          </Text>
          <View className="flex flex-row gap-2 items-center justify-center">
            <Image
              source={require("../../../../../assets/icons/dashboard/spend/tick_square.png")}
              style={{
                width: 15,
                height: 15,
              }}
              contentFit="contain"
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#18EAFF",
              }}
            >
              Completed
            </Text>
          </View>
        </View>
        <View
          className="w-full"
          style={{
            backgroundColor: "#12131B",
            padding: 25,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 25,
            gap: 25,
          }}
        >
          <View className="flex flex-row w-full items-center justify-between">
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              Art
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#FFFFFF",
              }}
            >
              NIL
            </Text>
          </View>
          <View className="flex flex-row w-full items-center justify-between">
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              Contact
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#FFFFFF",
              }}
            >
              NIL
            </Text>
          </View>
          <View className="flex flex-row w-full items-center justify-between">
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              Address
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#FFFFFF",
              }}
            >
              {(params?.receipientAddress as string) ??
                "0x63802792790427902huhkfjkhjfhjf"}
            </Text>
          </View>
          <View className="flex flex-row w-full items-center justify-between">
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              Network
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#FFFFFF",
              }}
            >
              {"Ethereum"}
            </Text>
          </View>
          <View className="flex flex-row w-full items-center justify-between">
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              TxId
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#FFFFFF",
                maxWidth: 150,
              }}
            >
              {"0x63802792790427902huhkfjkhjfhjf063802792790427902hukfjkhjfhjf"}
            </Text>
          </View>
          <View className="flex flex-row w-full items-center justify-between">
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              Network fee
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#FFFFFF",
              }}
            >
              0,00ENET ~{" "}
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#3A4452",
                }}
              >
                $3.50
              </Text>{" "}
              5.50 GWEI
            </Text>
          </View>
          <View className="flex flex-row w-full items-center justify-between">
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              Date & Time
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#FFFFFF",
              }}
            >
              {new Date(Date.now()).toLocaleString() ?? "2023-01-11 18:32:59"}
            </Text>
          </View>
        </View>

        {/* <View
          className="px-6 flex flex-row items-center justify-center gap-4"
          style={{
            marginTop: 40,
            marginHorizontal: 10,
          }}
        >
          <Image
            source={require("../../../../../assets/icons/dashboard/spend/caution.png")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="contain"
          />

          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            Ensure that the contact/address is correct and the network
            corresponds with the receiving contact/address.
          </Text>
        </View> */}

        <View className="flex-1" />

        <View
          style={{
            paddingHorizontal: 24,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              borderColor: "#18EAFF",
              borderWidth: 1,
              width: "100%",
              backgroundColor: "transparent",
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
              Exit
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
