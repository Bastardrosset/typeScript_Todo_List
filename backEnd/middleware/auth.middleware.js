const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

const UserModel = require('../models/userModel');

module.exports = async (req, res, next) => {
  console.log('token :');

  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Token invalid' });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = await jwt.verify(token, process.env.RANDOM_KEY_SECRET);
    const user = await UserModel.findById(decodedToken.id);
    res.locals.user = user;
    console.log('middleware checké');
    console.log(res.locals.user);
    console.log('decodedToken as', decodedToken);
    next();
  } catch (error) {
    console.log('Erreur de vérification du token:', error);
    res.locals.user = null;
    next();
  }
};