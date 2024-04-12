import * as React from "react";
import { StyleProp, TextStyle } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

// import { type TextInputProps } from "react-native"
type InputProps = {
  onChangeText: TextInputProps["onChangeText"];
  label?: string;
  suffix?: React.ReactNode | string;
  prefix?: React.ReactNode | string;
  outline?: boolean;
  containerStyle?: StyleProp<TextStyle>;
} & TextInputProps;

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      onChangeText,
      outline,
      style,
      prefix,
      containerStyle,
      suffix,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    console.log(isFocused, ":::IS focused");

    return (
      <View style={[styles.containerView]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            containerStyle,
            styles.inputView,
            outline &&
              (isFocused ? styles.inputViewFocus : styles.inputViewNormal),
          ]}
        >
          {prefix && prefix}
          <TextInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={ref}
            {...props}
            onChangeText={onChangeText}
            style={[styles.input, style]}
          />
          {suffix && suffix}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containerView: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  inputView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  inputViewFocus: {
    borderColor: "#18EAFF",
    borderWidth: 1,
  },
  inputViewNormal: {
    borderColor: "#3A4452",
    borderWidth: 1,
  },
  label: {
    paddingBottom: 4,
    fontSize: 18,
    color: "white",
  },
});

// const Input: React.FC<{
//   suffix?: React.ReactNode | string;
//   prefix?: React.ReactNode | string;
//   props?: TextInputProps;
//   inputRef?: any;
//   label?: string;

//   prompt?: React.ReactNode | string;
// }> = ({ props, suffix, prefix, label, prompt, inputRef }) => {
//   return (
//     <View className="mb-4 grid w-full items-start justify-between">
//       {label && <Text className="pb-2 text-sm text-white">{label}</Text>}
//       <View className="flex w-full flex-row items-center justify-start rounded-lg border border-gray-500 px-3 focus:border-[#18EAFF]">
//         {prefix && prefix}
//         <TextInput
//           ref={inputRef}
//           {...props}
//           className="flex flex-1 items-center justify-center px-4 py-3 text-left text-black placeholder:text-white/60"
//         />
//         {suffix && suffix}
//       </View>
//       {prompt && prompt}
//     </View>
//   );
// };

// export default Input;
