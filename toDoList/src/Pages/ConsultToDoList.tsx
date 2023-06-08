import Navbar from '../Components/Menu/Menu';
import IconEdit from '../Components/IconEdit/IconEdit';
import IconFinish from '../Components/IconFinish/IconFinish';
import Table from 'react-bootstrap/Table';

import {ChangeEvent, useEffect, useState} from 'react';
import { readAllTask } from '../Services/ApiAction/task';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';


const ConsultToDoListe =() => {

    const [tasks, setTasks] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState('');

    useEffect(() => {
      sortTasks();
    }, [selectedPriority]);

    useEffect(() => {
      fetchTasks();
    }, []);

    const fetchTasks = async () => {
      try {
        const response = await readAllTask()
        if(response){
          setTasks(response.data)
        }
      } catch (error) {
        console.log('Une erreur s\'est produite lors de la récupération des taches.', error);
      }
    };

    const sortTasks = async () => {
      try {
        const response = await readAllTask()
        if(response){
          let sortedTasks = response.data;

        if (selectedPriority) {
          sortedTasks = sortedTasks.filter((task: { priority: string }) => task.priority === selectedPriority);
        }

        sortedTasks.sort((a: { priority: string }, b: { priority: any }) => a.priority.localeCompare(b.priority));

          setTasks(sortedTasks)
        }
      } catch (error) {
        console.log('Une erreur s\'est produite lors de la récupération des taches.', error);
      }
    };
    
    const sortPriorityTaskChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value);
  };

    return (
      <>
      <Navbar />
      <div className='form-select_priority ms-3'>
        <h5>Triez par prioritées </h5>
        <div className="col-md-2">
          <select 
            className="form-select" 
            name='priority'
            id="prioriteTache" 
            onChange={(e)=>sortPriorityTaskChange(e)} 
            required>
              <option disabled value=""></option>
                <option></option>
                <option value={'Basse'}>Basse</option>
                <option value={'Moyenne'}>Moyenne</option>
                <option value={'Haute'}>Haute</option>
            </select>
          </div>
        </div>
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
                
                {task.status === 'Fini' && <span><IconFinish/></span>}
              
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </>
    );
  }


export default ConsultToDoListe;

