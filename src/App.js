import React from 'react';
import './App.css';
import routes from './routes'
import { HashRouter } from 'react-router-dom'


import Nav from './components/Nav/Nav'

function App() {
  return (
    <HashRouter>
      <div className="center-stuff">
        <Nav />
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
