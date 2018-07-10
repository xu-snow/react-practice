import * as React from 'react';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
// import asyncComponent from './async-component';
import ContextAPI from './pages/ContextAPI';
import CustomTextInput from './pages/CreateRefAPI';
import IncludeForWardRefCom from './pages/ForwardRef'
import NewLifecycle from './pages/NewLifecycle'

import './App.less';
import logo from './logo.svg';

const routes: string[] = ['Context API', 'createRef API', 'forwardRef API', 'Component New Lifecycle']
const URL_REPLACE = /\s+/g;
const urlRoutes = routes.map(route => route.replace(URL_REPLACE, '-').toLowerCase())


class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>

          </div>
          <nav>
            <ul style={{ textAlign: 'left' }}>
              {
                routes.map((route, index) => (
                  <li key={route}>
                    <Link to={urlRoutes[index]}>{route}</Link>
                  </li>
                ))
              }
            </ul>
          </nav>
          <div className="main-flex">
            <Switch>
              <Route path='/context-api' component={ContextAPI} />
              <Route path='/createref-api' component={CustomTextInput} />
              <Route path='/forwardref-api'  component={IncludeForWardRefCom}/>
              <Route path='/component-new-lifecycle'  component={NewLifecycle}/>
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
