import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodo] = useState([]);
  const [input, setInputs] = useState('');
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    const initialTodos = [
      { id: 1, text: '60 minutes Jogging', completed: false },
      { id: 2, text: 'Wash Dishes', completed: false }
    ];
    setTodo(initialTodos);
  }, []);

  const handleChanges = (e) => {
    setInputs(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      if (editMode !== null) {
        
        setTodo(prevTodos =>
          prevTodos.map(todo =>
            todo.id === editMode ? { ...todo, text: input } : todo
          )
        );
        setEditMode(null);
      } else {
       
        setTodo(prevTodos => [
          ...prevTodos,
          { id: todos.length + 1, text: input, completed: false }
        ]);
      }
      setInputs('');
    }
  };

  const toggleCompletes = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodos = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setInputs(todoToEdit.text);
    setEditMode(id);
  };

  const deleteTodos = (id) => {
    setTodo(prevTodo =>
      prevTodo.filter(todo => todo.id !== id)
    );
  };

  return (
    <div>
<<<<<<< HEAD
      <h1>My To Do List</h1>
      <input type="text" value={input} onChange={handleChanges} />
      <button onClick={addTodo}>{editMode !== null ? 'Save' : 'Add Tasks'}</button>
=======
      <h1>My To DO Task Aplication</h1>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={addTodo}>{editMode !== null ? 'Save' : 'Add Task'}</button>
>>>>>>> 6e5844a1d0408302f6f9b6f0148afd9b20e5c1a3
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
            onClick={() => toggleCompletes(todo.id)}
          >
            {todo.text}
            <button className="edit" onClick={() => editTodos(todo.id)}>Edit</button>
            <button className="delete" onClick={() => deleteTodos(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;