import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./src/navigation/BottomTabs";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import React from "react";
import MainStackNavigator from "./src/navigation/MainStackNavigator";



export default function App() {
  return (
    <NavigationContainer>
      {/* <BottomTabs/> */}
      <MainStackNavigator/>
    </NavigationContainer>
  );
}
