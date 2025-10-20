import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#1E90FF"
  },
  top: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#87CEFA" },
  middle: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00BFFF" },
  bottom: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#4682B4" },
});