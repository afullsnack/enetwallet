import { EvilIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Numpad = ({ onConfirmPressed, onPinChange }: any) => {
  const [code, setCode] = useState<number[]>([]);

  useEffect(() => {
    if (code.length === 6) {
      //TODO: call return code input
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
          <TouchableOpacity onPress={() => {}} style={{ padding: 20 }}>
            <Text style={styles.number}>{"."}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onNumberPress(0)}
            style={{ padding: 20 }}
          >
            <Text style={styles.number}>{0}</Text>
          </TouchableOpacity>

          <View style={{ minWidth: 40 }} />
        </View>
      </View>
      <View style={{ flexDirection: "column", gap: 60 }}>
        <TouchableOpacity
          onPress={() => numberBackspace()}
          style={{ padding: 20 }}
        >
          <EvilIcons name="close" size={25} color="#ADB5BF" />
        </TouchableOpacity>
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
