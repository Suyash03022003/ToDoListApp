import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import ToDoList from './components/ToDoList/ToDoList'
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/todolist' element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
