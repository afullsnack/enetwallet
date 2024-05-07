import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const TabView: React.FC<{
  items: React.ReactNode[];
  tabList: string[];
}> = ({ items, tabList }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View className="grid w-full items-start justify-start">
      <View className="mb-2 flex h-8 w-full" style={{ marginHorizontal: 10 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={tabList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex items-center justify-center rounded-full py-1"
              style={{
                paddingHorizontal:
                  index === 0 || index === tabList.length - 1 ? 0 : 16,
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
  extra?: React.ReactNode;
}> = ({ items, tabList, extra }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View className="grid w-full items-start justify-start">
      <View
        className="mb-2 flex w-full items-center"
        style={{
          height: items ? "auto" : 32,
          alignContent: items ? "space-between" : "center",
          flexDirection: "row",
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={tabList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex items-center justify-center px-4 py-1"
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                // borderBottomWidth: 1,
                // borderBottomColor:
                //   activeIndex === index ? "#18EAFF" : "transparent",
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
          style={{
            width: items ? "auto" : "100%",
          }}
        />
        {extra}
      </View>
      <View className="w-full">{items[activeIndex]}</View>
    </View>
  );
};

const SwapTab: React.FC<{
  items: React.ReactNode[];
  tabList: string[];
  extra?: React.ReactNode;
}> = ({ items, tabList, extra }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View className="grid w-full items-center justify-start">
      <View
        className="mb-2 flex w-full items-center"
        style={{
          paddingHorizontal: 20,
          // marginHorizontal: 20,
          // marginVertical: "auto",
        }}
      >
        <View
          style={{
            paddingVertical: 6,
            flexDirection: "row",
            backgroundColor: "#12131B",
            width: "100%",
            borderRadius: 11,
            height: items ? "auto" : 42,
            alignContent: items ? "space-between" : "center",
            justifyContent: "center",
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={tabList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className="flex items-center justify-center px-4 py-1"
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  // borderBottomWidth: 1,
                  // borderBottomColor:
                  //   activeIndex === index ? "#18EAFF" : "transparent",
                }}
                onPress={() => {
                  console.log(index, "Index");
                  setActiveIndex(index);
                }}
              >
                <Text
                  style={{
                    color: activeIndex === index ? "#18EAFF" : "#49515D",
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
            style={{
              width: items ? "auto" : "100%",
            }}
          />
          {extra}
        </View>
      </View>
      <View className="w-full mt-5">{items[activeIndex]}</View>
    </View>
  );
};

export { SubTab, TabView, SwapTab };
