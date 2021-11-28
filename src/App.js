import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {user.name}.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <button class="amplify-button" data-variation="primary" onClick={signOut}>Sign Out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
