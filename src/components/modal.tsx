import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import {
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
  type ComponentPropsWithRef,
} from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

interface ISheetModal extends ComponentPropsWithRef<typeof BottomSheetModal> {
  children: ReactNode;
}
type Ref = BottomSheetModal;
export const SheetModal = forwardRef<Ref, ISheetModal>(
  ({ children, style, ...props }, ref) => {
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
        {...props}
        ref={ref}
        snapPoints={props.snapPoints ?? snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        style={[style, { backgroundColor: "#0C0C12" }]}
        backgroundStyle={
          props?.backgroundStyle ?? { backgroundColor: "#0C0C12" }
        }
        handleIndicatorStyle={
          props?.handleIndicatorStyle ?? { backgroundColor: "#0C0C12" }
        }
        handleStyle={
          props?.handleStyle ?? {
            backgroundColor: "#0C0C12",
            borderWidth: 0,
            borderColor: "transparent",
          }
        }
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
  },
);

interface IBottomSheetModal extends ComponentPropsWithRef<typeof BottomSheet> {
  children: ReactNode;
  height: string | number;
}
type SheetRef = BottomSheetMethods;
export const MyBottomSheetModal = forwardRef<SheetRef, IBottomSheetModal>(
  ({ children, style, height, ...props }, ref) => {
    return (
      <BottomSheet
        {...props}
        ref={ref}
        height={height}
        style={{ backgroundColor: "#0C0C12", zIndex: 50 }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            // flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: -40,
          }}
        >
          {children}
        </View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
