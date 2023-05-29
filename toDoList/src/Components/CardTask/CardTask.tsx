import './cardTaskStyle.css'
import IconEdite from '../IconEdit/IconEdit';
import Navbar from '../Menu/Menu';

import { useEffect, useState } from 'react';
import { readTask } from '../../Services/ApiAction/task'
import { useParams, Params } from 'react-router-dom'
import { format } from 'date-fns';
import IconDelete from '../IconDelete/IconDelete'


export default function CardTask() {

  const {id} = useParams<Params>();

  interface Task {
    pseudo: string;
    name: string;
    description: string;
    startDate: string;
    status: number;
    priority: string;
    deadline: string;
  }

  const [task, setTask] = useState<Task>();

  const [statusChange, setStatusChange] = useState('');
  
  useEffect(() => {
    readTaskId()
  }, []);

  const readTaskId = async () => {
    try{
      if(id){
        const response = await readTask(id);
        if(response){
          setTask(response.data)
        }

      }
    } catch(error){
      console.log('erreur durant le chargement des taches' + error)
    }
  }
  if (!task) {
    return <div className="alert alert-danger" role="alert">
    Cette tache n'existe pas ou a été cloturé!
  </div>;
  }

  const deleteTask = (e:any) => {
    e.preventDefault()
  }

  return (
    <>
    <Navbar/>
      <div>
        <h3 className='text-center mt-2'>Détail de la tache</h3>
          <div className='d-flex ms-3'>
              <IconEdite/>
          </div>
        <div className='d-flex flex-column flex-wrap m-5 p-5'>
          <div className='d-flex flex-column flex-md-row'>
            <div className='d-flex col-md-6 col-sm-12 flex-wrap'>
              <h5 className='me-1 fw-bolder'>Pseudo:</h5>
              <p>{task.pseudo}</p> 
            </div>
            <div className='d-flex col-md-6 col-sm-12 flex-wrap'>
              <p className='me-1 fw-bolder'>Nom de la tache:</p> 
              <p>{task.name}</p>
            </div>
          </div>
          <div className='d-flex col-12 flex-wrap'>
            <p className='me-1 fw-bolder'>Description:</p> {task.description}
          </div>
          <div className='d-flex'>
            <div className='d-flex flex-column flex-md-row'>
              <div className="col-12 col-md-6 d-flex flex-wrap">
                <div className='d-flex'>
                  <span className='text-danger fw-bolder me-1'>*</span><span className='fw-bolder'>Status:</span> 
                <div>
                  {/* <p> {task.status}</p> */}
                </div>
                  <div>
                    <select className="form-select ms-2" aria-label="Default select example">
                      <option value="">Select action</option>
                      <option value={1} selected={task.status === 1}>En attente</option>
                      <option value={2} selected={task.status === 2}>En cours</option>
                      <option value={3} selected={task.status === 3}>Fini</option>
                    </select>
                  </div>
                </div> 
              </div>
              <div className='col-12 col-md-6 d-flex flex-wrap'>
                <p className='me-1 fw-bolder'>Début prévu:</p> {format(new Date(task.startDate), 'yyyy-MM-dd')}
              </div>
              <div className='col-12 col-md-4 d-flex flex-wrap'>
                <p className='me-1 fw-bolder'>Priorité:</p> 
                <div>
                  {task.priority}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex flex-wrap'>
            <p className='me-1 fw-bolder'>DeadLine:</p>
            <div className='col-6 d-flex'>
               {format(new Date(task.deadline), 'yyyy-MM-dd')}
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center button'>
        <button 
          onClick={deleteTask}
          type="submit"><IconDelete/></button>
          
        </div>
      </div>
    </>
  )
}
