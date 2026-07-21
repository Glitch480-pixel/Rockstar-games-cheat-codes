import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export default function PlatformToggle({ value, onChange, theme }) {
  const options = [
    { key: 'pc', label: 'PC' },
    { key: 'console', label: 'CONSOLE' },
  ];

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: theme.tabInactiveBg, borderColor: theme.border },
      ]}
    >
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            style={[
              styles.tab,
              {
                backgroundColor: active ? theme.tabActiveBg : 'transparent',
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: active ? theme.tabActiveText : theme.tabInactiveText,
                  fontFamily: theme.fontDisplay,
                  letterSpacing: theme.letterSpacingDisplay,
                },
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});
