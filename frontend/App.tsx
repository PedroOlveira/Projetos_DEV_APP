import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Students from "./src/screens/Students";
import Disciplines from "./src/screens/Disciplines";
import Professors from "./src/screens/Professors";
import Bulletin from "./src/screens/Bulletin";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppDrawer() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "professor";

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ color, size }) => {
          const icons = {
            Home: "home", Students: "school", Disciplines: "menu-book",
            Professors: "people", Bulletin: "assignment",
          };
          // @ts-ignore
          return <MaterialIcons name={icons[route.name] || "apps"} color={color} size={size} />;
        },
      })}
    >
      <Drawer.Screen name="Home" component={Home} />
      {isAdmin && <Drawer.Screen name="Students" component={Students} />}
      {isAdmin && <Drawer.Screen name="Disciplines" component={Disciplines} />}
      {isAdmin && <Drawer.Screen name="Professors" component={Professors} />}
      <Drawer.Screen name="Bulletin" component={Bulletin} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={AppDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
