import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type Ref = BottomSheetModal;

interface Props {
  children: React.ReactNode;
  title: string;
}

const ModalSheet = forwardRef<Ref, Props>((props, ref) => {
  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
    >
      <View className="flex-1 place-items-center">{props.children}</View>
    </BottomSheetModal>
  );
});

export default ModalSheet;
