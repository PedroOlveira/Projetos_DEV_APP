import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, Switch, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactsList() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [granted, setGranted] = useState<boolean | null>(null);
  const [onlyC, setOnlyC] = useState(true);
  const [firstNameOnly, setFirstNameOnly] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      const ok = status === "granted";
      setGranted(ok);
      if (!ok) return;
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
      });
      if (data.length > 0) setContacts(data);
    })();
  }, []);

  const filtered = contacts.filter(c => {
    const name = (firstNameOnly ? (c.firstName ?? c.name ?? "") : (c.name ?? ""));
    return onlyC ? name.trim().toUpperCase().startsWith("C") : true;
  });

  if (granted === null) return <View />;
  if (granted === false) return <SafeAreaView><Text>Sem acesso aos contatos.</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <View style={styles.row}>
        <Text>Filtrar por nomes iniciando com "C"</Text>
        <Switch value={onlyC} onValueChange={setOnlyC} />
      </View>
      <View style={styles.row}>
        <Text>Mostrar apenas primeiro nome</Text>
        <Switch value={firstNameOnly} onValueChange={setFirstNameOnly} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const display = firstNameOnly ? (item.firstName ?? item.name) : item.name;
          return (
            <View style={styles.item}>
              <Text style={{ fontSize: 16 }}>{display}</Text>
              {item.phoneNumbers?.map((p, i) => <Text key={i} style={{ color: "#555" }}>{p.number}</Text>)}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  item: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" }
});