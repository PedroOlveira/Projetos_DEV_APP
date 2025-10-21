import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, FlatList, StyleSheet, Alert } from "react-native";
import { api } from "../services/api";
type Item = { id:number; name:string; degree?:string; tenure?:number; email?:string };
export default function Professors() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<any>({});
  const load = async () => { const { data } = await api.get("/professors"); setItems(data); };
  useEffect(() => { load(); }, []);
  const save = async () => { try { await api.post("/professors", form); setForm({}); load(); } catch (e) { Alert.alert("Erro","Não foi possível salvar"); } };
  return (<SafeAreaView style={styles.container}>
      <Text style={styles.title}>Professors</Text>
      <View style={styles.form}>
        <TextInput placeholder="name" style={styles.input} value={form?.name??""} onChangeText={t=>setForm((p:any)=>({...p,name:t}))} />
        <TextInput placeholder="code" style={styles.input} value={form?.code??""} onChangeText={t=>setForm((p:any)=>({...p,code:t}))} />
        <TextInput placeholder="course/workload" style={styles.input} value={(form?.course??form?.workload??"")} onChangeText={t=>setForm((p:any)=>({...p,course:t,workload:t}))} />
        <TextInput placeholder="email/professor_id" style={styles.input} value={(form?.email??form?.professor_id??"")} onChangeText={t=>setForm((p:any)=>({...p,email:t,professor_id:Number(t)}))} />
        <TouchableOpacity style={styles.btn} onPress={save}><Text style={styles.btnLabel}>Salvar</Text></TouchableOpacity>
      </View>
      <FlatList data={items} keyExtractor={(i)=>String((i as any).id)} renderItem={({ item }) => (<View style={styles.row}><Text>{JSON.stringify(item)}</Text></View>)} />
    </SafeAreaView>);
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 }, title: { fontSize: 22, marginBottom: 8 }, form: { gap: 8, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
  btn: { backgroundColor: "#1E90FF", padding: 12, borderRadius: 8, alignItems: "center" }, btnLabel: { color: "#fff", fontWeight: "600" },
  row: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" }
});