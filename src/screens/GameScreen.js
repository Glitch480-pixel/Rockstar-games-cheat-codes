import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ScreenBackground from '../components/ScreenBackground';
import SearchBar from '../components/SearchBar';
import PlatformToggle from '../components/PlatformToggle';
import CheatItem from '../components/CheatItem';
import { themes, games } from '../theme/themes';
import { cheatData } from '../data/cheats';
import { useAppTheme } from '../theme/ThemeContext';

export default function GameScreen({ route, navigation }) {
  const { gameId } = route.params;
  const { setThemeId, resetTheme } = useAppTheme();
  const theme = themes[gameId];
  const game = games.find((g) => g.id === gameId);
  const data = cheatData[gameId];

  const [platform, setPlatform] = useState('pc');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setThemeId(gameId);
  }, [gameId, setThemeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.cheats;
    return data.cheats.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.category || '').toLowerCase().includes(q)
      );
    });
  }, [query, data.cheats]);

  const note = platform === 'pc' ? data.pcNote : data.consoleNote;

  const handleBack = () => {
    resetTheme();
    navigation.navigate('Home');
  };

  return (
    <ScreenBackground theme={theme}>
      <StatusBar style={theme.statusBarStyle} />

      <View style={styles.header}>
        <Pressable onPress={handleBack} hitSlop={12} style={styles.backBtn}>
          <Text style={[styles.backArrow, { color: theme.accent }]}>‹</Text>
          <Text style={[styles.backText, { color: theme.accent, fontFamily: theme.fontBody }]}>Home</Text>
        </Pressable>
        <Text
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontFamily: theme.fontDisplay,
              letterSpacing: theme.letterSpacingDisplay,
            },
          ]}
          numberOfLines={1}
        >
          {game.theme.shortName}
        </Text>
        <View style={[styles.rule, { backgroundColor: theme.accent }]} />
      </View>

      <PlatformToggle value={platform} onChange={setPlatform} theme={theme} />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        theme={theme}
        placeholder="Search by name or effect..."
      />

      {note ? (
        <Text style={[styles.note, { color: theme.textSecondary, fontFamily: theme.fontBody }]}>
          {note}
        </Text>
      ) : null}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CheatItem cheat={item} code={item[platform]} theme={theme} />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textSecondary, fontFamily: theme.fontBody }]}>
            No cheats match "{query}".
          </Text>
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 26,
    marginRight: 2,
    marginTop: -2,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  rule: {
    height: 3,
    width: 44,
    marginTop: 10,
    borderRadius: 2,
  },
  note: {
    fontSize: 12,
    lineHeight: 17,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
});
