import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

export default function GameCard({ game, onPress, theme }) {
  const gt = game.theme;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={[styles.swatch, { backgroundColor: gt.background, borderColor: gt.accent }]}>
        <View style={[styles.swatchDot, { backgroundColor: gt.accent }]} />
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>{game.title}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{game.subtitle}</Text>
      </View>
      <Text style={[styles.chevron, { color: theme.accent }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  swatchDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
  },
  chevron: {
    fontSize: 26,
    fontWeight: '300',
  },
});
