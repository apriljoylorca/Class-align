import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        "Lora-Bold": require("./assets/fonts/Lora-Bold.ttf"),
        "Lora-Medium": require("./assets/fonts/Lora-Medium.ttf"),
        "Lora-Regular": require("./assets/fonts/Lora-Regular.ttf"),
        "Lora-SemiBold": require("./assets/fonts/Lora-SemiBold.ttf"),
        "Lora-Italic": require("./assets/fonts/Lora-Italic.ttf"),
        "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
        "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf"),
        "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
        "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
        "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
        "Milonga-Regular": require("./assets/fonts/Milonga-Regular.ttf"),
        "Jacques-Francois-Shadow": require("./assets/fonts/JacquesFrancoisShadow-Regular.ttf"),
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return <AppNavigator />;
}