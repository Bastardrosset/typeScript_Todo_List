const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

const UserModel = require('../models/userModel');

module.exports = (req, res, next) => {

    console.log('token :')
    if (!req.headers.authorization) {
        return res.status(401).send({message: "Token invalid" });
    }

    const token = req.headers.authorization.split(' ')[1]
    
    if (token) {
        jwt.verify(token, process.env.RANDOM_KEY_SECRET, async (error, decodedToken) => {
            if (error) {
                res.locals.user = null;
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                // récupère l'Id utilisateur
                res.locals.user = user;
                console.log('middelware checké')
                console.log(res.locals.user)
                console.log('decodedToken as' + decodedToken)
                next();
            }
        });
    } else {
        res.locals.user = null;
        console.log('no token')
        return res.status(401).send({message: "Token invalid" });
    }
  };
