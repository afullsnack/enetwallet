import { SheetModal } from "@/components/modal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef } from "react";
import { Button, Text, View } from "react-native";

export default function RootIndexPage() {
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <View className="min-h-screen h-screen w-full flex-1">
      <View className="min-h-screen bg-[#0C0C12]  py-0 dark:bg-[#0C0C12] dark:text-white">
        <View className="container flex flex-col items-center justify-center px-4 py-20">
          <Button onPress={() => router.push("/(auth)/")} title="Go to auth" />
          <Button
            onPress={() => sheetRef.current.present()}
            title="Show modal"
          />
          <Button
            onPress={() => router.push("/(main)/(tabs)/")}
            title="Jump to dashboard"
          />

          <SheetModal ref={sheetRef}>
            <View
              style={{
                flex: 1,
                width: "100%",
              }}
            >
              <Text>Inside of a reusable modal sheet</Text>
            </View>
          </SheetModal>
        </View>
      </View>
    </View>
  );
}
