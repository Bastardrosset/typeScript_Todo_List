import './authStyle.css'

import IconTask from '../IconTasks/IconTasks'

import { ChangeEvent, FormEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { registerUser } from '../../Services/ApiAction/Auth'

const SignupForm = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  // Function set the values of the inputs
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  // Function sends register form
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await registerUser(user)
      if (response) {
        window.location.href = "/"
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container d-flex justify-content-center align-items-center mt-5'>
      <div className='col-6 d-flex justify-content-evenly'>
        < IconTask />
      </div>
      <div className='register-form col-6 flex-column justify-content-start'>
        <form className="form col-12" action="" onSubmit={handleRegister} id="register-form">
          <div className="d-flex flex-column mt-5">
            <label> Pseudo :</label>
            <input
              className="w-75"
              type="text"
              name="name"
              id="pseudo"
              value={user.name}
              onChange={(e) => handleChange(e)}
              required />
          </div>
          <div className="d-flex flex-column mt-5">
            <label> Email :</label>
            <input
              className="w-75"
              name='email'
              type="email"
              id="email"
              onChange={(e) => handleChange(e)}
              required />
          </div>
          <div className="d-flex flex-column mt-5">
            <label> Password :</label>
            <input
              className="w-75"
              name='password'
              type="password"
              id="password"
              onChange={(e) => handleChange(e)}
              required />
          </div>
          <input className="btn btn-primary mt-3" type="submit" value="Valider inscription" />
          <NavLink className="nav-link col-12 text-center mt-5 myStyleLink" to="/">Déja un compte ?</NavLink>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
