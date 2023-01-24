import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import TodoList from './components/TodoList';
import Form from './components/form/Form';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/todos/")
    .then((res)=>{
      setTodos(res.data)
    })
    .catch(()=>{
      alert("something goes wrong")
    })
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
