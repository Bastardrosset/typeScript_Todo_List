import './cardTaskStyle.css'
import Navbar from '../Menu/Menu';
import IconEdite from '../IconEdit/IconEdit';

import { useContext, ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { editStatus, readTask } from '../../Services/ApiAction/task'
import { useParams, Params } from 'react-router-dom'
import { format } from 'date-fns';
import { TaskType } from '../../Interfaces/Task';
import { AuthContext } from '../App.context';

export default function CardTask() {

  const authContext = useContext(AuthContext);
  const { loggedInEmail } = authContext;
  const {id} = useParams<Params>();
  
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<TaskType>();
  const [statusChange, setStatusChange] = useState({
    status: ""
  });

  const isUserEmailMatching = loggedInEmail === task?.email;

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

  function newStatus(e: ChangeEvent<HTMLSelectElement>){
  const {name, value} = e.target
  setStatusChange({ ...statusChange, [name]: value });
  setIsEditing(true);
  }

  const handleNewStatus = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await editStatus(id, statusChange)
      if(response){
        setTask(task)
        window.location.href = "/list"
      }

    } catch(error){
      console.log('Erreur durant la mise à jour du status' + error)
    }
  }

  return (
    <>
    <Navbar/>
      <div>
        <h3 className='text-center mt-2'>Détail de la tache</h3>
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
                  <div className="ms-1 d-flex flex-wrap">
                      <p> {task.status}</p>
                      
                      {isEditing ? (
                        <form className="buttonEdit" onSubmit={(e) => handleNewStatus(e)}>
                          <select
                            className="form-select ms-2"
                            name='status'
                            aria-label="Default select example"
                            onChange={(e) => newStatus(e)}>
                              <option value="">Select action</option>
                              <option value='En attente'>En attente</option>
                              <option value="En cours">En cours</option>
                              <option value="Fini">Fini</option>
                          </select>
                          <button className="btn btn-primary col-8 mt-2 mb-3" type="submit">Modifier</button>
                        </form>
                      ) : (
                        <button className=" border-0" type="button" onClick={() => setIsEditing(true)}>
                          <IconEdite />
                        </button>
                      )}
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
      </div>
    </>
  )
}
