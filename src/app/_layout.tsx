import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { SessionProvider } from "@/contexts/session";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SessionProvider>
            <Stack screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="/" options={{ headerShown: false }} /> */}
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              {/* <Stack.Screen
                name="(main)/(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(main)/(wallet)"
                options={{ headerShown: false }}
              /> */}
            </Stack>
          </SessionProvider>
          <StatusBar
            style="auto"
            backgroundColor="#0C0C12"
            networkActivityIndicatorVisible={true}
            hidden={false}
          />
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
