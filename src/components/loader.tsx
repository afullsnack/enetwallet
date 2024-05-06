import { ActivityIndicator, View } from "react-native";
import Popup from "./popup";

export default function Loader({
  popupVisible,
  setPopupVisible,
}: {
  popupVisible: boolean;
  setPopupVisible: any;
}) {
  return (
    <Popup
      isPopupVisible={popupVisible}
      setPopupVisible={setPopupVisible}
      tapToClose={false}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 40,
          backgroundColor: "white",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"#18EAFFCC"} />
      </View>
    </Popup>
  );
}
