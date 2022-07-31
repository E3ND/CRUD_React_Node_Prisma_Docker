import './App.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

function App() {
  const Todos = ({ todos }) => {
    return <div className="todos">
      {todos.map((todo) => {
        return(
          <div key={todo.id} className="todo">
            
            <button 
              onClick={() => modifyStatusTodo(todo)}
              className="checkbox" 
              style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}>
  
            </button>
  
            <p>{todo.name}</p>
            <button onClick={() => handleEditButtonClick(todo)}>
              <AiOutlineEdit size={20} color={"#64697b"} />
            </button>
  
            <button onClick={() => deleteTodo(todo)}>
              <AiOutlineDelete size={20} color={"#64697b"} />
            </button>
  
          </div>
        );
      })}
    </div>
  }

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  }

  async function handleEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisibility(!inputVisibility);
  }

  
  // Conexão
  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos")
    setTodos(response.data);
  }

  // Create
  async function crateTodo() {
    const response = await axios.post("http://localhost:3333/todos", {name:inputValue})
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValue("");
  }

  // Delete
  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`)
    getTodos();
  }
  
  // Update
  async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisibility(false);
    getTodos();
    setInputValue("");
  }

  // Change color button circle
  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className="App">
      <header className="container">

        <div className="header">
          <h1>Don't be lazzy</h1>
        </div>

        <Todos todos={todos}/>

        <input 
          value={inputValue} 
          className="inputName" 
          style={{ display: inputVisibility ? "block" : "none" }}
          onChange={(event) => {
          setInputValue(event.target.value);
        }} ></input>

        <button 
          onClick={
            inputVisibility 
              ? selectedTodo 
                ? editTodo
                : crateTodo 
              : handleWithNewButton} 
          className="newTaskButton">
          {inputVisibility ? "Confirm" : "New task"}
        </button>

      </header>

    </div>
  );
}

export default App;
