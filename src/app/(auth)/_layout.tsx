import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="(register)" options={{ headerShown: false }} />
        <Stack.Screen name="(backup)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(wallet)" options={{ headerShown: false }} /> */}
      </Stack>
      <StatusBar
        style="auto"
        backgroundColor="#0C0C12"
        translucent
        networkActivityIndicatorVisible={true}
        hidden
      />
    </SafeAreaProvider>
  );
}
