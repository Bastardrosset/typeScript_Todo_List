import './adminEditeCardTask.css'

import Navbar from '../Menu/Menu'

import { useLocalStorage } from '../../hook/useLocalStorage'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { readTask } from '../../Services/ApiAction/task'
import { Params, useParams } from 'react-router-dom'
import { TaskType } from '../../Interfaces/TaskIterface'
import { format } from 'date-fns'
import { adminEdit } from '../../Services/ApiAction/Admin'


export default function AdminEditeCardTask() {
    
    const { id } = useParams<Params>()

    const [storeUser] = useLocalStorage('user', '')
    const [task, setTask] = useState<TaskType>({
        pseudo: '',
        email: '',
        name: '',
        category: '',
        description: '',
        priority: '',
        status: '',
        startDate: '',
        deadline: '',
        update: '',
    })
    const [editeTask, setEditeTask] = useState<TaskType>({
        pseudo: '',
        email: '',
        name: '',
        category: '',
        description: '',
        priority: '',
        status: '',
        startDate: '',
        deadline: '',
        update: '',
    })

    // set input changes
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
        setEditeTask((prevEditeTask) => ({ ...prevEditeTask, [name]: value }))
    }

    useEffect(() => {
        fetchTaskDetails()
    }, [])

    // function returns the properties of the task
    const fetchTaskDetails = async () => {
        try {
            const response = await readTask(id)
            if (response) {
                const responseData = response.data
                const formattedStartDate = format(new Date(responseData.startDate), 'yyyy-MM-dd')
                const formattedDeadline = format(new Date(responseData.deadline), 'yyyy-MM-dd')
                const updatedTask = {
                    ...responseData,
                    startDate: formattedStartDate,
                    deadline: formattedDeadline
                }
                setTask(updatedTask)
                setEditeTask(updatedTask)
            }
        } catch (error) {
            console.log('erreur durant le chargement des taches' + error)
        }
    }

    // form submit edit from admin
    const formSubmitEdite = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await adminEdit(id, task)
            if (response) {
                setTask(task)
                window.location.href = "/list"
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div>AdminEditeCardTask</div>
            {storeUser === 'Admin' &&
                <form className="form row md-3 m-5" onSubmit={(e) => formSubmitEdite(e)}>
                    <div className="row mt-4 ">
                        <div className="col-md-3 mt-2">
                            <label className="form-label me-2" htmlFor="update">Mis à jour le:</label>
                            <input
                                type="date"
                                id="update"
                                name="update"
                                min="2023/05/20"
                                max="2023/03/30"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                    </div>
                    <div className='container'>
                        <div className="row mt-4 d-flex justify-content-center">
                            <div className="col-md-4">
                                <label
                                    htmlFor="pseudo"
                                    className="form-label">Pseudo</label>
                                <input
                                    type="text"
                                    name='pseudo'
                                    value={editeTask.pseudo}
                                    className="form-control"
                                    id="pseudo"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label
                                    htmlFor="email"
                                    className="form-label">Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    value={editeTask.email}
                                    className="form-control"
                                    id="email"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="row mt-4 d-flex justify-content-evenly">
                            <div className="col-md-4 ">
                                <label
                                    htmlFor="nomTache"
                                    className="form-label">Tache</label>
                                <input
                                    type="text"
                                    name='name'
                                    value={editeTask.name}
                                    className="form-control"
                                    id="nomTache"
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </div>
                            <div className="col-md-2">
                                <label
                                    htmlFor="prioriteTache"
                                    className="form-label">Prioritée</label>
                                <select
                                    className="form-select"
                                    name='priority'
                                    value={editeTask.priority}
                                    id="prioriteTache"
                                    onChange={(e) => handleChange(e)}
                                    required>
                                    <option disabled value=""></option>
                                    <option></option>
                                    <option value={'Basse'}>Basse</option>
                                    <option value={'Moyenne'}>Moyenne</option>
                                    <option value={'Haute'}>Haute</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-4 d-flex justify-content-center">
                            <div className="col-md-8">
                                <label
                                    htmlFor="descriptionTache"
                                    className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name='description'
                                    value={editeTask.description}
                                    id="descriptionTache"
                                    onChange={(e) => handleChange(e)}
                                    required>
                                </textarea>
                            </div>
                        </div>
                        <div className="row mt-4 d-flex justify-content-evenly">
                            <div className="col-md-3">
                                <label
                                    htmlFor="statutTache"
                                    className="form-label">Statut</label>
                                <select
                                    className="form-select"
                                    name='status'
                                    value={editeTask.status}
                                    id="statutTache"
                                    onChange={(e) => handleChange(e)}
                                    required>
                                    <option></option>
                                    <option value="En attente">En attente</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Fini">Fini</option>
                                </select>
                            </div>
                            <div className="col-md-2 mt-2">
                                <label className="form-label me-2" htmlFor="start">Date début:</label>
                                <input
                                    type="date"
                                    id="start"
                                    name="startDate"
                                    value={editeTask.startDate}
                                    min="2023/05/20"
                                    max="2023/03/24"
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </div>

                            <div className="col-md-3 mt-2">
                                <label
                                    htmlFor="categorieTache"
                                    className="form-label">Catégorie</label>
                                <input
                                    type="text"
                                    name='category'
                                    value={editeTask.category}
                                    className="form-control"
                                    id="categorieTache"
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </div>
                        </div>
                        <div className="row mt-4 d-flex justify-content-center align-items-center">
                            <div className="col-md-3">
                                <label htmlFor="effectuerAvTache" className="form-label">A éffectuer avant le:</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={editeTask.deadline}
                                    min="2023/05/20"
                                    max="2023/03/24"
                                    className="form-control"
                                    id="effectuerAvTache"
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </div>
                        </div>
                        <div className="col-12 mt-5 d-flex justify-content-center align-items-center mb-5">
                            <button className="btn btn-primary col-6" type="submit">Modifier</button>
                        </div>
                    </div>
                </form>
            }
        </>
        // verification admin

        // formulaire pré remplis

        // envoie data vers BDD

    )
}
