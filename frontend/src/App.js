import React from 'react';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>College ID Management System</h1>
      </header>
      <main>
        <Home />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} College ID System</p>
      </footer>
    </div>
  );
}

export default App;