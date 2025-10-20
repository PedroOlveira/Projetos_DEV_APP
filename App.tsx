import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Orientation from "./src/screens/Orientation";
import FlexDirection from "./src/screens/FlexDirection";
import NamesList from "./src/screens/NamesList";
import Youtube from "./src/screens/Youtube";
import Call from "./src/screens/Call";
import Instagram from "./src/screens/Instagram";
import ContactsList from "./src/screens/ContactsList";
import Gallery from "./src/screens/Gallery";
import VideoRecorder from "./src/screens/VideoRecorder";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Orientation"
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          drawerIcon: ({ color, size }) => {
            const map = {
              Orientation: "screen-rotation",
              FlexDirection: "view-day",
              NamesList: "list",
              Youtube: "ondemand-video",
              Call: "call",
              Instagram: "photo-camera",
              Contacts: "contacts",
              Gallery: "photo-library",
              VideoRecorder: "videocam"
            };
            const name = map[route.name] ?? "apps";
            return <MaterialIcons name={name} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen name="Orientation" component={Orientation} />
        <Drawer.Screen name="FlexDirection" component={FlexDirection} />
        <Drawer.Screen name="NamesList" component={NamesList} />
        <Drawer.Screen name="Youtube" component={Youtube} />
        <Drawer.Screen name="Call" component={Call} />
        <Drawer.Screen name="Instagram" component={Instagram} />
        <Drawer.Screen name="Contacts" component={ContactsList} />
        <Drawer.Screen name="Gallery" component={Gallery} />
        <Drawer.Screen name="VideoRecorder" component={VideoRecorder} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}