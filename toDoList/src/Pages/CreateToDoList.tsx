import React, { ChangeEvent, FormEvent } from 'react';
import Navbar from '../Components/NavBar/NavBar';
import { useState } from 'react';



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
    deadLine: "",
    update: ""
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
    const {name, value} = e.target;
    setTask({ ...task, [name]: value})
  }
  
const formSubmitTask = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
}
  return (
    <>
    <Navbar/>
    <div className="container lg d-flex flex-column justify-content-center align-items-center mt-5">
         <form className="form row md-3" onSubmit={formSubmitTask}>
            <div className="row mt-4 ">
                <div className="col-md-3 mt-2">
                    <label className="form-label me-2" htmlFor="update">Mis à jour le:</label>
                    <input 
                      type="date" 
                      id="update" 
                      name="trip-start" 
                      min="2023/05/20" 
                      max="2023/03/30" 
                      onChange={handleChange} />
                </div>
            </div>
            <div className='container'>
                <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="pseudo" className="form-label">Pseudo</label>
                        <input 
                          type="text" 
                          name='pseudo'
                          value={task.pseudo}
                          className="form-control" 
                          id="pseudo" 
                          required 
                          onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          required 
                          onChange={handleChange} />
                    </div>
                </div>
                <div className="row mt-4 d-flex justify-content-evenly">
                    <div className="col-md-4 ">
                        <label htmlFor="nomTache" className="form-label">Tache</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="nomTache" 
                          onChange={handleChange} 
                          required />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="prioriteTache" className="form-label">Prioritée</label>
                            <select 
                            className="form-select" 
                            id="prioriteTache" 
                            onChange={handleChange} 
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
                        <label htmlFor="descriptionTache" className="form-label">Description</label>
                        <textarea 
                          className="form-control" 
                          id="descriptionTache"  
                          onChange={handleChange} 
                          required>
                        </textarea>
                    </div>
                </div>
                <div className="row mt-4 d-flex justify-content-evenly">
                    <div className="col-md-3">
                        <label htmlFor="statutTache" className="form-label">Statut</label>
                            <select 
                              className="form-select" 
                              id="statutTache" 
                              onChange={handleChange} 
                              required>
                                  <option disabled value={1}></option>
                                  <option value={1}>En attente</option>
                                  <option value={2}>En cours</option>
                                  <option value={3}>Fini</option>
                        </select>
                    </div>
                    <div className="col-md-2 mt-2">
                        <label className="form-label me-2" htmlFor="start">Date début:</label>
                        <input 
                          type="date" 
                          id="start" 
                          name="trip-start" 
                          min="2023/05/20" 
                          max="2023/03/24" 
                          onChange={handleChange} 
                          required />
                    </div>
                    
                    <div className="col-md-3 mt-2">
                        <label htmlFor="categorieTache" className="form-label">Catégorie</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="categorieTache" 
                          onChange={handleChange} 
                          required />
                    </div>
                </div>
                <div className="row mt-4 d-flex justify-content-center align-items-center">
                    <div className="col-md-3">
                        <label htmlFor="effectuerAvTache" className="form-label">A éffectuer avant le:</label>
                        <input 
                          type="date" 
                          name="trip-start" 
                          min="2023/05/20" 
                          max="2023/03/24" 
                          className="form-control" 
                          id="effectuerAvTache" 
                          onChange={handleChange} 
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
