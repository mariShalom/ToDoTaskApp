import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    const initialTodos: Todo[] = [
      { id: 1, text: '60 minutes Jogging', completed: false },
      { id: 2, text: 'Wash Dishes', completed: false }
    ];
    setTodos(initialTodos);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      if (editMode !== null) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === editMode ? { ...todo, text: input } : todo
          )
        );
        setEditMode(null);
      } else {
        setTodos(prevTodos => [
          ...prevTodos,
          { id: todos.length + 1, text: input, completed: false }
        ]);
      }
      setInput('');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setInput(todoToEdit.text);
      setEditMode(id);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id)
    );
  };

  return (
    <div>
      <h1>My To Do Task Application</h1>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={addTodo}>{editMode !== null ? 'Save' : 'Add Task'}</button>
      <ul>
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
            <button className="edit" onClick={() => editTodo(todo.id)}>Edit</button>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
