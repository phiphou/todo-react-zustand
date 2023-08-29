import { useEffect, useState } from 'react'
import { create } from 'zustand'

const existingTodos = localStorage.getItem('todos')

export const FILTER_ALL = 'FILTER_ALL'
export const FILTER_COMPLETED = 'FILTER_COMPLETED'
export const FILTER_UNCOMPLETED = 'FILTER_UNCOMPLETED'

export const useTodoStore = create((set, get) => ({
  todos: existingTodos ? JSON.parse(existingTodos) : [],
  filter: FILTER_ALL,
  filteredTodos: () => {
    switch (get().filter) {
      case FILTER_ALL:
        return get().todos
      case FILTER_COMPLETED:
        return get().todos.filter((todo) => todo.completed)
      case FILTER_UNCOMPLETED:
        return get().todos.filter((todo) => !todo.completed)
    }
  },
  updateFilter: (filterMode) => {
    set({ filter: filterMode })
  },
  clearCompleted: () =>
    set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) })),
  clearAll: () => set({ todos: [] }),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    })),
  deleteTodo: (id) => {
    set((state) => ({
      todos: (state.todos = state.todos.filter((t) => t.id !== id))
    }))
  },
  addTodo: (text) => {
    set((state) => ({
      todos: (state.todos = [
        {
          id: new Date().getTime(),
          name: text,
          completed: false
        },
        ...state.todos
      ])
    }))
  }
}))

export const useTodoActions = () => {
  const store = useTodoStore()
  return {
    toggleTodo: store.toggleTodo,
    deleteTodo: store.deleteTodo,
    clearCompleted: store.clearCompleted,
    clearAll: store.clearAll,
    addTodo: store.addTodo,
    updateFilter: store.updateFilter
  }
}

export const useTodos = () => {
  const [todos, setTodos] = useState([])

  const { initalTodos } = useTodoStore((state) => {
    return { initalTodos: state.todos }
  })

  useEffect(() => {
    setTodos(initalTodos)
    localStorage.setItem('todos', JSON.stringify(initalTodos))
  }, [initalTodos])

  const filteredTodos = useTodoStore((state) => {
    return state.filteredTodos
  })

  return { todos: todos, filtered: filteredTodos() }
}
