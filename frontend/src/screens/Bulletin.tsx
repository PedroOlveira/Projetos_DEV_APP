import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { api } from "../services/api";
type Row = { discipline: string; grade1: number; grade2: number; average: number };
export default function Bulletin() {
  const [studentId, setStudentId] = useState(""); const [rows, setRows] = useState<Row[]>([]);
  const fetchData = async () => { if (!studentId) return; const { data } = await api.get(`/bulletin/${studentId}`); setRows(data.rows || []); };
  return (<SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 8 }}>Boletim</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <TextInput placeholder="ID do aluno" keyboardType="numeric" style={styles.input} value={studentId} onChangeText={setStudentId} />
        <TouchableOpacity style={styles.btn} onPress={fetchData}><Text style={styles.btnLabel}>Consultar</Text></TouchableOpacity>
      </View>
      <FlatList data={rows} keyExtractor={(it, idx)=>String(idx)} renderItem={({ item }) => (
        <View style={styles.row}><Text style={styles.title}>{item.discipline}</Text>
          <Text>N1: {item.grade1}   N2: {item.grade2}   Média: {item.average.toFixed(1)}</Text></View>)}/>
    </SafeAreaView>);
}
const styles = StyleSheet.create({ input:{ flex:1, borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:10 },
  btn:{ backgroundColor:"#1E90FF", padding:12, borderRadius:8, alignItems:"center" }, btnLabel:{ color:"#fff", fontWeight:"600" },
  row:{ paddingVertical:10, borderBottomWidth:1, borderBottomColor:"#eee" }, title:{ fontWeight:"700" } });
