import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthLayout() {

  useEffect(() => {
    (async () => {
      await SystemUI.setBackgroundColorAsync("#0C0C12");
      console.log(await SystemUI.getBackgroundColorAsync());
    })();
  }, []);

  
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(login)" options={{ headerShown: false, contentStyle:{backgroundColor: "#0C0C12"} }} />
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
    </>
  );
}
