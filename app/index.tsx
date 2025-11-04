import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../src/contexts/ThemeContext';
import { ThemeToggle } from '../src/components/theme/ThemeToggle';
import { Ionicons } from '@expo/vector-icons';
import { spacing, fontSize, borderRadius } from '../src/constants/theme';

const initialTodos = [
  { id: '1', text: 'Complete online JavaScript course', completed: true },
  { id: '2', text: 'Jog around the park 3x', completed: false },
  { id: '3', text: '10 minutes meditation', completed: false },
  { id: '4', text: 'Read for 1 hour', completed: false },
  { id: '5', text: 'Pick up groceries', completed: false },
  { id: '6', text: 'Complete Todo App on Frontend Mentor', completed: false },
];

type FilterType = 'all' | 'active' | 'completed';

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([{ 
        id: Date.now().toString(), 
        text: newTodo.trim(), 
        completed: false 
      }, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const TodoItem = ({ item }: { item: typeof todos[0] }) => (
    <View style={[
      styles.todoItem,
      {
        borderBottomColor: theme.borderColor,
        backgroundColor: theme.cardBackground,
      }
    ]}>
      {/* Checkbox with Gradient Background */}
      <TouchableOpacity 
        onPress={() => toggleTodo(item.id)}
        style={styles.checkboxContainer}
      >
        {item.completed ? (
          <LinearGradient
            colors={['#55DDFF', '#C058F3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCheckbox}
          >
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </LinearGradient>
        ) : (
          <View style={[
            styles.checkbox,
            { borderColor: theme.checkboxEmpty }
          ]} />
        )}
      </TouchableOpacity>
      
      {/* Todo Text */}
      <Text style={[
        styles.todoText,
        {
          color: item.completed ? theme.textCompleted : theme.textPrimary,
          textDecorationLine: item.completed ? 'line-through' : 'none',
        }
      ]}>
        {item.text}
      </Text>
      
      {/* Delete Button */}
      <TouchableOpacity 
        onPress={() => deleteTodo(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="close" size={20} color={theme.closeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.background, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header with Background Image */}
      <ImageBackground 
        source={theme.headerBackground}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>TODO</Text>
          <ThemeToggle />
        </View>
      </ImageBackground>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          {/* Todo Input */}
          <View style={[
            styles.inputContainer,
            {
              backgroundColor: theme.inputBackground,
              shadowColor: isDarkMode ? '#000' : 'rgba(194, 195, 214, 0.5)',
            }
          ]}>
            <TouchableOpacity style={styles.inputCheckCircle}>
              <View style={[
                styles.inputCircle,
                { borderColor: theme.checkboxEmpty }
              ]} />
            </TouchableOpacity>
            
            <TextInput
              style={[
                styles.input,
                { color: theme.textPrimary }
              ]}
              placeholder="Create a new todo..."
              placeholderTextColor={theme.textPlaceholder}
              value={newTodo}
              onChangeText={setNewTodo}
              onSubmitEditing={addTodo}
              returnKeyType="done"
            />
          </View>

          {/* Todo List */}
          <View style={[
            styles.todoListContainer,
            {
              backgroundColor: theme.cardBackground,
              shadowColor: isDarkMode ? '#000' : 'rgba(194, 195, 214, 0.5)',
            }
          ]}>
            <FlatList
              data={filteredTodos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TodoItem item={item} />}
              style={styles.flatList}
            />

            {/* Footer */}
            <View style={[
              styles.footer,
              { borderTopColor: theme.borderColor }
            ]}>
              <Text style={[
                styles.itemCount,
                { color: theme.textSecondary }
              ]}>
                {activeTodosCount} items left
              </Text>
              
              {/* Desktop  */}
              {Platform.OS === 'web' && (
                <View style={styles.desktopFilters}>
                  {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
                    <TouchableOpacity 
                      key={filterType}
                      onPress={() => setFilter(filterType)}
                    >
                      <Text style={[
                        styles.filterText,
                        {
                          color: filter === filterType ? theme.filterActive : theme.filterInactive,
                          fontWeight: filter === filterType ? 'bold' : 'normal',
                        }
                      ]}>
                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TouchableOpacity onPress={clearCompleted}>
                <Text style={[
                  styles.clearButton,
                  { color: theme.clearButton }
                ]}>
                  Clear Completed
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mobile Filters */}
          {Platform.OS !== 'web' && (
            <View style={[
              styles.mobileFilters,
              {
                backgroundColor: theme.cardBackground,
                shadowColor: isDarkMode ? '#000' : 'rgba(194, 195, 214, 0.5)',
              }
            ]}>
              {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
                <TouchableOpacity 
                  key={filterType}
                  onPress={() => setFilter(filterType)}
                >
                  <Text style={[
                    styles.filterText,
                    {
                      color: filter === filterType ? theme.filterActive : theme.filterInactive,
                      fontWeight: filter === filterType ? 'bold' : 'normal',
                    }
                  ]}>
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          
          <Text style={[
            styles.dragInstruction,
            { color: theme.textSecondary }
          ]}>
            Drag and drop to reorder list
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  headerBackground: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fontSize.title,
    fontWeight: 'bold',
    letterSpacing: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
    marginTop: -40,
  },
  content: {
    paddingHorizontal: spacing.lg,
    flex: 1,
  },
  inputContainer: {
    borderRadius: borderRadius.medium,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
  },
  inputCheckCircle: {
    marginRight: spacing.md,
  },
  inputCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: fontSize.large,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  todoListContainer: {
    borderRadius: borderRadius.medium,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  checkboxContainer: {
    marginRight: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  gradientCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    flex: 1,
    fontSize: fontSize.large,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderTopWidth: 1,
  },
  itemCount: {
    fontSize: fontSize.medium,
  },
  desktopFilters: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  filterText: {
    fontSize: fontSize.medium,
  },
  clearButton: {
    fontSize: fontSize.medium,
  },
  mobileFilters: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.medium,
    marginTop: spacing.lg,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
  },
  dragInstruction: {
    fontSize: fontSize.medium,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
});