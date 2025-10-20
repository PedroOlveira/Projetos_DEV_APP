import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Button, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const cam = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cam.status === "granted");
    })();
  }, []);

  const pickFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setImages(prev => [result.assets[0].uri, ...prev]);
  };

  const takePhoto = async () => {
    if (hasCameraPermission === false) {
      Alert.alert("Sem permissão para câmera");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setImages(prev => [result.assets[0].uri, ...prev]);
  };

  const removeAt = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top-right floating buttons */}
      <View style={[styles.fabContainer, { marginTop: Constants.statusBarHeight }]}>
        <TouchableOpacity style={styles.fab} onPress={pickFromLibrary}>
          <MaterialIcons name="photo" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 12, paddingTop: 56 }}>
        {images.map((uri, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity style={styles.closeBtn} onPress={() => removeAt(idx)}>
              <MaterialIcons name="close" size={18} />
            </TouchableOpacity>
          </View>
        ))}
        {images.length === 0 and (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Button title="Escolher da galeria" onPress={pickFromLibrary} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 12,
    zIndex: 10,
    flexDirection: "row",
    gap: 8
  },
  fab: {
    backgroundColor: "deepskyblue",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  card: { marginBottom: 12 },
  image: { width: "100%", height: 220, borderRadius: 8 },
  closeBtn: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    padding: 4
  }
});