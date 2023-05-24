const express = require('express');
const app = express();
const cors = require('cors');
const mongoSanitize = require("express-mongo-sanitize");
require('dotenv').config({ path: './config/.env' });
require('./config/dataBase');
const bodyParser = require("body-parser");
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');

const morgan = require("morgan");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // accès à l'API depuis n'importe quelle origine ( '*' )
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, , Authorization'); // ajouter les headers mentionnés aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer des requêtes avec les méthodes mentionnées 
    next();
  });

// Headers & autorizations
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// configuration express-mongo-sanitze
app.use(
  mongoSanitize({
      allowDots: true,
      replaceWith: "_",
  })
);

app.use(bodyParser.json());


app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/posts', taskRoutes);

module.exports = app;