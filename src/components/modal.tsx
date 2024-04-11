import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

interface ISheetModal {
  children: ReactNode;
}
type Ref = BottomSheetModal;
export const SheetModal = forwardRef<Ref, ISheetModal>(({ children }, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        animatedIndex={animatedIndex}
        {...props}
        animatedPosition={animatedPosition}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={renderBackdrop}
      style={{ backgroundColor: "#0C0C12" }}
      handleStyle={{
        backgroundColor: "#0C0C12",
        borderWidth: 0,
        borderColor: "transparent",
      }}
      enablePanDownToClose
      // handleIndicatorStyle={}
      // backgroundStyle={}
      // backdropComponent={}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
