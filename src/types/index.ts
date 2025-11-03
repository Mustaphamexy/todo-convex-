// src/types/index.ts
export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoInputProps {
  onAdd: (title: string) => void;
}

export interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  onClearCompleted: () => void;
}