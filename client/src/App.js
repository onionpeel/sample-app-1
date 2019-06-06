import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {Container} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar';
import IdeasList from './components/IdeasList';
import IdeaModal from './components/IdeaModal';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <IdeaModal />
          <IdeasList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
