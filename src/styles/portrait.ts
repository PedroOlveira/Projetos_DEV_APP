import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFA500"
  },
  top: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFA07A" },
  middle: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F08080" },
  bottom: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FF6347" },
});