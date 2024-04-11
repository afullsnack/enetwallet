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
} from "react-native-safe-area-context";

interface ISafeAreaViewProps {
  style?: SafeAreaViewProps["style"];
  children: React.ReactNode;
}
type Ref = SafeAreaViewProps;
export const Container = React.forwardRef<Ref, ISafeAreaViewProps>(
  ({ children, style }, ref) => {
    return (
      <SafeAreaView
        style={[styles.container, style]}
        edges={["right", "bottom", "left"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "position"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
  },
});
