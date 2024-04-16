import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const SuperTab: React.FC<{
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
                backgroundColor:
                  activeIndex === index ? "#EEEEEE" : "transparent",
              }}
              onPress={() => {
                console.log(index, "Index");
                setActiveIndex(index);
              }}
            >
              <Text
                style={{
                  color: activeIndex === index ? "#000000" : "#666666",
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
                  activeIndex === index ? "#000000" : "transparent",
              }}
              onPress={() => {
                console.log(index, "Index");
                setActiveIndex(index);
              }}
            >
              <Text
                style={{
                  color: activeIndex === index ? "#000000" : "#666666",
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

export { SubTab, SuperTab };
