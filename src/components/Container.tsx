import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface ISafeAreaViewProps {
  style?: SafeAreaViewProps["style"];
  children: React.ReactNode;
}
type Ref = SafeAreaViewProps;
export const Container = React.forwardRef<Ref, ISafeAreaViewProps>(
  ({ children, style }, ref) => {
    const { top, bottom } = useSafeAreaInsets();
    // const { height } = useSafeAreaFrame();

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={[
            styles.container,
            style,
            { paddingTop: top, paddingBottom: bottom },
          ]}
          edges={["right", "left", "bottom"]}
        >
          {children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C0C12",
    // padding: 24,
  },
});
