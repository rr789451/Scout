import { SplashScreen, Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import GlobalProvider from "@/lib/global-provider";
import { FilterModalProvider } from "@/lib/filterModalContext";
import { StripeProvider } from "@/lib/StripeProvider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts( {
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
  }); 

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])
  
  if(!fontsLoaded) return null;
  
  return (
    <GlobalProvider>
      <FilterModalProvider>
        <StripeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </StripeProvider>
      </FilterModalProvider>
    </GlobalProvider>
  )
}
