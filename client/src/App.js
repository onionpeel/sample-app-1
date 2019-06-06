import React from 'react';
import {Provider} from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar';
import IdeasList from './components/IdeasList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <IdeasList />
      </div>
    </Provider>
  );
}

export default App;
