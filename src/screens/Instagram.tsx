import React from "react";
import { SafeAreaView, Button, Alert, Linking } from "react-native";

export default function Instagram() {
  const open = async () => {
    const url = "https://www.instagram.com/fatec_jacarei";
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert("Erro", "Não foi possível abrir o Instagram.");
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Abrir Instagram da Fatec Jacareí" onPress={open} />
    </SafeAreaView>
  );
}