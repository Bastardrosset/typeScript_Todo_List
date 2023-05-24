const UserModel = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId; //ObjectId,type spécial utilisé pour les identifiants uniques

// Function trouve tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password'); 
    const usersWithRoles = users.map((user) => {
        let isAdminString = 'User'; // Valeur par défaut pour le rôle
  
        if (user.isAdmin === true) {
          roleString = 'Admin';
        }
  
        return {
          ...user._doc,
          isAdmin: isAdminString
        };
      });
    res.status(200).json(users)
}

// Function infos utilisateur
exports.userInfo = async (req, res) => {
    // console.log(req.params);
    if (!ObjectId.isValid(req.params.id)) { // Methode de verification de l'ID passé en parametres
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }

    let query = UserModel.findById(req.params.id);
    const doc = await query;
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    query.select('-password');
};

// Function supprime l'utilisateur
exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }
    try {
        await UserModel.findByIdAndUpdate(req.user.id, { active: false });
        
        res.status(204).json({
        status: 'success',
        data: null
    });
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}