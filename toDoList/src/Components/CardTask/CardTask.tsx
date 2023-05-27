import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Menu/Menu';
import IconEdite from '../IconEdit/IconEdit';

export default function CardTask(props:any) {
const {taskId} = props
  const [task, setTask] = useState(null);
  const [statusChange, setStatusChange] = useState('');

  const {id} = useParams()
  
  useEffect(() => {
    
  }, );

  if(!task) {
    return <div>
      error
    </div>
  }

  return (
    <>
    <Navbar/>
      <div>
        <h3 className='text-center mt-2'>Détail de la tache</h3>
        <div className='d-flex flex-column flex-wrap m-5 p-5'>
          <div className='d-flex flex-column flex-md-row'>
            <h5 className='me-5'>Pseudo: {taskId.pseudo}</h5>
            <p>Nom de la tache: {taskId.name}</p>
          </div>
          <div className=''>
            <p>Description: {taskId.description}</p>
          </div>
          <div className='d-flex flex-column flex-md-row'>
            <p className='me-3'>Début prévu: {taskId.startDate}</p>
            <div className='me-3'>
              <div className=''>
                <p className='d-flex'>
                  <span className='text-danger fw-bolder me-1'>*</span>Status: 
                    {taskId.status} 
                    <IconEdite/></p>
              </div>
              <div>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Select action</option>
                  <option value={1}>En attente</option>
                  <option value={2}>En cours</option>
                  <option value={3}>Fini</option>
              </select>
              </div>
            </div>
            <p className='me-3'>Priorité: {task.priority}</p>
            <p className='me-3'>DeadLine: {task.deadline}</p>
          </div>
        </div>
      </div>
    </>
  )
}
