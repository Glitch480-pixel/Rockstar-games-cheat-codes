import React, { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Oswald_400Regular, Oswald_500Medium, Oswald_600SemiBold } from '@expo-google-fonts/oswald';
import { Rye_400Regular } from '@expo-google-fonts/rye';
import { Merriweather_400Regular } from '@expo-google-fonts/merriweather';
import { SpecialElite_400Regular } from '@expo-google-fonts/special-elite';
import { ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';

import { ThemeProvider } from './src/theme/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';

SplashScreen.preventAutoHideAsync().catch(() => {});

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Rye_400Regular,
    Merriweather_400Regular,
    SpecialElite_400Regular,
    ShareTechMono_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </View>
  );
}
