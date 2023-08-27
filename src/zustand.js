import { useEffect, useState } from 'react'
import { create } from 'zustand'

const existingTodos = localStorage.getItem('todos')

export const useTodoStore = create((set) => ({
  todos: existingTodos ? JSON.parse(existingTodos) : [],
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

export const useTodos = () => {
  const [todos, setTodos] = useState([])

  const { initalTodos } = useTodoStore((state) => {
    return { initalTodos: state.todos }
  })

  useEffect(() => {
    setTodos(initalTodos)
    localStorage.setItem('todos', JSON.stringify(initalTodos))
  }, [initalTodos])

  return todos
}
