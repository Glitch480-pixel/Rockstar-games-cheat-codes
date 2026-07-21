import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScreenBackground({ theme, children }) {
  return (
    <LinearGradient colors={theme.backgroundGradient} style={styles.flex}>
      <SafeAreaView style={styles.flex}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
