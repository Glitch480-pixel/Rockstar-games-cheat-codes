import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CheatItem({ cheat, code, theme }) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.name,
            { color: theme.textPrimary, fontFamily: theme.fontDisplay, letterSpacing: theme.letterSpacingDisplay * 0.5 },
          ]}
        >
          {cheat.name}
        </Text>
        {cheat.category ? (
          <View style={[styles.tag, { backgroundColor: theme.categoryTint }]}>
            <Text style={[styles.tagText, { color: theme.accent, fontFamily: theme.fontBody }]}>
              {cheat.category}
            </Text>
          </View>
        ) : null}
      </View>

      <Text style={[styles.description, { color: theme.textSecondary, fontFamily: theme.fontBody }]}>
        {cheat.description}
      </Text>

      <View
        style={[
          styles.codeBox,
          { backgroundColor: theme.surfaceAlt, borderColor: theme.accent },
        ]}
      >
        <Text
          style={[
            styles.codeText,
            { color: theme.accent, fontFamily: theme.fontMono },
          ]}
          selectable
        >
          {code}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    flexShrink: 1,
    paddingRight: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 12,
  },
  codeBox: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  codeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
