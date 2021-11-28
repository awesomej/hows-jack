import React, {useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import logo from './logo.svg';
import './App.css';
import {listTodos} from './graphql/queries';
import {createTodo as createTodoMutation, deleteTodo as deleteTodoMutation} from './graphql/mutations';

import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

const initialFormState = {name: '', description: ''}

function App({ signOut, user }) {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos(){
    const apiData = await API.graphql({query: listTodos});
    setTodos(apiData.data.listTodos.items);
  }

  async function createTodo(){
    if (!formData.name || !formData.description) return;
    await API.graphql({query: createTodoMutation, variables: {input:formData}});
    setTodos([...todos, formData]);
    setFormData(initialFormState);
  }

  async function deleteTodo({id}){
    const newTodoArray = todos.filter(todo => todo.id !== id);
    setTodos(newTodoArray);
    await API.graphql({query: deleteTodoMutation, variables:{input: {id}}});
  }

  return (
    <div className="App">
      <h1>My Todos App</h1>
      <input
        onChange={e => setFormData({...formData, 'name':e.target.value})}
        placeholder="Todo Name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({...formData, 'description':e.target.value})}
        placeholder="Todo Description"
        value={formData.description}
      />
      <button onClick={createTodo}>Create Todo</button>

      <div style={{marginBottom:30}}>
        {
          todos.map(todo => (
            <div key={todo.id || todo.name}>
              <h2>{todo.name}</h2>
              <p>{todo.description}</p>
              <button onClick={() => deleteTodo(todo)}>Delete Todo</button>
            </div>
            ))
        }

      </div>

      <button class="amplify-button" data-variation="primary" onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(App);
