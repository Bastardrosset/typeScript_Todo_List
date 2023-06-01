import Navbar from '../Components/Menu/Menu';
import IconEdit from '../Components/IconEdit/IconEdit';

import {useEffect, useState} from 'react';
import { readAllTask } from '../Services/ApiAction/task';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';


const ConsultToDoListe =() => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetchTasks();
    }, []);

    const fetchTasks = async () => {
      try {
        const response = await readAllTask()
        if(response){
          // console.log(response)
          setTasks(response.data)
        }
      } catch (error) {
        console.log('Une erreur s\'est produite lors de la récupération des taches.', error);
      }
    };
    
    return (
      <>
      <Navbar />
        <div className='m-5 p-5'>
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
            {tasks.map((task: any) => (
              <tr key={task._id}>
                <td>{format(new Date(task.updatedAt), 'yyyy-MM-dd')}</td>
                <td>{task.pseudo}</td>
                <td>{task.email}</td>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td><NavLink className="nav-link col-12" 
                  aria-current="page" 
                  to={`/cardTask/${task._id}`}
                  ><IconEdit/></NavLink></td> 
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </>
    );
  }


export default ConsultToDoListe;

