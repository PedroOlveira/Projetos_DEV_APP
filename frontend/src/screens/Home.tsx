import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
export default function Home({ navigation }: any) {
  const { user, signOut } = useAuth();
  return (<SafeAreaView style={styles.container}>
      <Text style={styles.title}>Olá, {user?.name}</Text><Text>Perfil: {user?.role}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Bulletin")}><Text style={styles.btnLabel}>Ver Boletim</Text></TouchableOpacity>
      {(user?.role === "admin" || user?.role === "professor") && (<>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Students")}><Text style={styles.btnLabel}>Alunos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Disciplines")}><Text style={styles.btnLabel}>Disciplinas</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Professors")}><Text style={styles.btnLabel}>Professores</Text></TouchableOpacity>
      </>)}
      <TouchableOpacity style={[styles.btn,{backgroundColor:"#e74c3c"}]} onPress={signOut}><Text style={styles.btnLabel}>Sair</Text></TouchableOpacity>
    </SafeAreaView>);
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:"center",justifyContent:"center",padding:20}, title:{fontSize:22,marginBottom:12},
  btn:{backgroundColor:"#1E90FF",padding:12,borderRadius:8,width:"100%",alignItems:"center",marginTop:8}, btnLabel:{color:"#fff",fontWeight:"600"}});
