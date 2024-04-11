import { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = {
  onPress?: TouchableOpacityProps["onPress"];
  title?: string;
  style?: TouchableOpacityProps["style"];
  children?: React.ReactNode;
} & TouchableOpacityProps;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ onPress, title, children, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.button, style]}
        onPress={onPress}
      >
        {children ? children : <Text style={styles.buttonText}>{title}</Text>}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#18EAFFCC",
    borderRadius: 24,
    elevation: 5,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
