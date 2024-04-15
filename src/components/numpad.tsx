import { EvilIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Numpad = ({
  onConfirmPressed,
  onPinChange,
  onEntryComplete,
  type = "register",
  codeLength = 6,
  code,
  setCode,
}: any) => {
  useEffect(() => {
    if (code.length === codeLength) {
      //TODO: call return code input
      onEntryComplete(code);
    }
  }, [code]);

  const onNumberPress = async (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
    onPinChange([...code, number].join(""));
  };

  const numberBackspace = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
    onPinChange(code.slice(0, -1).join(""));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 80,
        gap: 30,
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
              onPress={() => onNumberPress(number)}
              style={{ padding: 20 }}
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
              onPress={() => onNumberPress(number)}
              style={{ padding: 20 }}
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
              onPress={() => onNumberPress(number)}
              style={{ padding: 20 }}
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
          {type === "register" && (
            <TouchableOpacity onPress={() => {}} style={{ padding: 20 }}>
              <Text style={styles.number}>{"."}</Text>
            </TouchableOpacity>
          )}

          {type === "recovery" && (
            <TouchableOpacity onPress={() => {}} style={{ padding: 20 }}>
              <Image
                source={require("../../assets/wallet/face_id.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
                contentFit="contain"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => onNumberPress(0)}
            style={{ padding: 20 }}
          >
            <Text style={styles.number}>{0}</Text>
          </TouchableOpacity>

          {type === "recovery" && (
            <TouchableOpacity
              onPress={() => numberBackspace()}
              style={{ paddingVertical: 20, paddingHorizontal: 10 }}
            >
              <EvilIcons name="close" size={25} color="#ADB5BF" />
            </TouchableOpacity>
          )}
          {type === "register" && <View style={{ minWidth: 40 }} />}
        </View>
      </View>
      <View style={{ flexDirection: "column", gap: 60 }}>
        {type === "register" && (
          <TouchableOpacity
            onPress={() => numberBackspace()}
            style={{ padding: 20 }}
          >
            <EvilIcons name="close" size={25} color="#ADB5BF" />
          </TouchableOpacity>
        )}

        {type === "recovery" && (
          <TouchableOpacity
            onPress={() => numberBackspace()}
            style={{ padding: 20, marginTop: 5 }}
          >
            <Text
              style={{
                color: "rgba(173, 181, 191, 1)",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Forgot
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onConfirmPressed}
          style={{
            width: "100%",
            minHeight: 170,
            backgroundColor: code.length >= 6 ? "#18EAFFCC" : "#12131B",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 9,
          }}
        >
          <Text style={{ color: "white" }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  number: {
    fontSize: 22,
    color: "#ADB5BF",
  },
  numbersView: {
    // marginHorizontal: 80,
    gap: 30,
  },
});
