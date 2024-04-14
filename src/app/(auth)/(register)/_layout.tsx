import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RegisterLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0C0C12",
          },
          headerTitleStyle: { color: "white" },
          title: "",
          headerLeft(props) {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../../../assets/back-arrow.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      >
        <Stack.Screen
          name="username"
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="referral"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="email"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="phone"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="code"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pin"
          options={{
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar
        style="auto"
        backgroundColor="#0C0C12"
        translucent
        networkActivityIndicatorVisible={true}
        hidden={false}
      />
    </SafeAreaProvider>
  );
}
