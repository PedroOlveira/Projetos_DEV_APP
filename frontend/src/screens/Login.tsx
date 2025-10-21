import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
export default function Login({ navigation }: any) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const handleLogin = async () => { const ok = await signIn(email.trim(), password); if (ok) navigation.replace("Main"); else Alert.alert("Erro", "Credenciais inválidas"); };
  return (<SafeAreaView style={styles.container}>
      <Text style={styles.title}>App Scholar</Text>
      <TextInput placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}><Text style={styles.btnLabel}>Entrar</Text></TouchableOpacity>
    </SafeAreaView>);
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:"center",justifyContent:"center",padding:20}, title:{fontSize:24,marginBottom:16},
  input:{width:"100%",borderWidth:1,borderColor:"#ccc",borderRadius:8,padding:12,marginBottom:10}, btn:{backgroundColor:"#1E90FF",padding:12,borderRadius:8,width:"100%",alignItems:"center"}, btnLabel:{color:"#fff",fontWeight:"600"}});
