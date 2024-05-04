import React, { useEffect, useState } from 'react';
import Create from './create';
import axios from 'axios';
import {  BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';


function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        console.log('Fetched todos:', result.data);
        setTodos(result.data);
      })
      .catch(err => console.error('Error fetching todos:', err));
  }, []);
  

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, { done: true }) 
      .then(result => {
        console.log(result);
        setTodos(prevTodos => prevTodos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: !todo.done };
          } else {
            return todo;
          }
        }));
      })
      .catch(err => console.error(err));
}

const handleDelete = (id) => {
  console.log("Deleting todo with ID:", id);
  axios.delete(`http://localhost:3001/delete/${id}`)
    .then(result => {
      console.log("Delete request successful:", result);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    })
    .catch(err => console.error("Error deleting todo:", err));
}

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className='background'>
    <div className='back'>
      
      <div className='home'>
      <div className='top'>
      <h2 className='todo'>Todo List</h2>
      </div >
      <Create onAddTodo={addTodo} />
      {
        todos.length === 0 ?
        <div>
          <h2>No Record</h2>
        </div>
        :
        todos.map(todo => (
          <div key={todo.id} className='task'>
            <div className='checkbox' onClick={()=>handleEdit(todo._id)}>
              {todo.done ? 
              <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
             :<BsCircleFill className='icon'/>
            }
            
            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>

            </div>
            <div>
              <span>
              <BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/>
              </span>
              
            </div>
          </div>
        ))
      }
    </div>
    </div>
    </div>
    
  );
}

export default Home;
