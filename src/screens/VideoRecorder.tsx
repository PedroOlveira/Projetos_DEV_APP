import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, Alert, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

export default function VideoRecorder() {
  const [video, setVideo] = useState<string | null>(null);
  const [hasCam, setHasCam] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasCam(status === "granted");
    })();
  }, []);

  const record = async () => {
    if (hasCam === false) {
      Alert.alert("Sem permissão para câmera");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setVideo(result.assets[0].uri);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 12 }}>
      <Button title="Gravar um vídeo" onPress={record} />
      {video && (
        <View style={{ marginTop: 16 }}>
          <Video
            source={{ uri: video }}
            style={{ width: "100%", height: 240 }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}
    </SafeAreaView>
  );
}