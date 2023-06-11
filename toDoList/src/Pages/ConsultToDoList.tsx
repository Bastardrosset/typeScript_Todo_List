import './pageStyle.css'

import Navbar from '../Components/Menu/Menu'
import IconEdit from '../Components/IconEdit/IconEdit'
import Table from 'react-bootstrap/Table'
import IconDelete from '../Components/IconDelete/IconDelete'

import { ChangeEvent, useEffect, useState } from 'react'
import { readAllTask } from '../Services/ApiAction/task'
import { NavLink } from 'react-router-dom'
import { format } from 'date-fns'
import { useLocalStorage } from '../hook/useLocalStorage'
import { adminRemoveTask } from '../Services/ApiAction/Admin'


const ConsultToDoListe = () => {

  const [tasks, setTasks] = useState([])
  const [selectedPriority, setSelectedPriority] = useState('')
  const [storeUser] = useLocalStorage('user', '')
  const [removedTasks, setRemovedTasks] = useState<any[]>([])

  useEffect(() => {
    sortTasks()
  }, [selectedPriority])

  useEffect(() => {
    fetchTasks()
  }, [])

  // Return all saved tasks
  const fetchTasks = async () => {
    try {
      const response = await readAllTask()
      if (response) {
        setTasks(response.data)
      }
    } catch (error) {
      console.log('Une erreur s\'est produite lors de la récupération des taches.', error)
    }
  }

  // function returns all tasks in order of priority
  const sortTasks = async () => {
    try {
      const response = await readAllTask()
      if (response) {
        let sortedTasks = response.data

        if (selectedPriority) {
          sortedTasks = sortedTasks.filter((task: { priority: string }) => task.priority === selectedPriority)
        }

        sortedTasks.sort((a: { priority: string }, b: { priority: any }) => a.priority.localeCompare(b.priority))

        setTasks(sortedTasks)
      }
    } catch (error) {
      console.log('Une erreur s\'est produite lors de la récupération des taches.', error)
    }
  }

  // Select new task status
  const sortPriorityTaskChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value)
  }

  // Remove task function
  async function removeTask(taskId: any) {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche definitivement ?')
    if (confirmDelete) {
      try {
        await adminRemoveTask(taskId)
        setRemovedTasks([...removedTasks, taskId])
      } catch (error) {
        console.log('Une erreur s\'est produite lors de la suppression de la tâche.', error)
      }
    }
  }

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
            onChange={(e) => sortPriorityTaskChange(e)}
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
              <tr
                key={task._id} className={
                  removedTasks.includes(task._id) ? 'activeRemove' : ''
                }>
                <td>{format(new Date(task.updatedAt), 'yyyy-MM-dd')}</td>
                <td>{task.pseudo}</td>
                <td>{task.email}</td>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td><NavLink className="nav-link col-12"
                  aria-current="page"
                  to={`/cardTask/${task._id}`}
                ><IconEdit /></NavLink></td>
                <td className='iconDelete'>
                  {task.status === 'Fini' && storeUser === "Admin" &&
                    <button
                      className='iconDelete'
                      onClick={() => removeTask(task._id)}
                    ><IconDelete />
                    </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}


export default ConsultToDoListe;

