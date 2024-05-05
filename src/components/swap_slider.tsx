import { Slider } from "@miblanchard/react-native-slider";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";

export function CustomSwapSlider() {
  const trackMarks = [0.1, 0.3, 0.5, 0.7, 0.9];
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Slider
        maximumTrackTintColor="#12131B"
        minimumTrackTintColor="#18EAFF"
        minimumValue={0}
        maximumValue={1}
        step={0.2}
        value={0.2}
        trackMarks={trackMarks}
        onValueChange={(value) => console.log(value, "::Track value change")}
        renderTrackMarkComponent={(index) => (
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: currentIndex === index ? "#FFFFFF" : "#49515D",
                marginBottom: 30,
              }}
            >
              {index === 0
                ? "10%"
                : index === 1
                  ? "25%"
                  : index === 2
                    ? "50%"
                    : index === 3
                      ? "75%"
                      : "100%"}
            </Text>
          </View>
        )}
        renderThumbComponent={(index) => (
          <View
            style={{
              display: "none",
              height: 1,
              marginBottom: 1,
              borderColor: "red",
              width: 1,
              backgroundColor: "white",
            }}
          />
        )}
        renderBelowThumbComponent={(index, value) => (
          <View style={{}}>
            <Image
              source={require("../../assets/icons/carret.png")}
              style={{
                width: 18,
                height: 18,
                rotation: 180,
                translateX: -8,
                translateY: -18,
              }}
              contentFit="contain"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
  },
});
