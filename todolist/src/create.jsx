import React, { useState } from 'react';
import axios from 'axios';

function Create({ onAddTodo }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() !== '') {
      axios.post('http://localhost:3001/add', { task: task })
        .then(result => {
          console.log(result);
          onAddTodo(result.data); 
          setTask('');
        })
        .catch(err => console.error('Error adding task:', err));
    } else {
      alert('Please enter a task before adding.');
    }
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        placeholder='Enter Task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='button' onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
