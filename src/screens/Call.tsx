import React from "react";
import { SafeAreaView, Button, Alert, Linking } from "react-native";

export default function Call() {
  const dial = async () => {
    const phone = "1234567890";
    const url = `tel:${phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert("Erro", "Este dispositivo não suporta discagem telefônica.");
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Abrir discador com número" onPress={dial} />
    </SafeAreaView>
  );
}