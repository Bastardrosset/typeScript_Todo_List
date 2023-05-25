import React, {useEffect, useState} from 'react';
import Navbar from '../Components/NavBar/NavBar';
import Table from 'react-bootstrap/Table';
import IconEdite from '../Components/IconEdites/IconEdite';
import { NavLink } from 'react-router-dom';

const ConsultToDoListe =() => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetchTasks();
    }, []);

    const fetchTasks = async () => {
      // try {
      //   const response = await  fetch("http://localhost:5000/api/posts/read", {
      //     method: "GET",
      //     crossDomain: true,
      //     headers: {
      //       "Content-type": "application/json",
      //       Accept: "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //       Authorization: 'Bearer token'
      //     }, 
      //   })
      //   const data = await response.json();
      //   setTasks(data);
      // } catch (error) {
      //   console.log('Une erreur s\'est produite lors de la récupération des taches.', error);
      // }
    };
    return (
      <>
      <Navbar />
        <div className='res'>
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mis à jour le</th>
              <th>Pseudo</th>
              <th>Email</th>
              <th>Tache</th>
              <th>Priorité</th>
              <th>Voir</th>
            </tr>
          </thead>
          <tbody>
            {/* {tasks.map((task) => (
              <tr key={task._id}>
                <td></td>
                <td>{task.pseudo}</td>
                <td>{task.email}</td>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td><NavLink className="nav-link col-12" 
                  aria-current="page" 
                  to={`/cardTask/${task._id}`}
                  ><IconEdite/></NavLink></td> 
              </tr>

            ))} */}
          </tbody>
        </Table>
        </div>
      </>
    );
  }


export default ConsultToDoListe;

