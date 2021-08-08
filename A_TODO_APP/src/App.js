// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Todoo from './todo.js';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';
function App() {
  const [todos, setTodos]=useState([]);//short term memory
  const [input, setInput]=useState('');

  useEffect( () => {
    //this code runs when app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc =>({id: doc.id ,todo:doc.data().todo}) ))
    })
  },[]);
  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault();//to prevent page from refreshing
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input]);
    setInput('');//TO CLEAR INPUT AFTER HITTING ENTER
  }
  return (
    <div className="App">
      <h1>Fancy TO-DO app</h1>
      <FormControl>
        <InputLabel>📚📝Add a to-do task</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}></Input>
      </FormControl>
      <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>add to-do</Button>

      <ul>
        {todos.map(todo => (
          <Todoo todo={todo}/>
        //<li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
