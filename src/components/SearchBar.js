import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

export default function SearchBar({ value, onChangeText, theme, placeholder }) {
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.surfaceAlt,
          borderColor: theme.border,
        },
      ]}
    >
      <Text style={[styles.icon, { color: theme.textSecondary }]}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search cheats...'}
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          {
            color: theme.textPrimary,
            fontFamily: theme.fontBody,
          },
        ]}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={10}>
          <Text style={[styles.clear, { color: theme.textSecondary }]}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 46,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  clear: {
    fontSize: 14,
    paddingLeft: 8,
  },
});
