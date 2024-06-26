import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
// import * as Updates from "expo-updates";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { SessionProvider } from "@/contexts/session";
// import { Alert } from "react-native";

export default function Layout() {
  // onFetchUpdateAsync().catch((result) =>
  //   console.log(result, ":::_layout.tsx file"),
  // );

  // async function onFetchUpdateAsync() {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();
  //     if (update.isAvailable) {
  //       Alert.alert("Updating app", "Wait for latest update to be fetched...");
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   } catch (error: any) {
  //     // You can also add an alert() to see the error message in case of an error when fetching updates.
  //     Alert.alert("Update error", `Error fetching latest update: ${error}`);
  //   }
  // }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SessionProvider>
            <Stack screenOptions={{ headerShown: false }}>
            </Stack>
            {/* <Stack.Screen
                name="(main)/(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(main)/(wallet)"
                options={{ headerShown: false }}
              /> */}
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
