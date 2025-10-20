import React from "react";
import { SafeAreaView, Button, Alert, Linking } from "react-native";

export default function Youtube() {
  const openVideo = async () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert("Erro", "Não foi possível abrir o YouTube.");
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Abrir vídeo no YouTube" onPress={openVideo} />
    </SafeAreaView>
  );
}