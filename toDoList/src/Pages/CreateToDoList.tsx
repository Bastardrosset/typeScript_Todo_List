import Navbar from '../Components/Menu/Menu'

import { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { createTask } from '../Services/ApiAction/task'


export default function CreateToDoList() {

  const [task, setTask] = useState({
    pseudo: "",
    email: "",
    name: "",
    category: "",
    description: "",
    priority: "",
    status: "",
    startDate: "",
    deadline: "",
    update: ""
  })

  // Set input changes
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setTask({ ...task, [name]: value })
  }

  //Function submit form created task
  const formSubmitTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await createTask(task)
      if (response) {
        setTask(task)
        window.location.href = "/list"
      }

    } catch (error) {
      console.log('Erreur durant la création de la tache' + error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container lg d-flex flex-column justify-content-center align-items-center mt-5">
        <form className="form row md-3" onSubmit={(e) => formSubmitTask(e)}>
          <div className="row mt-4 ">
            <div className="col-md-3 mt-2">
              <label className="form-label me-2" htmlFor="update">Mis à jour le:</label>
              <input
                type="date"
                id="update"
                name="update"
                min="2023/05/20"
                max="2023/03/30"
                onChange={(e) => handleChange(e)} />
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
                  className="form-control"
                  id="pseudo"
                  required
                  onChange={(e) => handleChange(e)} />
              </div>
              <div className="col-md-4">
                <label
                  htmlFor="email"
                  className="form-label">Email</label>
                <input
                  type="email"
                  name='email'
                  className="form-control"
                  id="email"
                  required
                  onChange={(e) => handleChange(e)} />
              </div>
            </div>
            <div className="row mt-4 d-flex justify-content-evenly">
              <div className="col-md-4 ">
                <label
                  htmlFor="nomTache"
                  className="form-label">Tache</label>
                <input
                  type="text"
                  value={task.name}

                  name='name'
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
                  min="2023/05/20"
                  max="2023/03/24"
                  className="form-control"
                  id="effectuerAvTache"
                  onChange={(e) => handleChange(e)}
                  required />
              </div>
            </div>
            <div className="col-12 mt-5 d-flex justify-content-center align-items-center mb-5">
              <button className="btn btn-primary col-6" type="submit">Envoyer</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
