import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const SwapNumpad = ({
  onConfirmPressed,
  onChange,
  onEntryComplete,
  onBackSpacePressed,
  sheetRef,
  isSheetOpen,
  currentValue,
}: any) => {
  const [charArray, setCharArray] = useState(
    typeof currentValue !== "undefined" ? currentValue.split() : [],
  );

  const onValuePress = async (number: number | string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange([...charArray, number].join(""));
    setCharArray([...charArray, number]);
  };

  const numberBackspace = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(charArray.slice(0, -1).join(""));
    setCharArray(charArray.slice(0, -1));
    onBackSpacePressed();
  };

  useEffect(() => {
    if (!isSheetOpen) {
      setCharArray([]);
    } else {
      if (typeof currentValue !== "undefined") {
        setCharArray(currentValue.split());
      }
    }
    return () => setCharArray([]);
  }, [isSheetOpen]);

  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 60,
          gap: 20,
        }}
      >
        <View style={styles.numbersView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

              display: "flex",
              width: "100%",
            }}
          >
            {[1, 2, 3].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onValuePress(number)}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
            }}
          >
            {[4, 5, 6].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onValuePress(number)}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
            }}
          >
            {[7, 8, 9].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onValuePress(number)}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => onValuePress(".")}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
              }}
            >
              <Text style={styles.number}>{"."}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onValuePress(0)}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Text style={styles.number}>{0}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => sheetRef.current.close()}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <EvilIcons name="close" size={25} color="#18EAFFCC" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 30,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => numberBackspace()}
            style={{
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="backspace-outline"
              size={16}
              color="#18EAFFCC"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              if (onConfirmPressed) {
                onConfirmPressed();
              }
            }}
            style={{
              width: "100%",
              minHeight: 170,
              backgroundColor: "#18EAFFCC",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderRadius: 9,
              flex: 1,
            }}
          >
            <Text style={{ color: "white" }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  number: {
    fontSize: 22,
    color: "#18EAFFCC",
  },
  numbersView: {
    // marginHorizontal: 80,
    gap: 30,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
