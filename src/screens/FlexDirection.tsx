import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import useOrientation from "../hooks/useOrientation";
import stylesPortrait from "../styles/portrait";
import stylesLandscape from "../styles/landscape";

export default function FlexDirection() {
  const mode = useOrientation();
  const styles = mode === "portrait" ? stylesPortrait : stylesLandscape;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}><Text>Top</Text></View>
      <View style={styles.middle}><Text>Middle</Text></View>
      <View style={styles.bottom}><Text>Bottom</Text></View>
    </SafeAreaView>
  );
}