import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useCep } from "../contexts/CepContext";

export default function Historico() {
  const { ceps } = useCep();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico de Consultas</Text>
      {ceps.length === 0 ? (
        <Text>Nenhum CEP consultado ainda.</Text>
      ) : (
        ceps.map((item, idx) => (
          <View key={idx} style={styles.item}>
            <Text>{item.cep} - {item.logradouro}, {item.bairro}, {item.localidade}-{item.uf}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  item: { marginVertical: 5, padding: 5, borderBottomWidth: 1, borderColor: "#ccc" },
});