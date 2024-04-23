import type { ReactNode } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface PopupProps {
  children: ReactNode;
  isPopupVisible: boolean;
  setPopupVisible: (visible: boolean) => void;
  tapToClose?: boolean | undefined;
}
export default function Popup({
  children,
  isPopupVisible,
  setPopupVisible,
  tapToClose,
}: PopupProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isPopupVisible}
      onRequestClose={() => {
        if (tapToClose) {
          setPopupVisible(false);
        }
        console.log("back request!");
      }}
    >
      <TouchableWithoutFeedback
        className="h-full w-full"
        onPress={tapToClose ? () => setPopupVisible(false) : undefined}
      >
        <View style={styles.centeredView}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "relative",
    backgroundColor: "rgba(0,0,0,.34)",
  },
  modalView: {
    // minWidth: 200,
    // maxWidth: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    shadowColor: "#000",
    position: "absolute",
    top: 20,
    right: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
