import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="/" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        style="auto"
        backgroundColor="#0C0C12"
        networkActivityIndicatorVisible={false}
        hidden
      />
    </SafeAreaProvider>
  );
}
