import React, { forwardRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import { Button } from "./button";
import { FadeOutRight } from "react-native-reanimated";

interface SwapTokenPickerProps {
  sheetRef: any;
  toValue: string;
  fromValue: string;
  onInputFocus: (isFocused: boolean, inputType: "from" | "to") => void;
  handleFromChange: (text: string) => void;
  handleToChange: (text: string) => void;
  onFromSelectChange?: ({ start, end }: { start: number; end: number }) => void;
  onToSelectChange?: ({ start, end }: { start: number; end: number }) => void;
}
export default function SwapTokenPicker({
  sheetRef,
  toValue,
  fromValue,
  onInputFocus,
  handleFromChange,
  handleToChange,
  onToSelectChange,
  onFromSelectChange,
}: SwapTokenPickerProps) {
  return (
    <View
      className="flex flex-col gap-2 w-full items-center mb-[2px]"
      style={{ position: "relative" }}
    >
      <View
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          right: "45%",
          top: "45%",
          zIndex: 50,
          padding: 6,
          borderWidth: 4,
          borderRadius: 99999,
          borderColor: "#0C0C12",
          backgroundColor: "#12131B",
        }}
      >
        <Image
          source={require("../../assets/icons/dashboard/swap/swap_shapes.png")}
          style={{ flex: 1 }}
          contentFit="contain"
        />
      </View>
      <View
        className="flex flex-col p-3 gap-2"
        style={{ backgroundColor: "#12131B", borderRadius: 8 }}
      >
        <View className="flex flex-row items-center justify-between w-full">
          <SelectToken
            onPress={() => {
              // tokenSheetRef.current.present();
              sheetRef?.current?.open();
            }}
          />
          <SwapInput
            style={{ color: "white", fontSize: 18 }}
            placeholder="0"
            value={fromValue}
            placeholderTextColor={"white"}
            onChangeText={handleFromChange}
            onInputFocus={(text) => onInputFocus(text, "from")}
            onSelectionChange={(select) =>
              onToSelectChange(select?.nativeEvent.selection)
            }
          />
        </View>
        <View className="flex flex-row items-center justify-between w-full">
          <Text
            style={{
              color: "#49515D",
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            From
          </Text>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 7,
            }}
          >
            <Text
              style={{
                color: "#49515D",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              250.06 DAI
            </Text>
            <TouchableOpacity style={{}}>
              <Text
                style={{
                  color: "#18EAFF",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                MAX
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        className="flex flex-col  bg-[#12131B] rounded-lg p-3 gap-2"
        style={{ backgroundColor: "#12131B", borderRadius: 8 }}
      >
        <View className="flex flex-row items-center justify-between w-full">
          <Text
            style={{
              color: "#49515D",
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            To
          </Text>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 7,
              paddingVertical: 5,
            }}
          >
            <Text
              style={{
                color: "#49515D",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              250.06 DAI
            </Text>
            <TouchableOpacity style={{ display: "none" }}>
              <Text
                style={{
                  color: "#18EAFF",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                MAX
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between w-full">
          <SelectToken
            onPress={() => {
              // tokenSheetRef.current.present();
              sheetRef?.current?.open();
            }}
          />
          <SwapInput
            style={{ color: "white", fontSize: 18 }}
            placeholder="0"
            value={toValue}
            placeholderTextColor={"white"}
            onChangeText={handleToChange}
            onInputFocus={(text) => onInputFocus(text, "to")}
            onSelectionChange={(select) =>
              onToSelectChange(select?.nativeEvent.selection)
            }
          />
        </View>
      </View>
    </View>
  );
}
const SelectToken = ({ onPress, network, tokenSymbol, tokenBalance }: any) => {
  return (
    <Button
      onPress={onPress}
      style={{
        margin: 0,
        padding: 0,
        flex: 1,
        backgroundColor: "#12131B",
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        width: "auto",
      }}
    >
      <View className="relative p-1">
        <Image
          source={require("../../assets/icons/dashboard/dai.png")}
          style={{ width: 35, height: 35 }}
          contentFit="contain"
        />

        <Image
          source={require("../../assets/icons/dashboard/eth.png")}
          style={{
            width: 15,
            height: 15,
            position: "absolute",
            bottom: 2,
            right: 2,
          }}
          contentFit="contain"
        />
      </View>
      <View className="flex flex-row w-auto items-center justify-start">
        <View className="flex flex-col">
          <View className="flex flex-row items-center gap-1">
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
              }}
            >
              DAI
            </Text>
            <Image
              source={require("../../assets/icons/carret.png")}
              style={{ width: 20, height: 20 }}
              contentFit="contain"
            />
          </View>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#49515D",
            }}
          >
            Ehtereum
          </Text>
        </View>
        {/* <View className="flex flex-col items-end">
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#49515D",
              }}
            >
              Available
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "white",
            }}
          >
            600,000.89
            <Text style={{ color: "#49515D" }}>{"  "} DAI</Text>
          </Text>
        </View> */}
      </View>
    </Button>
  );
};

type SwapInputProps = {
  onChangeText: TextInputProps["onChangeText"];
  onInputFocus?: (isFocused: boolean) => void;
} & TextInputProps;
const SwapInput = forwardRef<TextInput, SwapInputProps>(
  ({ onChangeText, onInputFocus, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      // <View style={styles.containerView}>
      <View
        style={[
          styles.inputView,
          // outline &&
          //   (isFocused ? styles.inputViewFocus : styles.inputViewNormal),
        ]}
      >
        <TextInput
          // showSoftInputOnFocus={false}
          onFocus={() => {
            onInputFocus(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            onInputFocus(false);
            setIsFocused(false);
          }}
          ref={ref}
          {...props}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          style={[styles.input]}
        />

        <Text style={styles.label}>{"$0.0"}</Text>
      </View>
      // </View>
    );
  },
);

const styles = StyleSheet.create({
  containerView: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    width: "auto",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  inputView: {
    display: "flex",
    flex: 1,
    width: "auto",
    backgroundColor: "#0C0C12",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 60,
    gap: 5,
    padding: 5,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  input: {
    flex: 1,
    width: "100%",
    color: "white",
    fontSize: 28,
    textAlign: "right",
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
    fontSize: 11,
    color: "#49515D",
  },
});
