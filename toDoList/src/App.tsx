import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Pages/Home'
import LoginForm from './Components/Auth/LoginForm'
import SignUpForm from './Components/Auth/SignUpForm'
import CreateToDoList from './Pages/CreateToDoList'
import ConsultToDoList from './Pages/ConsultToDoList'
import CardTask from './Components/CardTask/CardTask'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { isAdmin } from './Services/ApiAction/admin'
import { useEffect } from 'react'


const App:React.FC = () => {

  useEffect(() => {
    ifIsAdmin();
  }, [])

  const ifIsAdmin = async () => {
    try{
      const response = await isAdmin();
      // return response
      console.log(response)

    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm/>} />
          <Route path='/register' element={<SignUpForm/>} />
          <Route path='/accueil' element={<Home/>} />
          <Route path='/task' element={<CreateToDoList/>} />
          <Route path='/list' element={<ConsultToDoList/>} />
          <Route path='/cardTask/:id' element={<CardTask/>} />
        </Routes>      
      </BrowserRouter>
    </> 
  )
}

export default App
