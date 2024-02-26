import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { Touchable, TouchableOpacity, View } from "react-native";

export default function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: "#0C0C12",
        // },
        // headerTitleStyle: { color: "white" },
        // title: "",
        // headerLeft(props) {
        //   return (
        //     <TouchableOpacity onPress={() => router.back()}>
        //       <Image
        //         source={require("../../../../assets/arrow-left-img.png")}
        //         style={{ width: 24, height: 24 }}
        //       />
        //     </TouchableOpacity>
        //   );
        // },
      }}
    >
      <Stack.Screen name="main" options={{ headerShown: false }} />
      {/* <Stack.Screen name="recovery/index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="recovery/email" options={{ headerShown: false }} />
      <Stack.Screen name="recovery/phone" options={{ headerShown: false }} />
      <Stack.Screen name="recovery/scan" options={{ headerShown: false }} />
    </Stack>
  );
}
