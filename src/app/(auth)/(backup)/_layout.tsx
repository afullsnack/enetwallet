import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function BackupLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
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
