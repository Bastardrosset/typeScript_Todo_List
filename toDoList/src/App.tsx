import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import LoginForm from './Components/Auth/LoginForm'
import SignUpForm from './Components/Auth/SignUpForm'
import CreateToDoList from './Pages/CreateToDoList'
import ConsultToDoList from './Pages/ConsultToDoList'
import CardTask from './Components/CardTask/CardTask'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/accueil' element={<Home/>} />
        <Route path='/' element={<LoginForm/>} />
        <Route path='/register' element={<SignUpForm/>} />
        <Route path='/task' element={<CreateToDoList/>} />
        <Route path='/list' element={<ConsultToDoList/>} />
        <Route path='/cardTask/:id' element={<CardTask/>} />
      </Routes>
    </BrowserRouter>
    
  </> 
  )
}

export default App
