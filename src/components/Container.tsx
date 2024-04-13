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
    const { height } = useSafeAreaFrame();
    return (
      <SafeAreaView
        style={[styles.container, style]}
        edges={["right", "bottom", "left"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "position"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                marginTop: top,
                marginBottom: bottom,
                maxHeight: height,
              }}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0C12",
    // padding: 24,
  },
});
