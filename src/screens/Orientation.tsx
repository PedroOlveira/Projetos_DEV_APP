import React from "react";
import { Text, SafeAreaView } from "react-native";
import useOrientation from "../hooks/useOrientation";

export default function Orientation() {
  const mode = useOrientation();
  const bg = mode === "portrait" ? "#FFA500" : "#1E90FF";
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: bg }}>
      <Text style={{ fontSize: 22 }}>Tela em modo {mode}</Text>
    </SafeAreaView>
  );
}