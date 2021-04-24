import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ExList from './components/ex-list';
import ExEdit from './components/ex-edit';
import ExCreate from './components/ex-create';
import UserCreate from './components/user-create';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <h1>Welcome!</h1>
      <Route path='/' exact component={ExList} />
      <Route path='/edit/:id' exact component={ExEdit} />
      <Route path='/create' exact component={ExCreate} />
      <Route path='/user' exact component={UserCreate} />
    </Router>
  );
}

export default App;
