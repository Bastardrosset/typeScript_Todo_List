import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import LoginForm from './Components/Auth/LoginForm'
import SignUpForm from './Components/Auth/SignUpForm'
import CreateToDoList from './Pages/CreateToDoList'
import ConsultToDoList from './Pages/ConsultToDoList'
import CardTask from './Components/CardTask/CardTask'
import { AuthProvider } from './Components/App.context.tsx';


const App:React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm/>} />
          <Route path='/register' element={<SignUpForm/>} />
        </Routes>

    <AuthProvider>
        <Routes>
          <Route path='/accueil' element={<Home/>} />
          <Route path='/task' element={<CreateToDoList/>} />
          <Route path='/list' element={<ConsultToDoList/>} />
          <Route path='/cardTask/:id' element={<CardTask/>} />
        </Routes>
    </AuthProvider>
      </BrowserRouter>
  </> 
  )
}

export default App
