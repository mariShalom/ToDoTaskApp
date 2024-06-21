import React, { useState, useEffect } from 'react';
import './App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState(null); 

  useEffect(() => {
    const initialTodos = [
      { id: 1, text: '20 minutes Jogging', completed: false },
      { id: 2, text: 'Wash Dishes', completed: false }
    ];
    setTodos(initialTodos);
  }, []); 

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      if (editMode !== null) {
        // Edit mode
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === editMode ? { ...todo, text: input } : todo
          )
        );
        setEditMode(null); 
      } else {
        // Add mode
        setTodos(prevTodos => [
          ...prevTodos,
          { id: todos.length + 1, text: input, completed: false }
        ]);
      }
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setInput(todoToEdit.text);
    setEditMode(id);
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id)
    );
  };

  return (
    <div>
      <h1>My To-Do List</h1>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={addTodo}>{editMode !== null ? 'Save' : 'Add Task'}</button>
      <ul>
        {todos.map(todo => (
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