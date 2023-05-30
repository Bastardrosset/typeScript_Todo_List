// const { post } = require('app');
const ModelTask = require('../models/taskModel');

const ObjectId = require('mongoose').Types.ObjectId;

//function affiche les taches
module.exports.readAllTasks = (req, res) => {
    const tasks = ModelTask.find() // méthode find() permet de renvoyer un tableau contenant tous les tasks dans la BD
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) => res.status(400).json({ error }));
};

//function affiche une tache/:id
module.exports.readTask = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { // Methode de verification de l'ID passé en parametres
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }
    try{
        await ModelTask.findById(req.params.id)
        .then((task) => {
            if(!task){
                return res.status(404).json({ message: 'Tache non trouvé !'})
            }
            res.status(200).json(task)
        })
        .catch((error) => res.status(401).json({ error }));

    } catch(error){
        return
    }
}

//function créer une tache
module.exports.createTask = async (req, res) => {
    const newTask = new ModelTask({
       
        pseudo: req.body.pseudo,
        email: req.body.email,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        priority: req.body.priority,
        status: req.body.status,
        startDate: req.body.startDate,
        deadline: req.body.deadline
    })

    try {
        const task = await newTask.save();
        console.log('La tache :'+ task + ' a ete ajouté')
        return res.status(201).json(task);
        
    } catch (error) {
        return res.status(400).send(error)
    }
};

//function modifier une tache
module.exports.updateTask = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send('ID inconnu : ' + req.params.id);
        }
      
        const updatedTask = {
            status: req.body.status
        };

        const updatedDoc = await ModelTask.findByIdAndUpdate(req.params.id, { $set: updatedTask }, { new: true });
      
        res.send(updatedDoc);

    } catch (error) {
        console.log("Mise à jour : " + error);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour de la tâche.");
    }
};
//function supprimer la tache
module.exports.deleteTask = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { // Methode de verification de l'ID passé en parametres
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }
    ModelTask.findByIdAndRemove(
        req.params.id,
        (error, docs) => {
            if (!error) {
                res.status(200).send('task');
            } else {
                console.log("Suppression :" + error)
            }
        })
};