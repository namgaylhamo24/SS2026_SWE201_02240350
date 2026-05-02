import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import MainStackNavigator from './Navigation/MainStackNavigato.r';

enableScreens();

export default function App() {
  return (
    <>
      <MainStackNavigator />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
