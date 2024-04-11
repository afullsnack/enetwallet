import { Container } from "@/components/Container";
import { Button } from "@/components/button";
import { Image } from "expo-image";
import { Tabs, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <Container style={{ padding: 24, borderColor: "#0C0C12" }}>
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#0C0C12",
            borderColor: "#0C0C12",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          title: "",
          headerLeft(props) {
            return (
              <View
                {...props}
                className="flex flex-row items-center justify-center gap-3 mx-4"
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Image
                    source={require("../../../../assets/icons/dashboard/streetview.png")}
                    style={{
                      width: 20,
                      height: 20,
                      margin: 4,
                    }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontWeight: "500",
                    }}
                  >
                    Hello, Micheal
                  </Text>
                </TouchableOpacity>
              </View>
            );
          },
          headerRight(props) {
            return (
              <View
                {...props}
                className="flex flex-row items-center justify-center gap-3 mx-4"
              >
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/icons/dashboard/scanner.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/icons/dashboard/notification.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/icons/dashboard/clipboard.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/icons/dashboard/network.png")}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <View className="flex flex-row items-center justify-between">
        <Balance balance={90000} />

        <Button
          style={{
            paddingVertical: 5,
            paddingHorizontal: 20,
            backgroundColor: "#15BDCF",
            opacity: 0.7,
          }}
        >
          <Text>Menu</Text>
          <Image
            source={require("../../../../assets/icons/dashboard/menu.png")}
            style={{
              width: 20,
              height: 20,
              margin: 4,
            }}
          />
        </Button>
      </View>

      <View className="flex flex-row items-center justify-between mt-20">
        <TouchableOpacity
          className="flex flex-col items-center justify-center gap-1"
          onPress={() => router.push("/(main)/(send)/entry")}
        >
          <Image
            source={require("../../../../assets/icons/dashboard/actions/send.png")}
            style={{
              width: 55,
              height: 55,
            }}
          />
          <Text
            style={{
              color: "#49515D",
              fontSize: 10.7,
              fontWeight: "500",
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-col items-center justify-center gap-1">
          <Image
            source={require("../../../../assets/icons/dashboard/actions/receive.png")}
            style={{
              width: 55,
              height: 55,
            }}
          />
          <Text
            style={{
              color: "#49515D",
              fontSize: 10.7,
              fontWeight: "500",
            }}
          >
            Receive
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-col items-center justify-center gap-1">
          <Image
            source={require("../../../../assets/icons/dashboard/actions/swap.png")}
            style={{
              width: 55,
              height: 55,
            }}
          />
          <Text
            style={{
              color: "#49515D",
              fontSize: 10.7,
              fontWeight: "500",
            }}
          >
            Swap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-col items-center justify-center gap-1">
          <Image
            source={require("../../../../assets/icons/dashboard/actions/trade.png")}
            style={{
              width: 55,
              height: 55,
            }}
          />
          <Text
            style={{
              color: "#49515D",
              fontSize: 10.7,
              fontWeight: "500",
            }}
          >
            Trade
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const Balance = ({ balance }: { balance: number }) => {
  return (
    <View className="flex flex-col items-start justify-center gap-1">
      <TouchableOpacity>
        <Text
          style={{
            color: "#B6B6B6",
            fontSize: 10,
            fontWeight: "400",
          }}
        >
          Total Balance
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "700",
          flexDirection: "row",
        }}
      >
        {balance.toLocaleString("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#49515D",
            marginLeft: 10,
          }}
        >
          {"  "}USD
        </Text>
      </Text>
    </View>
  );
};
