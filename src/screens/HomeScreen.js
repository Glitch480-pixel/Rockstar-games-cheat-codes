import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GameCard from '../components/GameCard';
import { games } from '../theme/themes';
import { useAppTheme } from '../theme/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme, resetTheme } = useAppTheme();

  useEffect(() => {
    const unsub = navigation.addListener('focus', resetTheme);
    return unsub;
  }, [navigation, resetTheme]);

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.statusBarStyle} />
      <View style={styles.banner}>
        <Text style={[styles.bannerTitle, { color: theme.accent }]}>AJC'S</Text>
        <Text style={[styles.bannerTitle, styles.bannerTitleSecond, { color: theme.textPrimary }]}>
          CHEAT CODES
        </Text>
        <View style={[styles.rule, { backgroundColor: theme.border }]} />
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>SELECT A GAME</Text>
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            theme={theme}
            onPress={() => navigation.navigate('Game', { gameId: game.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  banner: {
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  bannerTitle: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bannerTitleSecond: {
    fontSize: 30,
    marginTop: -4,
  },
  rule: {
    height: 2,
    width: 56,
    marginTop: 16,
    borderRadius: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
});
