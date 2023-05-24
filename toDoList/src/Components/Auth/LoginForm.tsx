import './authStyle.css';

import IconTask from '../IconTasks/IconTasks';
import { NavLink } from 'react-router-dom'
import { FormEvent, useState } from 'react'

export default function LoginForm() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  function handleChange(e:any){
    const {name, value}:any = e.target;
    setUser({ ...user, [name]: value})
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  }

  return (
    <div className='container d-flex justify-content-center align-items-center mt-5'>
        <div className='col-6 d-flex justify-content-evenly'>
        < IconTask />
        </div>
        <div className='login-form col-6 flex-column justify-content-start'>
          <form className ="form col-12" action="" onSubmit={handleRegister} id="login-form">
            <div className="d-flex flex-column mt-5">
              <label> Email :</label>
              <input 
                className="w-75" 
                type="email" 
                name="email" 
                id="email" 
                onChange={(e)=>handleChange(e)} 
                required/>
            </div>
            <div className="d-flex flex-column mt-5">
              <label> Password :</label>
              <input 
                className="w-75" 
                type="password" 
                name="password" 
                id="password"  
                onChange={(e)=>handleChange(e)} 
                required/>
            </div>
            <input className="btn btn-primary mt-3" type="submit" value="Valider inscription" />
          </form>
          <NavLink className="nav-link col-12 text-center mt-5 myStyleLink" to="/register">Pas encore de compte ?</NavLink>
        </div>
    </div>
  )
}
