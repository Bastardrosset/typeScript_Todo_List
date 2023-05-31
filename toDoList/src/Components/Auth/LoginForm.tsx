import './authStyle.css';

import IconTask from '../IconTasks/IconTasks';
import { NavLink } from 'react-router-dom'
import { useContext, ChangeEvent, FormEvent, useState } from 'react'
import { loginUser } from '../../Services/ApiAction/auth';
import { useLocalStorage } from '../../hook/useLocalStorage';
import { AuthContext } from '../App.context'; 


export default function LoginForm() {
  
  const authContext = useContext(AuthContext);
  const { loggedInEmail } = authContext;

  const TOKEN = 'token';
  const [storeToken, setStoreToken] = useLocalStorage(TOKEN, '');

  
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  
  function handleChange(e:ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;
    setUser({ ...user, [name]: value})
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(user);
      if(response) {
        setStoreToken(response.data.token);
        const { email } = response.data;
        authContext.setLoggedInEmail(email);
        window.location.href = "/accueil";
      }
    } catch (error) {
      console.log('erreur signin' + error)
    }
  }

  return (
    <div className='container d-flex justify-content-center align-items-center mt-5'>
        <div className='col-6 d-flex justify-content-evenly'>
        < IconTask />
        </div>
        <div className='login-form col-6 flex-column justify-content-start'>
          <form className ="form col-12" action="" onSubmit={handleLogin} id="login-form">
            <div className="d-flex flex-column mt-5">
              <label> Email :</label>
              <input 
                className="w-75" 
                type="email" 
                name='email'
                value={user.email} 
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
