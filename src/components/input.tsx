import * as React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

// import { type TextInputProps } from "react-native"

const Input: React.FC<{
  suffix?: React.ReactNode | string;
  prefix?: React.ReactNode | string;
  props?: TextInputProps;
  inputRef?: any;
  label?: string;

  prompt?: React.ReactNode | string;
}> = ({ props, suffix, prefix, label, prompt, inputRef }) => {
  return (
    <View className="mb-4 grid w-full items-start justify-between">
      {label && <Text className="pb-2 text-sm text-white">{label}</Text>}
      <View className="flex w-full flex-row items-center justify-start rounded-lg border border-gray-500 px-3 focus:border-[#18EAFF]">
        {prefix && prefix}
        <TextInput
          ref={inputRef}
          {...props}
          className="flex flex-1 items-center justify-center px-4 py-3 text-left text-black placeholder:text-white/60"
        />
        {suffix && suffix}
      </View>
      {prompt && prompt}
    </View>
  );
};

export default Input;
