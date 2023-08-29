import React from 'react'
import { useTodos } from '../zustand'
import Todo from './Todo'
import TodoFilter from './TodoFilter'
import TodoForm from './TodoForm'

const TodoList = () => {
  const { filtered, todos } = useTodos()

  return (
    <div className="container">
      <h3>Todos</h3>
      <div className="infos">
        {todos.filter((todo) => todo.completed).length} of {todos.length}{' '}
        completed
      </div>
      <TodoFilter />
      <TodoForm />

      <ul>
        {filtered.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
