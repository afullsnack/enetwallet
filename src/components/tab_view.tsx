import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const TabView: React.FC<{
  items: React.ReactNode[];
  tabList: string[];
}> = ({ items, tabList }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View className="grid w-full items-start justify-start">
      <View className="mb-2 flex h-8 w-full">
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={tabList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex items-center justify-center rounded-full px-4 py-1"
              style={{
                // backgroundColor:
                //   activeIndex === index ? "#18EAFF" : "transparent",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
              onPress={() => {
                console.log(index, "Index");
                setActiveIndex(index);
              }}
            >
              <Text
                style={{
                  color: activeIndex === index ? "#FFFFFF" : "#49515D",
                }}
              >
                {item}
              </Text>
              <View
                style={{
                  height: 2.2,
                  width: "75%",
                  borderRadius: 9999,
                  backgroundColor:
                    activeIndex === index ? "#18EAFF" : "transparent",
                }}
              />
            </TouchableOpacity>
          )}
          horizontal
          className="w-full"
        />
      </View>
      <View className="w-full">{items[activeIndex]}</View>
    </View>
  );
};

// Subtab that can nested inside a TabView
const SubTab: React.FC<{
  items: React.ReactNode[];
  tabList: string[];
}> = ({ items, tabList }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View className="grid w-full items-start justify-start">
      <View className="mb-2 flex h-8 w-full">
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={tabList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex items-center justify-center px-4 py-1"
              style={{
                borderBottomWidth: 1,
                borderBottomColor:
                  activeIndex === index ? "#18EAFF" : "transparent",
              }}
              onPress={() => {
                console.log(index, "Index");
                setActiveIndex(index);
              }}
            >
              <Text
                style={{
                  color: activeIndex === index ? "#FFFFFF" : "#49515D",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          className="w-full"
        />
      </View>
      <View className="w-full">{items[activeIndex]}</View>
    </View>
  );
};

export { SubTab, TabView };
