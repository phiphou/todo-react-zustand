import React from 'react'
import { useTodoActions } from '../zustand'

const Todo = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoActions()

  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <div className={todo.completed ? 'todoLabel completed' : 'todoLabel'}>
        {todo.name}
      </div>
      <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
        X
      </button>
    </div>
  )
}

export default Todo
