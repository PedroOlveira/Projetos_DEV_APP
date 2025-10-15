import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, ScrollView, StyleSheet } from "react-native";
import { getCep } from "../services/viaCepApi";
import { useCep } from "../contexts/CepContext";

export default function ViaCep() {
  const [cep, setCep] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const { addCep } = useCep();

  const buscar = async () => {
    const dados = await getCep(cep);
    if (!dados || dados.erro) {
      Alert.alert("CEP inválido");
      return;
    }
    setResultado(dados);
    addCep(dados);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consulta CEP</Text>
      <TextInput
        value={cep}
        onChangeText={setCep}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Obter" onPress={buscar} />
      {resultado && (
        <View style={styles.result}>
          <Text>{resultado.logradouro}</Text>
          <Text>{resultado.bairro}</Text>
          <Text>{`${resultado.localidade} - ${resultado.uf}`}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  titulo: { fontSize: 22, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", width: "80%", marginBottom: 12, padding: 8 },
  result: { marginTop: 16 },
});