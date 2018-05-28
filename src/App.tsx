import * as React from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import logo from './logo.svg';

const routes: string[] = ['Context API', 'createRef API', 'forwardRef API', 'Component Lifecycle Changes'];
const URL_REPLACE = /\s+/g;

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <nav>
          <ul style={{textAlign:'left'}}>
            {
              routes.map(route => (
                <li key={route}>
                  <Link  to={route.replace(URL_REPLACE, '-').toLowerCase()}>{route}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;
