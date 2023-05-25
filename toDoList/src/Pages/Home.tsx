import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconTask from '../Components/IconTasks/IconTasks';

import Button from '../Components/Button/Button';
import Logout from '../Components/Auth/Logout'

export default function Home() {
  return (
    <div>
      <>
    <Logout/>
      <div className='container mt-3'>
        <div className='d-flex align-items-center justify-content-center mt-5 mb-5'>
        < IconTask />
          <h1>To-Do_liste</h1>
        </div>
        <div className='row col-12 d-flex navigation'>
          <Link to="/task" className='row d-flex mt-3 navigation text-decoration-none'>
            <Button typeBtn="btn-primary" css="col-5">Créer une nouvelle tache</Button>
          </Link>
          <Link to="/list" className='row d-flex mt-3 navigation text-decoration-none'>
            <Button typeBtn="btn-success" css="col-5">Consulter les taches</Button>
          </Link>
        </div>
      </div>
      <div className="container mt-5">
        <h5>Liste des utilisateurs enregistrés</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Pseudo</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
          {/* {users.map((user) => (
              <tr key={user._id}>
                <th scope="row">{user.pseudo}</th>
                <td>{user.email}</td>
                <td>{user.isAdmin}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
    </div>
  )
}