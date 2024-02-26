import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RegisterLayout() {
  return (
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
                source={require("../../../../assets/arrow-left-img.png")}
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
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pin"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
