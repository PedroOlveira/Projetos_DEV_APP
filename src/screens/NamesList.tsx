import React, { useState } from "react";
import { SafeAreaView, TextInput, FlatList, Text, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import useOrientation from "../hooks/useOrientation";

export default function NamesList() {
  const [name, setName] = useState("");
  const [list, setList] = useState<string[]>([]);
  const mode = useOrientation();

  const onSubmit = () => {
    const n = name.trim();
    if (n.length > 0) setList(prev => [...prev, n]);
    setName("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor: mode === "portrait" ? "#fff" : "#eef" }]}>
        <TextInput
          placeholder="Digite um nome e pressione OK"
          value={name}
          onChangeText={setName}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
          style={styles.input}
        />
        <FlatList
          data={list}
          keyExtractor={(item, idx) => item + idx}
          renderItem={({ item }) => (
            <View style={styles.row}><Text style={styles.text}>{item}</Text></View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  input: { borderWidth: 1, borderColor: "#bbb", padding: 12, borderRadius: 8, marginBottom: 12 },
  row: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  text: { fontSize: 16 }
});