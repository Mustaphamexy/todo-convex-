// src/components/todos/TodoInput.tsx - Updated with proper colors
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { spacing, borderRadius, fontSize } from '../../constants/theme';

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.inputBackground,
          borderColor: theme.inputBorder,
          shadowColor: theme.textSecondary,
        },
      ]}
    >
      <TouchableOpacity style={styles.checkCircle}>
        <View
          style={[
            styles.circle,
            { borderColor: theme.checkboxEmpty },
          ]}
        />
      </TouchableOpacity>
      
      <TextInput
        style={[
          styles.input,
          { color: theme.textPrimary },
        ]}
        placeholder="Create a new todo..."
        placeholderTextColor={theme.textPlaceholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        blurOnSubmit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.sm,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    marginBottom: spacing.lg,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
  },
  checkCircle: {
    marginRight: spacing.md,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});