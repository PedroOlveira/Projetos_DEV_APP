import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import ViaCep from "./src/screens/ViaCep";
import Historico from "./src/screens/Historico";
import { CepProvider } from "./src/contexts/CepContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <CepProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="ViaCEP"
          screenOptions={({ route }) => ({
            drawerIcon: ({ color, size }) => {
              const icons = {
                ViaCEP: "map-outline",
                Histórico: "list-outline",
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
          })}
        >
          <Drawer.Screen name="ViaCEP" component={ViaCep} />
          <Drawer.Screen name="Histórico" component={Historico} />
        </Drawer.Navigator>
      </NavigationContainer>
    </CepProvider>
  );
}