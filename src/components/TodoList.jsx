import React from 'react'
import { useTodos } from '../zustand'
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = () => {
  const todos = useTodos()

  return (
    <div className="container">
      <h3>Todos</h3>
      <div className="infos">
        {todos.filter((todo) => todo.completed).length} of {todos.length}{' '}
        completed
      </div>
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
